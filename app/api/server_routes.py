from flask import Blueprint, request, jsonify
from app.models import db, User, Server, Message, Channel, server_member
from flask_login import current_user, login_required

server_routes = Blueprint('servers', __name__)

@server_routes.route('/<int:id>')
@login_required
def get_server_by_id(id):

    server = Server.query.get(id)
    return server.to_dict()


@server_routes.route('/create', methods=[ 'POST' ] )
@login_required
def create_server():
    name = request.json[ "name" ]
    image = request.json[ "image" ]

    user = User.query.get(current_user.id)
    # print(user, 'BEFORE!!!!')

    print(user, 'USER PRINT')

    # Create Server Obj
    server = Server (
        name = name,
        owner_id = int(current_user.id),
        image = image
    )

    db.session.add(server)
    db.session.commit()

    user.joined_servers.append(server)

    # db.session.update(user)
    print(user.to_dict(), '!!!!!!!!!!!!')
    print(server.to_dict(), '!!!!!2@22222')
    db.session.commit()

    return user.to_dict()

# @server_routes.route('/create", methods=[ 'POST' def create server):
#     name = request. json ["name" ]
#     image = request. json [' image*]
# #create Server Object
#     server = Server (
#         name=name, owner_id-int(current_user.id), image=image,
#         db.session.add(Server)
#         db.session.commit ()
#         #add the server member object not sure how to do this
#         server_member = ServerMember(
#         server_id = int (server.id),
#         user id = int (current user.id)
#         db.session.add(server_member)
#         db.session.commit ()
# #add a generl/default channel
#         channel = Channel (
#         'General',
#         server id = server. id
#         db.session.add(channel)
#         db.session.commit ()
#         server_dict = server. to dict()
#         channel dict = channel.todict ()
#         return {'server" server dict,
#         *channel': channel _dict}


# TO DO
# Create a server
# Edit a server
# Delete a Server


# {'id': 1, 'username': 'Demo', 'image':
# 'https://images.unsplash.com/photo-1580741569354-08feedd159f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZXhwbG9zaW9ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
# 'ownedServers': [1, 6, 7], 'joinedServers': [1, 5]}
