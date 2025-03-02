from fastapi import HTTPException, Request
from starlette.responses import JSONResponse
from src.main import app


@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "error": {
                "message": exc.detail,
                "code": exc.status_code,
                "method": request.method,
                "path": str(request.url),
            }
        }
    )
