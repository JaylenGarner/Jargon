# Jargon

By _[Jaylen Garner](https://github.com/JaylenGarner)_

Jargon is a communication platform that connects users with similar interests. By joining or creating servers, users can engage in conversations across multiple channels with like-minded individuals. Join now to get in on the [Jargon.](https://jargon.onrender.com/)


## Index

- [API Documentation](https://github.com/JaylenGarner/SurReel/wiki/API-Routes)
- [Database Schema](https://github.com/JaylenGarner/Jargon/wiki/Database-Schema)
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

<img width="1406" alt="Screenshot 2023-05-07 at 11 50 43 AM" src="https://user-images.githubusercontent.com/93837049/236688236-800d8751-391b-45d7-8cc4-5d426388ac4b.png">

### Direct Messages
When logging into the site, the user is greeted with the direct messages area, which displays conversations that they have with other users. The user is also provided with the option to choose a user to start a conversation with.

<img width="1184" alt="Screenshot 2023-05-07 at 11 52 25 AM" src="https://user-images.githubusercontent.com/93837049/236688308-63bcf665-eb58-4fc2-a037-51de394b6592.png">

The conversation page enables users to view all messages exchanged within a particular conversation, as well as compose and send new messages.

<img width="1406" alt="Screenshot 2023-05-07 at 12 08 21 PM" src="https://user-images.githubusercontent.com/93837049/236689089-b3c66c37-56c6-4c14-8731-c2301c52bdcb.png">


### Navigation Bar

Jargon's navigation bar presents images of servers that the user is a member of. By selecting a specific server, the user is redirected to that server's page, where they can access all relevant information and functionalities. Additionally, the navbar provides options to create a new server or log out of the current session. To navigate back to the direct messages page, users can select the Jargon logo at the top of the navbar. 

### Server Page

Upon selecting a server on Jargon, the user is directed to a new page that displays all the channels within that server. By default, the user is directed to the server's "general" channel, but they can navigate to other channels by selecting their name on the sidebar. The page also features a list of all the members within the server.

For users who own the server, additional options are available in the sidebar. These include the ability to add new members, create new channels, edit the server settings, and delete the server entirely.

<img width="1401" alt="Screenshot 2023-05-07 at 12 06 51 PM" src="https://user-images.githubusercontent.com/93837049/236689033-2c33f69d-8f08-47b9-bda8-d8ca66a498eb.png">

### Channel Page

On the channel page, users can view all messages that have been sent within that particular channel. Additionally, users can draft and send messages to the channel.

If a user is the owner of the channel, they have the ability to edit the channel and delete the channel entirely.
