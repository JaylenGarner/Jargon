from flask import Blueprint, request, jsonify
from app.models import db, User, Server, Message, Channel, server_member
from flask_login import current_user, login_required

server_routes = Blueprint('servers', __name__)

auth_error = 'You are not the owner of this server'

# Get Server By ID
@server_routes.route('/<int:id>')
@login_required
def get_server_by_id(id):

    server = Server.query.get(id)
    return server.to_dict()


# Create a server
@server_routes.route('/create', methods=[ 'POST' ] )
@login_required
def create_server():
    name = request.json[ "name" ]
    image = request.json[ "image" ]

    user = User.query.get(current_user.id)

    server = Server (
        name = name,
        owner_id = int(current_user.id),
        image = image
    )

    db.session.add(server)
    db.session.commit()
    user.joined_servers.append(server)
    db.session.commit()

    # Create general Channel

    channel = Channel (
        server_id = server.id,
        name = 'general'
    )

    db.session.add(channel)
    db.session.commit()

    return server.to_dict()


# Edit a server
@server_routes.route('/<int:id>/edit', methods = ['PUT'])
@login_required
def edit_server(id):

    server = Server.query.get(id)

    if server.owner_id != current_user.id:
        return auth_error

    server.name = request.json[ "name" ]
    server.image = request.json[ "image" ]
    db.session.commit()

    return server.to_dict()


# Delete a server
@server_routes.route('/<int:id>/delete', methods = ['DELETE'])
@login_required
def delete_server(id):

    server = Server.query.get(id)

    if server.owner_id != current_user.id:
        return auth_error

    db.session.delete(server)
    db.session.commit()

    return 'The server has been deleted'
