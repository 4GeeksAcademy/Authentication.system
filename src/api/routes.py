from flask import Flask, request, jsonify, Blueprint
from api.models import db, User
from flask_cors import CORS
import jwt
import datetime
from functools import wraps

api = Blueprint('api', __name__)
CORS(api)

SECRET_KEY = 'your_secret_key_here'

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('x-access-token')
        if not token:
            return jsonify({'message': 'Token is missing!'}), 403
        try:
            data = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
            current_user = User.query.filter_by(id=data['id']).first()
            if not current_user:
                raise ValueError("User not found")
        except Exception as e:
            return jsonify({'message': 'Token is invalid!', 'error': str(e)}), 403
        return f(current_user, *args, **kwargs)
    return decorated

@api.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'message': 'Email and password are required!'}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({'message': 'User already exists!'}), 400

    new_user = User(email=email)
    new_user.set_password(password)
    new_user.is_active = True

    try:
        db.session.add(new_user)
        db.session.commit()
        return jsonify({'message': 'User created successfully!'}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Failed to create user', 'error': str(e)}), 500

@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'message': 'Email and password are required!'}), 400

    user = User.query.filter_by(email=email).first()
    if not user or not user.check_password(password):
        return jsonify({'message': 'Invalid credentials!'}), 401

    try:
        token = jwt.encode({
            'id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
        }, SECRET_KEY, algorithm="HS256")
        return jsonify({'token': token})
    except Exception as e:
        return jsonify({'message': 'Failed to generate token', 'error': str(e)}), 500

@api.route('/private', methods=['GET'])
@token_required
def private(current_user):
    return jsonify({'message': f'Welcome {current_user.email}!'})
