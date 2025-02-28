import json
import time
import base64
import nacl.signing
import nacl.encoding
from urllib.parse import parse_qsl, unquote
from fastapi import HTTPException, status
from src.core.config import settings
from nacl.exceptions import BadSignatureError

from loguru import logger


def verify_telegram_init_data(init_data: str) -> dict:
    """
    Проверяет корректность `initData` из Telegram.
    """
    try:
        # Декодируем URL-encoded строку
        init_data = unquote(init_data)

        # Разбираем строку в словарь
        data_dict = dict(parse_qsl(init_data))

        if "signature" not in data_dict:
            logger.error("Missing 'signature' in initData")
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Missing 'signature' in initData")

        received_signature = data_dict.pop("signature")  # Забираем подпись

        # Формируем строку check_string
        check_string = f"{settings.BOT_ID}:WebAppData\n" + "\n".join(
            f"{k}={v}" for k, v in sorted(data_dict.items()) if k != "hash"
        )

        # Декодируем подпись из base64url
        try:
            signature_bytes = base64.urlsafe_b64decode(received_signature + "==")  # Добавляем padding
        except Exception:
            logger.error("Invalid signature encoding")
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid signature encoding")

        public_key_bytes = bytes.fromhex(settings.TELEGRAM_PUBLIC_KEY)

        # Проверяем подпись с помощью Ed25519
        try:
            verify_key = nacl.signing.VerifyKey(public_key_bytes, encoder=nacl.encoding.RawEncoder)
            verify_key.verify(check_string.encode(), signature_bytes)
        except BadSignatureError:
            logger.error("Invalid signature")
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid signature")

        # Проверяем, не устарели ли данные (разрешаем 24 часа)
        auth_date = int(data_dict.get("auth_date", 0))
        if abs(auth_date - int(time.time())) > 60 * 60 * 24:
            logger.error("Expired initData")
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Expired initData")

        data_dict["user"] = json.loads(data_dict["user"])

        return data_dict

    except Exception as e:
        logger.error(f"Error verifying initData: {e}")
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid initData format")

