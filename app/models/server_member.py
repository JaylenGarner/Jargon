from .db import db, environment, SCHEMA, add_prefix_for_prod
# from werkzeug.security import generate_password_hash, check_password_hash
# from flask_login import UserMixin
server_members = db.Table(
    "server_members",
    db.Model.metadata,
    db.Column('users', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True, nullable=False),
    db.Column('servers', db.Integer, db.ForeignKey(add_prefix_for_prod('servers.id')), primary_key=True, nullable=False)
)

if environment == "production":
    server_members.schema = SCHEMA
