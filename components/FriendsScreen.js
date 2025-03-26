// components/FriendsScreen.js
/**
 * FriendsScreen Component
 *
 * This component allows users to manage their friend list by:
 *  - Sending friend requests
 *  - Removing friends
 */

import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { sendFriendRequest, removeFriend } from '../services/API';

export default function FriendsScreen() {
  const [friendId, setFriendId] = useState('');

  /**
   * Sends a friend request.
   */
  async function handleSendFriendRequest() {
    try {
      const response = await sendFriendRequest(friendId);
      console.log('Friend request sent:', response);
      setFriendId('');
    } catch (error) {
      console.error('Error sending friend request:', error);
    }
  }

  /**
   * Removes a friend.
   */
  async function handleRemoveFriend() {
    try {
      const response = await removeFriend(friendId);
      console.log('Friend removed:', response);
      setFriendId('');
    } catch (error) {
      console.error('Error removing friend:', error);
    }
  }

  return (
    <View style={{ padding: 10 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Manage Friends</Text>
      <TextInput
        placeholder="Friend User ID"
        value={friendId}
        onChangeText={setFriendId}
        style={{ borderWidth: 1, marginVertical: 5, padding: 5 }}
      />
      <Button title="Send Friend Request" onPress={handleSendFriendRequest} />
      <View style={{ marginVertical: 5 }} />
      <Button title="Remove Friend" onPress={handleRemoveFriend} />
    </View>
  );
}
