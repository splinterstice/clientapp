// components/ChatScreen.js
/**
 * ChatScreen Component
 *
 * This component represents the chat interface where users can:
 *  - View direct messages
 *  - Send direct messages to a specific recipient
 *  - Join chat rooms and send messages to those rooms
 *  - Upload files (e.g., images, videos)
 */

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import { getMessages, sendMessage, sendChatRoomMessage, joinChatRoom, uploadFile } from '../services/API';

export default function ChatScreen() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [recipientId, setRecipientId] = useState('');
  const [roomId, setRoomId] = useState('');

  // Fetch messages on mount
  useEffect(() => {
    fetchMessages();
  }, []);

  /**
   * Fetches direct messages from the backend.
   */
  async function fetchMessages() {
    try {
      const msgs = await getMessages();
      setMessages(msgs);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  }

  /**
   * Sends a direct message.
   */
  async function handleSendMessage() {
    try {
      const response = await sendMessage(recipientId, text);
      console.log('Message sent:', response);
      setText('');
      fetchMessages();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }

  /**
   * Sends a message to a chat room.
   */
  async function handleSendRoomMessage() {
    try {
      const response = await sendChatRoomMessage(roomId, text);
      console.log('Chat room message sent:', response);
      setText('');
    } catch (error) {
      console.error('Error sending chat room message:', error);
    }
  }

  /**
   * Joins a chat room.
   */
  async function handleJoinRoom() {
    try {
      const response = await joinChatRoom(roomId);
      console.log('Joined chat room:', response);
    } catch (error) {
      console.error('Error joining chat room:', error);
    }
  }

  /**
   * Handles file upload.
   * (In a real app, integrate a file picker to get the file object.)
   */
  async function handleFileUpload(file) {
    try {
      const response = await uploadFile(file);
      console.log('File uploaded:', response);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }

  return (
    <View style={{ padding: 10, flex: 1 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Direct Messages</Text>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 5 }}>
            <Text>{item.sender}: {item.message}</Text>
          </View>
        )}
      />
      <TextInput
        placeholder="Recipient ID"
        value={recipientId}
        onChangeText={setRecipientId}
        style={{ borderWidth: 1, marginVertical: 5, padding: 5 }}
      />
      <TextInput
        placeholder="Type your message..."
        value={text}
        onChangeText={setText}
        style={{ borderWidth: 1, marginVertical: 5, padding: 5 }}
      />
      <Button title="Send Direct Message" onPress={handleSendMessage} />

      <View style={{ marginVertical: 10 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Chat Room</Text>
        <TextInput
          placeholder="Room ID"
          value={roomId}
          onChangeText={setRoomId}
          style={{ borderWidth: 1, marginVertical: 5, padding: 5 }}
        />
        <Button title="Join Room" onPress={handleJoinRoom} />
        <TextInput
          placeholder="Type room message..."
          value={text}
          onChangeText={setText}
          style={{ borderWidth: 1, marginVertical: 5, padding: 5 }}
        />
        <Button title="Send Room Message" onPress={handleSendRoomMessage} />
      </View>

      <TouchableOpacity onPress={() => {
        // For demonstration, use a fake file object.
        const fakeFile = { uri: 'path/to/file.jpg', type: 'image/jpeg', name: 'file.jpg' };
        handleFileUpload(fakeFile);
      }}>
        <Text style={{ color: 'blue', marginVertical: 10 }}>Upload File</Text>
      </TouchableOpacity>
    </View>
  );
}
