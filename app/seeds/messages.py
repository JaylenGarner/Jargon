from app.models import db, Message, environment, SCHEMA


# Adds a demo user, you can add other messages here if you want
def seed_messages():
    message1 = Message(
        user_id= 3, channel_id = 1, body = 'I AM SO HYPED TO BE A CERTIFIED CODER BOY! THX FOR THE INVITE')
    message2 = Message(
        user_id= 1, channel_id = 1, body = 'Welcome to the team!')
    message3 = Message(
        user_id= 1, channel_id = 2, body = 'Meeting this friday at 2 pm in the zoom!')
    message4 = Message(
        user_id= 5, channel_id = 2, body = 'Just pushed the project up to github. Let me know if you see it!')
    message5 = Message(
        user_id= 4, channel_id = 3, body = 'Stamps 4 lyfe!')
    message6 = Message(
        user_id= 4, channel_id = 4, body = 'Doing a stampbook flipthrough at 4 pm! Make sure to join the twitch!')
    message7 = Message(
        user_id= 5, channel_id = 5, body = 'Starting in the fall. Cant wait to meet everyone!')
    message8 = Message(
        user_id= 1, channel_id = 6, body = 'Make sure to do fill out your survey! or you get a strike!')
    message9 = Message(
        user_id= 2, channel_id = 7, body = 'Hello bobbie')
    message10 = Message(
        user_id= 3, channel_id = 7, body = 'Whats up')
    message11 = Message(
        user_id= 5, channel_id = 8, body = 'Hey booboo')
    message12 = Message(
        user_id= 4, channel_id = 8, body = 'Blocked.')

    # db.session.add(message1)
    # db.session.add(message2)
    # db.session.add(message3)
    # db.session.add(message4)
    # db.session.add(message5)
    # db.session.add(message6)
    # db.session.add(message7)
    # db.session.add(message8)
    # db.session.add(message9)
    # db.session.add(message10)
    # db.session.add(message11)
    # db.session.add(message12)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the messages table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_messages():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.messages RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM messages")

    db.session.commit()
