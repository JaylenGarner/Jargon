from flask import Blueprint, request, jsonify
from app.models import db, User, Server, Message, Channel, server_member
from flask_login import current_user, login_required

message_routes = Blueprint('messages', __name__)

# TO DO
# Create a message
# Edit a message
# Delete a message
