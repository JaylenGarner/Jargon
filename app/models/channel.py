from .db import db, environment, SCHEMA, add_prefix_for_prod
# from werkzeug.security import generate_password_hash, check_password_hash
# from flask_login import UserMixin


class Channel(db.Model):
    __tablename__ = 'channels'

    # Add when building models
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    server_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('servers.id')), nullable=False)
    name = db.Column(db.String(50), nullable=False)

    #Relationship

    # **Server**
    server = db.relationship("Server", back_populates= 'channels')


    # **Messages**
    messages = db.relationship("Message", back_populates= 'channel', cascade='all,delete')


    @property
    def __repr__(self):
        return f"<Channel ID: {self.id}, Server ID: {self.server_id}, Channel Name: {self.name}>"

    def to_dict(self):
        return {
            'id': self.id,
            'server_id': self.server_id,
            'name': self.name,
            'messages': [message.to_dict() for message in self.messages]
        }

    def to_dict_basic(self):
        return {
            'id': self.id,
            'server_id': self.server_id,
            'name': self.name,
        }
