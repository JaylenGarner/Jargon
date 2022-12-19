# `Discord`

## Frontend Route Documentation

## *User Routes*

*The user cannot access any part of the site without being logged in, they should always be redirected to the login page*

## Log In

Renders a login form. Once the user succuessfuly logs in, they are redirected to the home page.

- Route: "/login"

## Sign Up a User

Renders a signup form. Once the user succuessfuly signs up, they are redirected to the home page.

- Route: "/signup"

## *Public Server Routes (CRUD)*

## Home

This page renders all of the public servers.

This page renders all of the user's direct messages. (Private servers that the user owns or is a member of)

* The user will be presented with buttons to 'Create a Server' and 'Create Private Server (Direct Messages) *

- Route: "/"

## View a Public Server

Displays the content of the public server. All of the server's channels will be displayed.

* If the user is the owner, they will be presented with the following options via buttons: (Edit Server, Delete Server, and Create Channel)

- Route: "servers/:serverId"

## Create a Public Server

Renders a form to create a new public server. Once the form is successfully completed, the user will be redirected to the newly created server's page.

* This form will set the server's attribute 'public' to true automatically *

Route: "/servers/create"

## Edit a Public Server

* This page will only be accessible by the server's owner *

Renders a form to edit a public server. Once the form is successfully completed, the user will be redirected to the edited server's page.

Route: "/servers/:serverId/edit"

*Direct Message Routes*

## View Direct Messages (Private Servers)

Renders a specific Private Server (Direct Messages)

-Route: "/direct-messages/:directMessageId"

## Create A Direct Message (Private) Server

Renders a form to create a new private server. Once the form is successfully completed, the user will be redirected to the newly created server's page.

* This form will set the server attribute 'public' to false automatically' *

* This form will require a 'Member User' ID to complete. This will establish a two person private server to function as a direct messages inbox *

-Route: "/direct-messages/create"

*Channels Routes (CRUD)*

## View a channel

Displays the content of the channel. All of the channel's messages will be displayed.

* All users will be presented with the option to post a message within the channel with a built in message form attached to the bottom of the message feed *

* If the user is the owner, they will be presented with the following additional options via buttons: (Edit Channel and Delete Channel)

- Route: "servers/:serverId/channels/:channelId"

## Create a channel

* This form is only available to the server's owner *

Renders a form to create a new channel. Once the form is successfully completed, the user will be redirected to the newly created channel's page.

Route: "/servers/:serverId/channels/create"


## Edit a Channel

* This page will only be accessible by the server's owner *

Renders a form to edit a channel. Once the form is successfully completed, the user will be redirected to the server's page.

Route: "/servers/:serverId/channel/:channelId/edit"
