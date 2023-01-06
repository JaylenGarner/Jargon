from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, Server

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict_basic() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict_basic()


@user_routes.route('/')
@login_required
def joined_servers():
    owned_servers = Server.query.filter(Server.owner_id == current_user.id)

    return {'servers': [server.to_dict() for server in owned_servers]}