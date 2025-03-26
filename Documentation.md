# Chat Application API Documentation

This document describes the API endpoints used by the chat application. The backend is built in Ruby on Rails 8 and is accessible via TOR.

## Base URL

https://your-chat-server-url.com/api


## Endpoints

### 1. Direct Messages

#### Send Direct Message
- **Endpoint:** `/messages`
- **Method:** POST
- **Description:** Sends a direct message to a specified recipient.
- **Request Body:**
  ```json
  {
    "recipient_id": "string", // Recipient's user ID
    "message": "string"       // Message text
  }

    Response Example:

{
"status": "success",
"message_id": "12345",
"timestamp": "2025-03-24T12:34:56Z"
}

Usage Example (JavaScript):

    sendMessage('user123', 'Hello there!')
      .then(response => console.log(response))
      .catch(error => console.error(error));

Get Direct Messages

    Endpoint: /messages

    Method: GET

    Description: Retrieves the list of direct messages for the authenticated user.

    Response Example:

    [
      { "id": "1", "sender": "userA", "message": "Hello", "timestamp": "2025-03-24T12:00:00Z" },
      { "id": "2", "sender": "userB", "message": "Hi", "timestamp": "2025-03-24T12:05:00Z" }
    ]

2. Friends Management
   Send Friend Request

   Endpoint: /friends/request

   Method: POST

   Description: Sends a friend request to another user.

   Request Body:

{
"user_id": "string"
}

Response Example:

    {
      "status": "pending",
      "request_id": "abc123"
    }

Remove Friend

    Endpoint: /friends/{friendId}

    Method: DELETE

    Description: Removes the specified user from the friend list.

    Response Example:

    {
      "status": "removed",
      "friend_id": "user123"
    }

3. File Upload
   Upload File

   Endpoint: /files/upload

   Method: POST

   Description: Uploads a file (picture, video, etc.) to the server.

   Request Body: FormData containing the file.

   Response Example:

   {
   "status": "success",
   "file_url": "https://your-chat-server-url.com/uploads/file.jpg"
   }

4. Chat Rooms
   Join Chat Room

   Endpoint: /chat_rooms/join

   Method: POST

   Description: Joins the specified chat room.

   Request Body:

{
"room_id": "string"
}

Response Example:

    {
      "status": "joined",
      "room_id": "room123"
    }

Leave Chat Room

    Endpoint: /chat_rooms/leave

    Method: POST

    Description: Leaves the specified chat room.

    Request Body:

{
"room_id": "string"
}

Response Example:

    {
      "status": "left",
      "room_id": "room123"
    }

Send Message in Chat Room

    Endpoint: /chat_rooms/message

    Method: POST

    Description: Sends a message to a chat room.

    Request Body:

{
"room_id": "string",
"message": "string"
}

Response Example:

    {
      "status": "success",
      "message_id": "67890",
      "timestamp": "2025-03-24T12:45:00Z"
    }

5. Administrative Endpoints
   Invite User

   Endpoint: /admin/invite

   Method: POST

   Description: Invites a user via email or URL using TOR or I2P.

   Request Body:

{
"invite_method": "email" | "url",
"target": "string", // Email address or URL
"network": "TOR" | "I2P"
}

Response Example:

    {
      "status": "invited",
      "invite_id": "invite123"
    }

Promote User to Moderator

    Endpoint: /admin/promote

    Method: POST

    Description: Promotes a user to moderator status.

    Request Body:

{
"user_id": "string"
}

Response Example:

    {
      "status": "promoted",
      "user_id": "user123"
    }

Ban User

    Endpoint: /admin/ban

    Method: POST

    Description: Bans a user from the chat server.

    Request Body:

{
"user_id": "string"
}

Response Example:

    {
      "status": "banned",
      "user_id": "user123"
    }

Edit User

    Endpoint: /admin/edit_user

    Method: PUT

    Description: Edits a user's details.

    Request Body:

{
"user_id": "string",
"updates": {
"displayName": "string"
// Additional editable fields
}
}

Response Example:

    {
      "status": "updated",
      "user": { "id": "user123", "displayName": "New Name" }
    }

Reset Public/Private Keys

    Endpoint: /admin/reset_keys

    Method: POST

    Description: Resets a user's public/private keys (acting as passwords).

    Request Body:

{
"user_id": "string"
}

Response Example:

    {
      "status": "reset",
      "new_keys": {
        "public_key": "newPublicKey",
        "private_key": "newPrivateKey"
      }
    }

Embedded NGINX Proxy

The application embeds an NGINX proxy to communicate with the backend via TOR and I2P.

    Initialize: Write configuration and prepare the proxy.

    Start/Stop: Manage the proxy process.

    Reconfigure: Update settings (server URL, TOR/I2P ports).

These functions are exposed via the NginxProxyManager module.
Conclusion

This document covers the endpoints available for the chat application and provides sample usage for each API call.

## Directory Structure

```ascii
ChatApp/
├── android/                  # Android native project files
├── ios/                      # iOS native project files
├── macos/                    # macOS native project files (React Native macOS)
├── windows/                  # Windows native project files (React Native Windows)
├── src/
│   ├── components/           # React Native components
│   │   ├── ChatScreen.js
│   │   ├── FriendsScreen.js
│   │   ├── AdminPanel.js
│   │   └── ServerSettings.js
│   ├── services/             # API and NGINX proxy service modules
│   │   ├── API.js
│   │   └── NginxProxyManager.js
│   └── App.js                # Main entry point of the application
├── Documentation.md          # Detailed API and project documentation
├── package.json              # Project configuration and dependencies
└── README.md                 # Project overview and setup instructions
```

---

### Final Notes

- **Backend Integration:**  
  The provided API functions assume that your Ruby on Rails backend is configured to handle these endpoints. Adjust the `API_BASE_URL` and endpoint paths as needed.

- **NGINX Proxy:**  
  The `NginxProxyManager` simulates an embedded proxy. In production, you might package an actual NGINX binary with your app and communicate with it via native modules.

- **Platform Support:**  
  React Native’s core supports Android and iOS, while [React Native Windows](https://microsoft.github.io/react-native-windows/) and [React Native macOS](https://github.com/microsoft/react-native-macos) enable desktop support.

- **Documentation & Code Comments:**  
  Each method and endpoint is documented with inline comments and detailed usage examples in the accompanying Markdown file.

This complete example should give you a strong starting point for your chat application project. Enjoy building your secure, multi‑server, cross‑platform chat app!
