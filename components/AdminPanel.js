// components/AdminPanel.js
/**
 * AdminPanel Component
 *
 * Provides administrative functions:
 *  - Invite users via email or URL (TOR/I2P)
 *  - Promote users to moderator
 *  - Ban users
 *  - Edit user details
 *  - Reset public/private keys
 */

import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { inviteUser, promoteUser, banUser, editUser, resetKeys } from '../services/API';

export default function AdminPanel() {
  const [userId, setUserId] = useState('');
  const [inviteTarget, setInviteTarget] = useState('');
  const [inviteMethod, setInviteMethod] = useState('email');
  const [network, setNetwork] = useState('TOR');
  const [updates, setUpdates] = useState({ displayName: '' });

  /**
   * Invites a user using TOR or I2P.
   */
  async function handleInviteUser() {
    try {
      const response = await inviteUser(inviteMethod, inviteTarget, network);
      console.log('User invited:', response);
      setInviteTarget('');
    } catch (error) {
      console.error('Error inviting user:', error);
    }
  }

  /**
   * Promotes a user to moderator.
   */
  async function handlePromoteUser() {
    try {
      const response = await promoteUser(userId);
      console.log('User promoted to moderator:', response);
      setUserId('');
    } catch (error) {
      console.error('Error promoting user:', error);
    }
  }

  /**
   * Bans a user.
   */
  async function handleBanUser() {
    try {
      const response = await banUser(userId);
      console.log('User banned:', response);
      setUserId('');
    } catch (error) {
      console.error('Error banning user:', error);
    }
  }

  /**
   * Edits a user's details.
   */
  async function handleEditUser() {
    try {
      const response = await editUser(userId, updates);
      console.log('User edited:', response);
      setUserId('');
    } catch (error) {
      console.error('Error editing user:', error);
    }
  }

  /**
   * Resets a user's public/private keys.
   */
  async function handleResetKeys() {
    try {
      const response = await resetKeys(userId);
      console.log('User keys reset:', response);
      setUserId('');
    } catch (error) {
      console.error('Error resetting user keys:', error);
    }
  }

  return (
    <View style={{ padding: 10 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Admin Panel</Text>

      <Text style={{ marginTop: 10 }}>Invite User</Text>
      <TextInput
        placeholder="Email or URL"
        value={inviteTarget}
        onChangeText={setInviteTarget}
        style={{ borderWidth: 1, marginVertical: 5, padding: 5 }}
      />
      <Button title="Invite via TOR/I2P" onPress={handleInviteUser} />

      <Text style={{ marginTop: 10 }}>Promote User</Text>
      <TextInput
        placeholder="User ID"
        value={userId}
        onChangeText={setUserId}
        style={{ borderWidth: 1, marginVertical: 5, padding: 5 }}
      />
      <Button title="Promote to Moderator" onPress={handlePromoteUser} />

      <Text style={{ marginTop: 10 }}>Ban User</Text>
      <TextInput
        placeholder="User ID"
        value={userId}
        onChangeText={setUserId}
        style={{ borderWidth: 1, marginVertical: 5, padding: 5 }}
      />
      <Button title="Ban User" onPress={handleBanUser} />

      <Text style={{ marginTop: 10 }}>Edit User</Text>
      <TextInput
        placeholder="User ID"
        value={userId}
        onChangeText={setUserId}
        style={{ borderWidth: 1, marginVertical: 5, padding: 5 }}
      />
      <TextInput
        placeholder="New Display Name"
        value={updates.displayName}
        onChangeText={(name) => setUpdates({ ...updates, displayName: name })}
        style={{ borderWidth: 1, marginVertical: 5, padding: 5 }}
      />
      <Button title="Edit User" onPress={handleEditUser} />

      <Text style={{ marginTop: 10 }}>Reset Keys</Text>
      <TextInput
        placeholder="User ID"
        value={userId}
        onChangeText={setUserId}
        style={{ borderWidth: 1, marginVertical: 5, padding: 5 }}
      />
      <Button title="Reset Public/Private Keys" onPress={handleResetKeys} />
    </View>
  );
}
