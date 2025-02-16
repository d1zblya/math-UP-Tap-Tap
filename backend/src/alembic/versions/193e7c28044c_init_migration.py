"""init migration

Revision ID: 193e7c28044c
Revises: 
Create Date: 2025-02-16 11:55:57.375781

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '193e7c28044c'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user_history',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('tg_id', sa.BigInteger(), nullable=True),
    sa.Column('task', sa.String(), nullable=True),
    sa.Column('true_answer', sa.Integer(), nullable=True),
    sa.Column('user_answer', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['tg_id'], ['users.tg_id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_user_history_id'), 'user_history', ['id'], unique=True)
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f('ix_user_history_id'), table_name='user_history')
    op.drop_table('user_history')
    # ### end Alembic commands ###
