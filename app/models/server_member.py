from .db import db, environment, SCHEMA, add_prefix_for_prod
# from werkzeug.security import generate_password_hash, check_password_hash
# from flask_login import UserMixin

# Define relationships!!!!!!

class ServerMember(db.Model):
    __tablename__ = 'server_members'

    # Add when building models
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False, db.ForeignKey=('users.id'))
    server_id = db.Column(db.Integer, nullable=False, db.ForeignKey=('servers.id'))

    #Relationships
    members = db.relationship("User", back_populates= 'server_members')
    servers = db.relationship("Server", back_populates= 'server_members')

    @property
    def __repr__(self):
        return f"<ID: {self.id}, User ID: {self.user_id}, Server ID: {self.server_id}>"

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'server_id': self.server_id
        }
