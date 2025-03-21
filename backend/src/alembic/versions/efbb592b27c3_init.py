"""init

Revision ID: efbb592b27c3
Revises: 
Create Date: 2025-03-20 20:44:46.469319

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'efbb592b27c3'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('quests',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=100), nullable=False),
    sa.Column('description', sa.String(length=500), nullable=False),
    sa.Column('target', sa.Integer(), nullable=False),
    sa.Column('reward', sa.Integer(), nullable=False),
    sa.Column('task_complexity', sa.Enum('EASY', 'MEDIUM', 'HARD', name='taskcomplexity'), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('users',
    sa.Column('tg_id', sa.Integer(), nullable=False),
    sa.Column('first_name', sa.String(length=100), nullable=False),
    sa.Column('points', sa.Integer(), server_default='0', nullable=False),
    sa.Column('registration_date', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.Column('solved_examples', sa.Integer(), server_default='0', nullable=False),
    sa.Column('correctly_solved_examples', sa.Integer(), server_default='0', nullable=False),
    sa.Column('completed_quests', sa.Integer(), server_default='0', nullable=False),
    sa.Column('bio', sa.String(length=256), nullable=True),
    sa.PrimaryKeyConstraint('tg_id')
    )
    op.create_index(op.f('ix_users_tg_id'), 'users', ['tg_id'], unique=True)
    op.create_table('user_history',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('tg_id', sa.Integer(), nullable=False),
    sa.Column('task', sa.String(), nullable=False),
    sa.Column('true_answer', sa.Integer(), nullable=False),
    sa.Column('user_answer', sa.Integer(), nullable=False),
    sa.Column('points', sa.Integer(), nullable=False),
    sa.Column('task_complexity', sa.Enum('EASY', 'MEDIUM', 'HARD', name='taskcomplexity'), nullable=False),
    sa.ForeignKeyConstraint(['tg_id'], ['users.tg_id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_user_history_id'), 'user_history', ['id'], unique=True)
    op.create_table('user_quests',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('tg_id', sa.Integer(), nullable=False),
    sa.Column('quest_id', sa.Integer(), nullable=False),
    sa.Column('is_completed', sa.Boolean(), server_default='False', nullable=True),
    sa.Column('date_assigned', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.Column('count_result', sa.Integer(), server_default='0', nullable=True),
    sa.ForeignKeyConstraint(['quest_id'], ['quests.id'], ),
    sa.ForeignKeyConstraint(['tg_id'], ['users.tg_id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('user_quests')
    op.drop_index(op.f('ix_user_history_id'), table_name='user_history')
    op.drop_table('user_history')
    op.drop_index(op.f('ix_users_tg_id'), table_name='users')
    op.drop_table('users')
    op.drop_table('quests')
    # ### end Alembic commands ###
