# Jargon

By _[Jaylen Garner](https://github.com/JaylenGarner)_

SurReel is a dynamic platform for visual storytelling. It lets you explore captivating content and connect with like-minded individuals through an immersive home feed and interactive live chat features. Join SurReel today and start sharing your unique perspective with the world!

## Index

- [API Documentation](https://github.com/JaylenGarner/SurReel/wiki/API-Routes)
- [Database Schema](https://github.com/JaylenGarner/SurReel/wiki/Database-Schema)
- [Frontend Routes](https://github.com/JaylenGarner/SurReel/wiki/Frontend-Routes)
- [MVP Feature List](https://github.com/JaylenGarner/SurReel/wiki/MVP-List)
- [User Stories](https://github.com/JaylenGarner/SurReel/wiki/User-Stories)

## Technologies Used

- JavaScript
- React/Redux
- CSS
- Python
- Flask/SQLAlchemy
- PostgreSQL (production)
- SQLite3 (development)

## Overview

### Login/Signup
Jargon is a Discord clone that immediately directs users to the login page upon accessing the site. From there, users can choose to sign up or sign in, with the added option to sign in as a "Demo" user. Any attempt to access site pages without a login will redirect users to the login page.

![image](https://user-images.githubusercontent.com/93837049/232918402-9f97503c-071f-4052-9285-04db031a876a.png)


### Feed
When logging into the site, the user is greeted with their feed, which displays posts from the users they follow. If the user is not following anyone, they will be presented with the following message "There are no posts in your feed, get started by following other users" and a button that navigates them to a page that displays all of the application's users.

<img width="1129" alt="Screenshot 2023-04-18 at 6 11 16 PM" src="https://user-images.githubusercontent.com/93837049/232918554-ba733613-3355-4fd2-a619-94ff218bf7e6.png">

Users on SurReel can like and unlike posts on their feed by simply clicking on the heart icon located beneath a post's image. If a user selects 'Likes' under a post's image, a modal will appear overlaying the page, listing the relevant users.

In addition, users can also leave comments on posts and view a post's page by selecting its 'view all comments' button.

### Navigation Bar

SurReel's navbar features several links, including the user's home feed, a form to create a post, a view of all direct messaging chats, and a list of the application's current users. The option to log out is also present in the navbar.

To navigate to their own profile, users can simply select their profile picture.

### Profile

Clicking on a user's username or profile picture on most areas of SurReel will redirect you to their profile. On their profile, you can view all of the user's posts, and above their posts, you will see their total number of posts, followers, and following. Additionally, a follow button is present, and its functionality will change depending on the current user's relationship with the user:

- If neither user follows each other: The button will display 'Follow'
- If the user is following the current user, but the current user is not following the user: The button will display 'Follow back'
- If the current user follows the user: The button will display 'Unfollow'

<img width="1275" alt="Screenshot 2023-04-18 at 6 12 35 PM" src="https://user-images.githubusercontent.com/93837049/232918775-33e55cf7-6dd8-44fc-8f63-8f4184bb6cca.png">

If you select either 'followers' or 'following', a modal will appear overlaying the page, listing the relevant users.

Lastly, selecting any displayed post will redirect you to the post's page. 

### Post Page

When selecting a post, SurReel will redirect you to a new page displaying the image at a much larger size, along with its caption and comments. Here, you can like, unlike, comment on the post, and view all of its likes.

If a user wants to edit or delete their comment, they can select the '...' button located next to the comment.

In addition, the owner of the post can edit or delete it by selecting the corresponding buttons labeled as such.

<img width="1158" alt="Screenshot 2023-04-18 at 6 14 14 PM" src="https://user-images.githubusercontent.com/93837049/232919194-4bfc4459-0be1-430a-aa5b-7ac9cde976a9.png">

### Create a Post

Selecting 'Create a Post' in the navbar will redirect the user to a form where they can create a new post. The form allows the user to select an image file from their system and set a caption. As soon as an image is selected, a preview of the post will be displayed beneath the form.

<img width="425" alt="Screenshot 2023-04-18 at 6 21 25 PM" src="https://user-images.githubusercontent.com/93837049/232919340-5053e203-8d82-4b41-be4e-182903cdb85d.png">

After the user submits the post, they will see an animation indicating that the image is uploading to the S3 bucket. Once the upload is complete, the user will be redirected to their profile.

### Messages

The direct messaging area displays a user's existing conversations, allowing them to easily browse and select the one they want to participate in. Once selected, the user will be redirected to the conversation's chat room where they can send and receive messages.

If a user selects the draft icon, they will be redirected to the create chat room page, where they can create a new conversation.

### Create Chat Room

On this page, the user will see a checklist displaying all of the application's users, allowing them to select who they want to start a conversation with.

### Chat Room

Here, the user can view a feed of all messages that have been created in the room in real-time with web sockets.
