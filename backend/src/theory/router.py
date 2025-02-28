from typing import Optional

from fastapi import APIRouter
from fastapi_cache.decorator import cache

from src.theory.schemas import Theory
from src.theory.service import TheoryService

theory_router = APIRouter(
    prefix="/api/theories",
    tags=["theory"]
)


@theory_router.get("/{title}")
async def get_one_theory(title) -> Optional[Theory]:
    return await TheoryService.get_theory(title=title)


@theory_router.get("")
@cache(expire=60)
async def get_all_theories() -> list[Theory]:
    return await TheoryService.get_all_theories()
