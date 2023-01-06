from app.models import db, Server, environment, SCHEMA


# Adds a demo user, you can add other servers here if you want
def seed_servers():
    Certified_Coder_Bois = Server(
        owner_id= 1, name ='Certified_Coder_Bois', image ='https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y29tcHV0ZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
        public = True)
    Stamp_Club = Server(
        owner_id= 4, name ='Stamps 4 eva', image ='https://images.unsplash.com/photo-1619560820102-31f5b04c049a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8c3RhbXBzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60', public = True)
    App_Academy = Server(
        owner_id= 2, name ='App Academy', image ='https://assets-global.website-files.com/5dcc7f8c449e597ed83356b8/603820afd31232aab368ea6f_New%20Red-logo-emblem.webp', public = True)
    marnie = Server(
        owner_id= 3, name ='marnie', image ='https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjN8fHJhbmRvbSUyMHBlb3BsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60', public = False, private_member_id = 2)
    gloria = Server(
        owner_id= 5, name ='gloria', image ='https://images.unsplash.com/photo-1620216464337-69f08c564cf1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGZhdCUyMGxhZHl8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60', public = False, private_member_id = 4)

    db.session.add(Certified_Coder_Bois)
    db.session.add(Stamp_Club)
    db.session.add(App_Academy)
    db.session.add(marnie)
    db.session.add(gloria)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the servers table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_servers():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.servers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM servers")

    db.session.commit()
