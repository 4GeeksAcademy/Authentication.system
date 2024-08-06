import os
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from .models import db, User

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample_key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')

    # Add your models here
    admin.add_view(ModelView(User, db.session))
    
    # You can add more models here
    # admin.add_view(ModelView(YourModelName, db.session))
