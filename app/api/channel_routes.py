from flask import Blueprint, request, jsonify
from app.models import db, User, Server, Message, Channel, server_member
from flask_login import current_user, login_required

channel_routes = Blueprint('channels', __name__)

auth_error = 'You are not the owner of this server'

# Get a channel by ID
@channel_routes.route('/<int:id>')
@login_required
def get_channel_by_id(id):

    channel = Channel.query.get(id)
    return channel.to_dict()


# Create a channel
@channel_routes.route('/create', methods = ['POST'])
@login_required
def create_channel():

    # Server ID will be served from the front end during the request
    server_id = request.json[ "serverId" ]
    name = request.json[ "name" ]

    server = Server.query.get(server_id)

    if server.owner_id != current_user.id:
        return auth_error

    channel = Channel (
        server_id = server_id,
        name = name
    )

    db.session.add(channel)
    db.session.commit()

    return channel.to_dict()

# TO DO
# Create a channel
# Edit a channel
# Delete a channel
