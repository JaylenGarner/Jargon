from .db import db, environment, SCHEMA, add_prefix_for_prod
# from werkzeug.security import generate_password_hash, check_password_hash
# from flask_login import UserMixin
server_members = db.Table(
    "server_members",
    db.Model.metadata,
    db.Column('users', db.Integer, db.ForeignKey('users.id'), primary_key=True, nullable=False),
    db.Column('servers', db.Integer, db.ForeignKey('servers.id'), primary_key=True, nullable=False)
)




# class ServerMember(db.Model):
#     __tablename__ = 'server_members'

#     # Add when building models
#     if environment == "production":
#         __table_args__ = {'schema': SCHEMA}

#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
#     server_id = db.Column(db.Integer, db.ForeignKey('servers.id'), nullable=False)

#     @property
#     def __repr__(self):
#         return f"<User ID: {self.user_id}, Server ID: {self.server_id}>"

#     def to_dict(self):
#         return {
#             'user_id': self.user_id,
#             'server_id': self.server_id
#         }
