from app.models import db, Channel, environment, SCHEMA


# Adds a demo user, you can add other channels here if you want
def seed_channels():
    general_cb = Channel(
        server_id= 1, name ='general')
    updates_cb = Channel(
        server_id= 1, name ='updates')
    general_sc = Channel(
        server_id= 2, name ='general')
    updates_sc = Channel(
        server_id= 2, name ='updates')
    general_aa = Channel(
        server_id= 3, name ='general')
    updates_aa = Channel(
        server_id= 3, name ='updates')
    marnie_bobbie = Channel(
        server_id= 4, name ='Direct Message')
    gary_gloria = Channel(
        server_id= 5, name ='Direct Message')

    # db.session.add(general_cb)
    # db.session.add(updates_cb)
    # db.session.add(general_sc)
    # db.session.add(updates_sc)
    # db.session.add(general_aa)
    # db.session.add(updates_aa)
    # db.session.add(marnie_bobbie)
    # db.session.add(gary_gloria)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the channels table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_channels():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.channels RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM channels")

    db.session.commit()
