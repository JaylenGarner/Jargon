from flask import Blueprint, request, jsonify
from app.models import db, User, Server, Message, Channel, server_member
from flask_login import current_user, login_required

message_routes = Blueprint('messages', __name__)

# Create a message
@message_routes.route('/create', methods = ['POST'])
@login_required
def create_message():

    message = Message (
        user_id = current_user.id,
        channel_id = request.json[ "channelId" ],
        body = request.json[ "body" ]
    )

    db.session.add(message)
    db.session.commit()

    return message.to_dict()
