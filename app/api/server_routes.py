from flask import Blueprint, request, jsonify
from app.models import db, User, Server, Message, Channel, server_member
from flask_login import current_user, login_required

server_routes = Blueprint('servers', __name__)

@server_routes.route('/<int:id>')
@login_required
def get_server_by_id(id):

    server = Server.query.get(id)
    return server.to_dict()
