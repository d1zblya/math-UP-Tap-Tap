from typing import Optional

from fastapi import APIRouter

from src.theory.schemas import Theory
from src.theory.service import TheoryService

theory_router = APIRouter(prefix="/theories", tags=["theory"])


@theory_router.get("/{title}")
async def get_one_theory(title) -> Optional[Theory]:
    return await TheoryService.get_theory(title=title)


@theory_router.get("")
async def get_all_theories() -> list[Theory]:
    return await TheoryService.get_all_theories()
