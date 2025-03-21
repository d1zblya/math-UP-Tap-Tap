import json
import time
import base64
from typing import Union

import nacl.signing
import nacl.encoding
from urllib.parse import parse_qsl, unquote
from fastapi import HTTPException, status
from src.core.config import settings
from nacl.exceptions import BadSignatureError
from starlette.responses import JSONResponse

from loguru import logger


def verify_telegram_init_data(init_data: str) -> Union[dict, JSONResponse]:
    """
    Проверяет корректность `initData` из Telegram.
    """
    # Декодируем URL-encoded строку
    init_data = unquote(init_data)

    # Разбираем строку в словарь
    data_dict = dict(parse_qsl(init_data))

    if "signature" not in data_dict:
        msg = "Missing 'signature' in initData"
        logger.error(msg)
        return JSONResponse(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    content={
                        "error": {
                            "message": msg,
                            "code": status.HTTP_400_BAD_REQUEST,
                        }
                    }
                )

    received_signature = data_dict.pop("signature")  # Забираем подпись

    # Формируем строку check_string
    check_string = f"{settings.BOT_ID}:WebAppData\n" + "\n".join(
        f"{k}={v}" for k, v in sorted(data_dict.items()) if k != "hash"
    )

    # Декодируем подпись из base64url
    try:
        signature_bytes = base64.urlsafe_b64decode(received_signature + "==")  # Добавляем padding
    except Exception:
        msg = "Invalid signature encoding"
        logger.error(msg)
        return JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST,
            content={
                "error": {
                    "message": msg,
                    "code": status.HTTP_400_BAD_REQUEST,
                }
            }
        )

    public_key_bytes = bytes.fromhex(settings.TELEGRAM_PUBLIC_KEY)

    # Проверяем подпись с помощью Ed25519
    try:
        verify_key = nacl.signing.VerifyKey(public_key_bytes, encoder=nacl.encoding.RawEncoder)
        verify_key.verify(check_string.encode(), signature_bytes)
    except BadSignatureError:
        msg = "Invalid signature"
        logger.error(msg)
        return JSONResponse(
            status_code=status.HTTP_401_UNAUTHORIZED,
            content={
                "error": {
                    "message": msg,
                    "code": status.HTTP_400_BAD_REQUEST,
                }
            }
        )

    # Проверяем, не устарели ли данные (разрешаем 24 часа)
    auth_date = int(data_dict.get("auth_date", 0))
    if abs(auth_date - int(time.time())) > settings.AUTH_DATE_EXPIRE:
        msg = "Expired initData"
        logger.error(msg)
        return JSONResponse(
            status_code=status.HTTP_401_UNAUTHORIZED,
            content={
                "error": {
                    "message": msg,
                    "code": status.HTTP_400_BAD_REQUEST,
                }
            }
        )

    data_dict["user"] = json.loads(data_dict["user"])

    return data_dict

