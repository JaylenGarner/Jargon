from app.models import db, User, environment, SCHEMA
from .servers import certified_coder_bois, stamp_club, app_academy, marnie_dm, gloria_dm


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', image = 'https://images.unsplash.com/photo-1580741569354-08feedd159f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZXhwbG9zaW9ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60', joined_servers=[certified_coder_bois, app_academy])
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password', image = 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjN8fHJhbmRvbSUyMHBlb3BsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60', joined_servers=[app_academy, marnie_dm])
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password', image = 'https://images.unsplash.com/photo-1492447273231-0f8fecec1e3a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzZ8fHJhbmRvbSUyMHBlb3BsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60', joined_servers=[certified_coder_bois, app_academy, marnie_dm])
    gloria = User(
        username='gloria', email='gloria@aa.io', password='password', image = 'https://images.unsplash.com/photo-1620216464337-69f08c564cf1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGZhdCUyMGxhZHl8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60', joined_servers=[app_academy, stamp_club, gloria_dm])
    gary = User(
        username='gary', email='gary@aa.io', password='password', image = 'https://images.unsplash.com/photo-1619451683205-1f77097aa8d5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=710&q=80', joined_servers=[certified_coder_bois, stamp_club, app_academy, gloria_dm])

    # db.session.add(demo)
    # db.session.add(marnie)
    # db.session.add(bobbie)
    # db.session.add(gloria)
    # db.session.add(gary)
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
