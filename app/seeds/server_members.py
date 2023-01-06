# from app.models import db, server_member, environment, SCHEMA


# # Adds a demo user, you can add other server_members here if you want
# def seed_server_members():
#     demo_ccb = server_member(
#         user_id= 1, server_id= 1)
#     bobbie_ccb = server_member(
#         user_id= 3, server_id= 1)
#     gary_ccb = server_member(
#         user_id= 5, server_id= 1)
#     demo_aa = server_member(
#         user_id= 1, server_id= 3)
#     marnie_aa = server_member(
#         user_id= 2, server_id= 3)
#     bobbie_aa = server_member(
#         user_id= 3, server_id= 3)
#     gloria_aa = server_member(
#         user_id= 4, server_id= 3)
#     gary_aa = server_member(
#         user_id= 5, server_id= 3)

#     db.session.add(demo_ccb)
#     db.session.add(bobbie_ccb)
#     db.session.add(gary_ccb)
#     db.session.add(demo_aa)
#     db.session.add(marnie_aa)
#     db.session.add(bobbie_aa)
#     db.session.add(gloria_aa)
#     db.session.add(gary_aa)
#     db.session.commit()


# # Uses a raw SQL query to TRUNCATE or DELETE the server_members table. SQLAlchemy doesn't
# # have a built in function to do this. With postgres in production TRUNCATE
# # removes all the data from the table, and RESET IDENTITY resets the auto
# # incrementing primary key, CASCADE deletes any dependent entities.  With
# # sqlite3 in development you need to instead use DELETE to remove all data and
# # it will reset the primary keys for you as well.
# def undo_server_members():
#     if environment == "production":
#         db.session.execute(f"TRUNCATE table {SCHEMA}.server_members RESTART IDENTITY CASCADE;")
#     else:
#         db.session.execute("DELETE FROM server_members")

#     db.session.commit()
