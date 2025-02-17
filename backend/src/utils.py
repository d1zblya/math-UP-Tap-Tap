import hashlib
import hmac
from urllib.parse import unquote
from src.config import settings


def validate_mini_app_data(data: str):  # noqa
    vals = {k: unquote(v) for k, v in [s.split("=", 1) for s in data.split("&")]}
    data_check_string = "\n".join(f"{k}={v}" for k, v in sorted(vals.items()) if k != "hash")

    secret_key = hmac.new("WebAppData".encode(), settings.BOT_TOKEN.encode(), hashlib.sha256).digest()
    h = hmac.new(secret_key, data_check_string.encode(), hashlib.sha256)
    return h.hexdigest() == vals["hash"], vals