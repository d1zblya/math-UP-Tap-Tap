import hashlib
import hmac
from urllib.parse import unquote
from src.config import settings
from fastapi import HTTPException, status
from src.config import settings


# def validate_mini_app_data(data: str):  # noqa
#     vals = {k: unquote(v) for k, v in [s.split("=", 1) for s in data.split("&")]}
#     data_check_string = "\n".join(f"{k}={v}" for k, v in sorted(vals.items()) if k != "hash")
#
#     secret_key = hmac.new("WebAppData".encode(), settings.BOT_TOKEN.encode(), hashlib.sha256).digest()
#     h = hmac.new(secret_key, data_check_string.encode(), hashlib.sha256)
#     return h.hexdigest() == vals["hash"], vals


def verify_telegram_init_data(init_data: str) -> dict:
    """
    Проверяет корректность `initData` из Telegram.
    """
    try:
        data_dict = dict(item.split("=") for item in init_data.split("&"))
        check_string = "\n".join(f"{k}={v}" for k, v in sorted(data_dict.items()) if k != "hash")
        secret_key = hashlib.sha256(settings.BOT_TOKEN.encode()).digest()
        expected_hash = hmac.new(secret_key, check_string.encode(), hashlib.sha256).hexdigest()

        if data_dict.get("hash") != expected_hash:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid initData")

        return data_dict
    except Exception:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid initData format")
