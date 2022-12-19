# `Discord`

## Database Schema Design

https://dbdiagram.io/d/639a6d8899cb1f3b55a17b71

## API Documentation

## All endpoints that require authentication

All endpoints require a current user to be logged in.

- Request: endpoints that require authentication
- Error Response: Require authentication

  - Status Code: 401
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Authentication required",
      "statusCode": 401
    }
    ```

## All endpoints that require proper authorization

All endpoints that require authentication and the current user does not have the
correct role(s) or permission(s).

- Request: endpoints that require proper authorization
- Error Response: Require proper authorization

  - Status Code: 403
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Forbidden",
      "statusCode": 403
    }
    ```

## Get the Current User

Returns the information about the current user that is logged in.

- Require Authentication: true
- Request

  - Method: GET
  - URL: api/session/current
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "id": 1,
      "username": "John",
      "email": "john.smith@gmail.com"
    }
    ```

## Log In a User

Logs in a current user with valid credentials and returns the current user's
information.

- Require Authentication: false
- Request

  - Method: POST
  - URL: api/session/login
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "email": "john.smith@gmail.com",
      "password": "secret password"
    }
    ```

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "id": 1,
      "firstName": "John",
      "lastName": "Smith",
      "email": "john.smith@gmail.com",
      "token": ""
    }
    ```

- Error Response: Invalid credentials

  - Status Code: 401
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Invalid credentials",
      "statusCode": 401
    }
    ```

- Error response: Body validation errors

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "email": "Email is required",
        "password": "Password is required"
      }
    }
    ```

## Sign Up a User

Creates a new user, logs them in as the current user, and returns the current
user's information.

- Require Authentication: false
- Request

  - Method: POST
  - URL: api/users/signup
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "email": "john.smith@gmail.com",
      "username": "John",
      "password": "secret password"
    }
    ```

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "id": 1,
      "email": "John",
      "username": "Smith",
      "token": ""
    }
    ```

- Error response: User already exists with the specified email

  - Status Code: 403
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "User already exists",
      "statusCode": 403,
      "errors": {
        "email": "User with that email already exists"
      }
    }
    ```

- Error response: Body validation errors

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "email": "Invalid email",
        "username": " Username is required",
        "lastName": "Password is required"
      }
    }
    ```

## Get all Public Servers

Returns all servers with the 'public' attribute being true.

- Require Authentication: false
- Request

  - Method: GET
  - URL: api/servers
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "Servers": [
        {
          "id": 1,
          "ownerId": 1,
          "name": "App Academy",
          "image": "image url",
          "createdAt": "2022-12-25 20:39:36",
          "updatedAt": "2021-12-25 20:39:36",
        }
      ]
    }
    ```

## Get all Public Servers owned by the Current User

Returns all the servers owned (created) by the current user with the 'public' attribute being true.

- Require Authentication: true
- Request

  - Method: GET
  - URL: api/servers/current
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "Servers": [
        {
          "id": 1,
          "ownerId": 1,
          "name": "App Academy",
          "image": "image url",
          "createdAt": "2022-12-25 20:39:36",
          "updatedAt": "2021-12-25 20:39:36",
        }
      ]
    }
    ```

## Get all Private Servers (Direct Messages) that the current user owns or is a member of.

Returns all the servers that the user owns with the public 'attibute' being false.
Also returns all of the servers with a 'private_member_id' equal to the user's id

- Require Authentication: true
- Request

  - Method: GET
  - URL: api/direct-messages/
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "Servers": [
        {
          "id": 1,
          "ownerId": 1,
          "name": "App Academy",
          "image": "image url",
          "private_member_id": 2,
          "createdAt": "2022-12-25 20:39:36",
          "updatedAt": "2021-12-25 20:39:36",
        }
      ]
    }
    ```


## Get details of a Server from an id

Returns the details of a server specified by its id.

- Require Authentication: false
- Request

  - Method: GET
  - URL: api/servers/:serverId
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "id": 1,
      "ownerId": 1,
      "name": "App Academy",
      "image": "image url",
      "public": true,
      "private_member_id": null,
      "createdAt": "2022-12-25 20:39:36",
      "updatedAt": "2021-12-25 20:39:36"
    }
    ```

- Error response: Couldn't find a Server with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Server couldn't be found",
      "statusCode": 404
    }
    ```

## Create a Public Server

Creates and returns a new Public Server.

* Attribute 'public' should default to true *

- Require Authentication: true
- Request

  - Method: POST
  - URL: api/servers
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "name": "App Academy",
      "image": "image url",
    }
    ```

- Successful Response

  - Status Code: 201
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "id": 1,
      "ownerId": 1,
      "name": "App Academy",
      "image": "image url",
      "createdAt": "2022-12-25 20:39:36",
      "updatedAt": "2021-12-25 20:39:36",
    }
    ```

- Error Response: Body validation error

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Validation Error",
      "statusCode": 400,
      "errors": {
        "name": "Name is required",
        "image": "Image is required",
      }
    }
    ```

## Create a Private Server

Creates and returns a new Private Server.

* Attribute 'public' should default to false *

- Require Authentication: true
- Request

  - Method: POST
  - URL: api/servers
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "name": "App Academy",
      "image": "image url",
      "privateMemberId": 2,
    }
    ```

- Successful Response

  - Status Code: 201
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "id": 1,
      "ownerId": 1,
      "name": "App Academy",
      "image": "image url",
      "privateMemberId": 2,
      "createdAt": "2022-12-25 20:39:36",
      "updatedAt": "2021-12-25 20:39:36",
    }
    ```

- Error Response: Body validation error

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Validation Error",
      "statusCode": 400,
      "errors": {
        "name": "Name is required",
        "image": "Image is required",
        "privateMemberId": 2,
      }
    }
    ```

## Edit a Server

Updates and returns an existing server.

- Require Authentication: true
- Require proper authorization: Server must belong to the current user
- Request

  - Method: PUT
  - URL: api/servers/:serverId
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "name": "App Academy",
      "image": "image url",
    }
    ```

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "id": 1,
      "ownerId": 1,
      "name": "App Academy",
      "image": "image url",
      "createdAt": "2022-12-25 20:39:36",
      "updatedAt": "2021-12-25 20:39:36"
    }
    ```

- Error Response: Body validation error

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Validation Error",
      "statusCode": 400,
      "errors": {
        "name": "Name is required",
        "image": "Image is required",
      }
    }
    ```

- Error response: Couldn't find a Server with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Server couldn't be found",
      "statusCode": 404
    }
    ```

## Delete a Server

Deletes an existing server.

- Require Authentication: true
- Require proper authorization: Server must belong to the current user
- Request

  - Method: DELETE
  - URL: api/servers/:serverId
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Successfully deleted",
      "statusCode": 200
    }
    ```

- Error response: Couldn't find a Server with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Server couldn't be found",
      "statusCode": 404
    }
    ```

## Get all Channels by a Servers's id

Returns all the Channels that belong to a Server specified by id.

- Require Authentication: false
- Request

  - Method: GET
  - URL: api/servers/:serverId/channels
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "Channels": [
        {
          "id": 1,
          "serverId": 1,
          "name": 1,
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36",
          "Messages": [
            {
              "id": 1,
              "user_id": 1,
              "channel_id": "image url",
              "body": "message body",
            }
          ]
        }
      ]
    }
    ```

- Error response: Couldn't find a Server with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Server couldn't be found",
      "statusCode": 404
    }
    ```

## Create a Channel for a Server based on the Servers's id

Create and return a new Channel for a Server specified by id.

- Require Authentication: true
- Request

  - Method: POST
  - URL: api/servers/:serverId/channels
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "name": "Channel name",
    }
    ```

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "id": 1,
      "serverId": 1,
      "name": "Channel name",
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-19 20:39:36"
    }
    ```

- Error Response: Body validation errors

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "name": "Name is required",
      }
    }
    ```

- Error response: Couldn't find a Server with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Server couldn't be found",
      "statusCode": 404
    }
    ```

## Edit a Channel

Update and return an existing channel.

- Require Authentication: true
- Require proper authorization: Server must belong to the current user
- Request

  - Method: PUT
  - URL: api/channels/:channelId
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
     {
      "name": "Channel name",
    }
    ```

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
   {
      "id": 1,
      "serverId": 1,
      "name": "Channel name",
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-19 20:39:36"
    }
    ```

- Error Response: Body validation errors

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "name": "Name is required",
      }
    }
    ```

- Error response: Couldn't find a Channel with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Channel couldn't be found",
      "statusCode": 404
    }
    ```

## Delete a Channel

Delete an existing channel.

- Require Authentication: true
- Require proper authorization: Server must belong to the current user
- Request

  - Method: DELETE
  - URL: api/channels/:channelId
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Successfully deleted",
      "statusCode": 200
    }
    ```

- Error response: Couldn't find a Channel with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Channel couldn't be found",
      "statusCode": 404
    }
    ```

## Get all Messages for a Channel based on the Channel's id

Return all the messages for a channel specified by id.

- Require Authentication: true
- Request

  - Method: GET
  - URL: api/channels/:channelId/messages
  - Body: none
    ```

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "Messages": [
        {
          "User": {
            "id": 2,
            "username": "John",
            "email": "Smith"
          },
          "id": 1,
          "userId": 2,
          "channelId": 2,
          "body": "Message body",
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36"
        }
      ]
    }
    ```

- Error response: Couldn't find a Channel with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Channel couldn't be found",
      "statusCode": 404
    }
    ```

## Create a Message for a Channel based on the Channel's id

Create and return a new message for a channel specified by id.

- Require Authentication: true
- Request

  - Method: POST
  - URL: api/channels/:channelId/messages
  - Body:

    ```json
    {
      "body": "Channel name"
    }
    ```

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "id": 1,
      "userId": 2,
      "channelId": 1,
      "body": "Message body",
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-19 20:39:36"
    }
    ```

- Error response: Couldn't find a Channel with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Channel couldn't be found",
      "statusCode": 404
    }
    ```

## Edit a Message

Update and return an existing message.

- Require Authentication: true
- Require proper authorization: Message must belong to the current user
- Request

  - Method: PUT
  - URL: api/messages/:messageId
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "body": "Message Body",
    }
    ```

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "id": 1,
      "userId": 2,
      "channelId": 1,
      "body": "Message body",
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-19 20:39:36"
    }
    ```

- Error response: Couldn't find a Message with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Message couldn't be found",
      "statusCode": 404
    }
    ```

## Delete a Message

Delete an existing message.

- Require Authentication: true
- Require proper authorization: Message must belong to the current user or the
  Server must belong to the current user
- Request

  - Method: DELETE
  - URL: api/messages/:messageId
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Successfully deleted",
      "statusCode": 200
    }
    ```

- Error response: Couldn't find a Message with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Message couldn't be found",
      "statusCode": 404
    }
    ```

## Add Query Filters to Get All Servers

Return Servers filtered by query parameters.

- Require Authentication: false
- Request

  - Method: GET
  - URL: api/servers
  - Query Parameters
    - page: integer, minimum: 0, maximum: 10, default: 0
    - size: integer, minimum: 0, maximum: 20, default: 20
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "Servers": [
        {
          "id": 1,
          "ownerId": 1,
          "name": "Server name",
          "image": "Image url",
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36"
        }
      ],
      "page": 2,
      "size": 25
    }
    ```

- Error Response: Query parameter validation errors

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Validation Error",
      "statusCode": 400,
      "errors": {
        "page": "Page must be greater than or equal to 0",
        "size": "Size must be greater than or equal to 0",
      }
    }
    ```
