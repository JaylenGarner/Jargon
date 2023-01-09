from .db import db, environment, SCHEMA, add_prefix_for_prod
# from app.models import db, User, Server, Message, Channel, server_member
# from werkzeug.security import generate_password_hash, check_password_hash
# from flask_login import UserMixin


class Message(db.Model):
    __tablename__ = 'messages'

    # Add when building models
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    channel_id = db.Column(db.Integer, db.ForeignKey('channels.id'), nullable=False)
    body = db.Column(db.String(500), nullable=False)

    #Relationship

    # **User**
    user = db.relationship("User", back_populates= 'messages')

    # **Channel**
    channel = db.relationship("Channel", back_populates= 'messages')

    @property
    def __repr__(self):
        return f"<Message ID: {self.id}, User ID: {self.user_id}, Channel ID: {self.channel_id}>"

    def to_dict(self):
        return {
            'id': self.id,
            'channel_id': self.channel_id,
            'body': self.body,
            # Error for attaching user!!!
            'user': self.user.to_dict_basic()
        }
