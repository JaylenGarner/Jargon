from flask import Blueprint, request, jsonify
from app.models import db, User, Server, Message, Channel, server_member
from flask_login import current_user, login_required

channel_routes = Blueprint('channels', __name__)

@channel_routes.route('/<int:id>')
@login_required
def get_channel_by_id(id):

    channel = Channel.query.get(id)
    return channel.to_dict()

# TO DO
# Create a channel
# Edit a channel
# Delete a channel
