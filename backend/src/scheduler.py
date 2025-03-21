from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.triggers.cron import CronTrigger
from loguru import logger
from src.database.session import async_session_maker
from random import sample

from src.quests.service import QuestService
from src.users.service import UserService


async def _assign_daily_quests():
    async with async_session_maker() as session:
        users = await UserService.get_users_list()
        all_quests = await QuestService.get_all_quests()

        for user in users:
            user_assigned_quests = await UserService.get_user_assigned_quests(user.tg_id)

            if len(user_assigned_quests) >= 3:
                continue

            missing_quests = 3 - len(user_assigned_quests)
            new_quests = sample(all_quests, missing_quests)

            for quest in new_quests:
                await UserService.add_new_user_quest(tg_id=user.tg_id, quest_id=quest.id)

        await session.commit()


def start_scheduler():
    scheduler = AsyncIOScheduler()

    scheduler.add_job(_assign_daily_quests, CronTrigger(hour=0, minute=0))

    # scheduler.add_job(_assign_daily_quests, "interval", seconds=30)

    scheduler.start()
