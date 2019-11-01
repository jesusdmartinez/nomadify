from flask import current_app as app
from flask import render_template, jsonify, flash, request

from .hello import HelloApi
from .users import NewUsersApi
from .messages import ChatsApi
from .groups import GroupsApi
from .models import User, Messages

from . import db

#blueprint lives here because flask has been told so
app.register_blueprint(HelloApi, url_prefix='/hello')
app.register_blueprint(NewUsersApi, url_prefix='/register')
app.register_blueprint(ChatsApi, url_prefix='/api/chats')
app.register_blueprint(GroupsApi, url_prefix='/api/new_group')

# Screen for users to login to their account or create a new account
@app.route('/')
def hello():
    return render_template('hello.html')


# Shows a user all the running conversations that they have
@app.route('/homescreen')
def account_homescreen():
    return render_template('account_summary.html')


# Get to the chat template
@app.route('/chat', methods=['GET'])
def chat():
    user_id = request.args['user_id']
    user = User.query.filter(User.user_id == user_id).first()

    # user_groups = user.groups
    # for groups in user_groups:
    #     last_message = db.session.query(Messages.timestamp).order_by(Messages.timestamp.desc()).first()

    return render_template('chat.html', groups=user.groups, user=user)


@app.route('/chat/<group_id>', methods=['POST'])
def post_message(group_id):
    try:
        user_id = request.args['user_id']
        request_data = request.get_json()
        message_content = request_data.get["message_content"]
        new_message = Messages(group_id=group_id, message_content=message_content, user_id=user_id)
    except KeyError as e:
        return jsonify(f'Missing key: {e.args[0]}'), 400

    db.session.add(new_message)
    db.session.commit()
    return jsonify(), 200


#app.route and render_template are both flask items

#
# @app.route('/new_account')
# def register():
#     if current_user.is_authenticated:
#         return redirect(url_for('index'))
#     form = RegistrationForm()
#     if form.validate_on_submit():
#         user = Users(username=form.username.data, email=form.email.data)
#         user.set_password(form.password.data)
#         db.session.add(user)
#         db.session.commit()
#         flash('Congratulations, you are now a registered user!')
#         return redirect(url_for('login'))
#     return render_template('register.html', title='Register', form=form)