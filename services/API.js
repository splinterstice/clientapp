// services/API.js
/**
 * API Service for interacting with the chat application's backend.
 * This file provides functions to perform operations like:
 *   - Sending/receiving messages
 *   - Managing friends (add/remove/request)
 *   - Uploading files (pictures, videos, etc.)
 *   - Joining chat rooms and sending room messages
 *   - Administrative functions: invite, promote, ban, edit, reset keys
 *
 * All API calls use fetch() to interact with the Rails backend.
 */

const API_BASE_URL = 'https://your-chat-server-url.com/api';

/**
 * Sends a direct message to a user.
 * @param {string} recipientId - The user ID of the recipient.
 * @param {string} message - The text message to send.
 * @returns {Promise<object>} - Resolves with the response data.
 *
 * Example:
 * sendMessage('user123', 'Hello there!')
 *   .then(response => console.log(response))
 *   .catch(error => console.error(error));
 */
export async function sendMessage(recipientId, message) {
  const response = await fetch(`${API_BASE_URL}/messages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ recipient_id: recipientId, message }),
  });
  return response.json();
}

/**
 * Retrieves direct messages for the logged-in user.
 * @returns {Promise<Array>} - Resolves with an array of messages.
 */
export async function getMessages() {
  const response = await fetch(`${API_BASE_URL}/messages`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  return response.json();
}

/**
 * Sends a friend request to another user.
 * @param {string} userId - The ID of the user to send a friend request to.
 * @returns {Promise<object>} - Resolves with the response data.
 */
export async function sendFriendRequest(userId) {
  const response = await fetch(`${API_BASE_URL}/friends/request`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id: userId }),
  });
  return response.json();
}

/**
 * Removes a friend from the user's friend list.
 * @param {string} friendId - The ID of the friend to remove.
 * @returns {Promise<object>} - Resolves with the response data.
 */
export async function removeFriend(friendId) {
  const response = await fetch(`${API_BASE_URL}/friends/${friendId}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });
  return response.json();
}

/**
 * Uploads a file (image, video, etc.) to the server.
 * @param {object} file - The file object to upload.
 * @returns {Promise<object>} - Resolves with the upload result.
 */
export async function uploadFile(file) {
  let formData = new FormData();
  formData.append('file', file);
  const response = await fetch(`${API_BASE_URL}/files/upload`, {
    method: 'POST',
    body: formData,
  });
  return response.json();
}

/**
 * Joins a chat room.
 * @param {string} roomId - The ID of the chat room to join.
 * @returns {Promise<object>} - Resolves with the join response.
 */
export async function joinChatRoom(roomId) {
  const response = await fetch(`${API_BASE_URL}/chat_rooms/join`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ room_id: roomId }),
  });
  return response.json();
}

/**
 * Leaves a chat room.
 * @param {string} roomId - The ID of the chat room to leave.
 * @returns {Promise<object>} - Resolves with the leave response.
 */
export async function leaveChatRoom(roomId) {
  const response = await fetch(`${API_BASE_URL}/chat_rooms/leave`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ room_id: roomId }),
  });
  return response.json();
}

/**
 * Sends a message to a chat room.
 * @param {string} roomId - The ID of the chat room.
 * @param {string} message - The text message to send.
 * @returns {Promise<object>} - Resolves with the response data.
 */
export async function sendChatRoomMessage(roomId, message) {
  const response = await fetch(`${API_BASE_URL}/chat_rooms/message`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ room_id: roomId, message }),
  });
  return response.json();
}

/* ----------------------- Administrative Endpoints ----------------------- */

/**
 * Invites a user to a chat server via email or URL.
 * @param {string} inviteMethod - Either "email" or "url".
 * @param {string} target - The email address or URL.
 * @param {string} network - The network to use ("TOR" or "I2P").
 * @returns {Promise<object>} - Resolves with the invitation response.
 */
export async function inviteUser(inviteMethod, target, network) {
  const response = await fetch(`${API_BASE_URL}/admin/invite`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ invite_method: inviteMethod, target, network }),
  });
  return response.json();
}

/**
 * Promotes a user to moderator.
 * @param {string} userId - The ID of the user to promote.
 * @returns {Promise<object>} - Resolves with the promotion response.
 */
export async function promoteUser(userId) {
  const response = await fetch(`${API_BASE_URL}/admin/promote`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id: userId }),
  });
  return response.json();
}

/**
 * Bans a user from the chat server.
 * @param {string} userId - The ID of the user to ban.
 * @returns {Promise<object>} - Resolves with the ban response.
 */
export async function banUser(userId) {
  const response = await fetch(`${API_BASE_URL}/admin/ban`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id: userId }),
  });
  return response.json();
}

/**
 * Edits a user's details.
 * @param {string} userId - The ID of the user to edit.
 * @param {object} updates - Object with fields to update.
 * @returns {Promise<object>} - Resolves with the update response.
 */
export async function editUser(userId, updates) {
  const response = await fetch(`${API_BASE_URL}/admin/edit_user`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id: userId, updates }),
  });
  return response.json();
}

/**
 * Resets a user's public/private keys (acting as passwords).
 * @param {string} userId - The ID of the user.
 * @returns {Promise<object>} - Resolves with the new key pair.
 */
export async function resetKeys(userId) {
  const response = await fetch(`${API_BASE_URL}/admin/reset_keys`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id: userId }),
  });
  return response.json();
}
