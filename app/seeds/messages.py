from app.models import db, Message, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_messages():
    message1 = Message(
        user_id= 3, channel_id = 1 , body = 'I AM SO HYPED TO BE A CERTIFIED CODER BOY! THX FOR THE INVITE')
    message2 = Message(
        user_id= 1, channel_id = 1 , body = 'Welcome to the team!')
    message3 = Message(
        user_id= 1, channel_id = 2 , body = 'Meeting this friday at 2 pm in the zoom!')
    message4 = Message(
        user_id= 5, channel_id = 2 , body = 'Just pushed the project up to github. Let me know if you see it!')
    message5 = Message(
        user_id= 4, channel_id = 3 , body = 'Stamps 4 lyfe!')
    message6 = Message(
        user_id= 4, channel_id = 4 , body = 'Doing a stampbook flipthrough at 4 pm! Make sure to join the twitch!')
    message7 = Message(
        user_id= 5, channel_id = 5 , body = 'Starting in the fall. Cant wait to meet everyone!')
    message8 = Message(
        user_id= 1, channel_id = 6 , body = 'Make sure to do fill out your survey! or you get a strike!')
    message9 = Message(
        user_id= 4, channel_id = 1 , body = 'Stamps 4 lyfe!')
    message10 = Message(
        user_id= 4, channel_id = 1 , body = 'Stamps 4 lyfe!')
    message11 = Message(
        user_id= 4, channel_id = 1 , body = 'Stamps 4 lyfe!')
    message12 = Message(
        user_id= 4, channel_id = 1 , body = 'Stamps 4 lyfe!')

    db.session.add(general_cb)
    db.session.add(updates_cb)
    db.session.add(general_sc)
    db.session.add(updates_sc)
    db.session.add(general_aa)
    db.session.add(updates_aa)
    db.session.add(marnie_bobbie)
    db.session.add(gary_gloria)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()
