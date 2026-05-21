"""initial

Revision ID: 7da2cda4a107
Revises: 
Create Date: 2026-05-20

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = '7da2cda4a107'
down_revision: Union[str, Sequence[str], None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""

    # -----------------------
    # app.requirements table
    # -----------------------
    op.create_table(
        'requirements',
        sa.Column('id', sa.BigInteger(), primary_key=True),
        sa.Column('title', sa.Text(), nullable=False),
        sa.Column('description', sa.Text(), nullable=True),
        sa.Column('status', sa.Text(), nullable=False),
        sa.Column(
            'created_at',
            sa.TIMESTAMP(timezone=True),
            server_default=sa.text('now()')
        ),
        sa.CheckConstraint(
            "status IN ('open','processed','obsolete')",
            name='ck_requirements_status'
        ),
        schema='app'
    )

    op.create_index(
        'ix_app_requirements_id',
        'requirements',
        ['id'],
        unique=False,
        schema='app'
    )

    # -----------------------
    # auth.users table
    # -----------------------
    op.create_table(
        'users',
        sa.Column('id', sa.BigInteger(), primary_key=True),
        sa.Column('email', sa.Text(), nullable=False),
        sa.Column('password_hash', sa.Text(), nullable=False),
        sa.Column(
            'is_active',
            sa.Boolean(),
            nullable=False,
            server_default=sa.true()
        ),
        sa.Column(
            'created_at',
            sa.TIMESTAMP(timezone=True),
            server_default=sa.text('now()')
        ),
        sa.UniqueConstraint('email', name='uq_users_email'),
        schema='auth'
    )

    op.create_index(
        'ix_auth_users_id',
        'users',
        ['id'],
        unique=False,
        schema='auth'
    )

    op.create_index(
        'ix_auth_users_email',
        'users',
        ['email'],
        unique=True,
        schema='auth'
    )


def downgrade() -> None:
    """Downgrade schema."""

    op.drop_index('ix_auth_users_email', table_name='users', schema='auth')
    op.drop_index('ix_auth_users_id', table_name='users', schema='auth')
    op.drop_table('users', schema='auth')

    op.drop_index('ix_app_requirements_id', table_name='requirements', schema='app')
    op.drop_table('requirements', schema='app')