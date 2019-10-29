from flask import Blueprint, jsonify, request, render_template
from . import db
from .models import User, GroupDescription, group_membership_table

GroupsApi = Blueprint('groups', __name__)

# http://127.0.0.1:5000/api/new_group/
@GroupsApi.route('/', methods=['POST'])
def create_groups():
    try:
        request_data = request.get_json()
        user_ids = request_data.get("user_ids")
        new_group = GroupDescription.create_group(request.json)

        for user_id in user_ids:                            # Can re-write to make faster/should check if user_ids exist.
            user = User.query.filter(User.user_id == user_id).first()
            new_group.users.append(user)

    except KeyError as e:
        return jsonify(f'Missing key: {e.args[0]}'), 400

    db.session.add(new_group)
    db.session.commit()
    return jsonify(), 200