from .db import db, environment, SCHEMA, add_prefix_for_prod
# from werkzeug.security import generate_password_hash, check_password_hash
# from flask_login import UserMixin

# Define relationships!!!!!!

class ServerMember(db.Model):
    __tablename__ = 'server_members'

    # Add when building models
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    user_id = db.Column(db.Integer, nullable=False, db.ForeignKey=('users.id'))
    server_id = db.Column(db.Integer, nullable=False, db.ForeignKey=('servers.id'))

    @property
    def __repr__(self):
        return f"<User ID: {self.user_id}, Server ID: {self.server_id}>"

    def to_dict(self):
        return {
            'user_id': self.user_id,
            'server_id': self.server_id
        }
