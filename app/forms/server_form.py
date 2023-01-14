from flask_wtf import FlaskForm
from wtforms import StringField, DateField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import Server
from datetime import datetime

def server_exists(form, field):
    print("Checking if server exists", field.data)
    name = field.data
    server = server.query.filter(Server.name == name).first()
    if not name:
        raise ValidationError("Name provided was not valid")

class ServerForm(FlaskForm):
    owner_id = IntegerField('owner_id')
    name = StringField('name', validators=[DataRequired()])
    image = StringField('image')
    created_at = DateField('created_at', default=datetime.now())
