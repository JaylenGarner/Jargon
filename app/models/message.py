from .db import db, environment, SCHEMA, add_prefix_for_prod
# from werkzeug.security import generate_password_hash, check_password_hash
# from flask_login import UserMixin


# Define relationships!!!!!!

class Message(db.Model):
    __tablename__ = 'messages'

    # Add when building models
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False, db.ForeignKey=('users.id'))
    channel_id = db.Column(db.Integer, nullable=False, db.ForeignKey=('channels.id'))
    body = db.Column(db.String(500), nullable=False)

    #Relationship
    user_messages = db.relationship("User", back_populates= 'messages', cascade='all,delete')
    channel_messages = db.relationship("Channel", back_populates= 'messages', cascade='all,delete')

    @property
    def __repr__(self):
        return f"<Message ID: {self.id}, User ID: {self.user_id}, Channel ID: {self.channel_id}>"

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'channel_id': self.channel_id,
            'body': self.body
        }
