from .db import db, environment, SCHEMA, add_prefix_for_prod
# from werkzeug.security import generate_password_hash, check_password_hash
# from flask_login import UserMixin

# Define relationships!!!!!!

class Server(db.Model):
    __tablename__ = 'servers'

    # Add when building models
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, nullable=False)
    name = db.Column(db.String(50), nullable=False)
    image = db.Column(db.String(255))
    public = db.Column(db.Boolean, nullable=False, default=True)
    private_member_id = db.Column(db.Integer)

    @property
    def to_dict(self):
        return {
            'id': self.id,
            'owner_id': self.owner_id,
            'name': self.name,
            'image': self.image,
            'public': self.public
            'private_member_id': self.private_member_id
        }
