// components/ServerSettings.js
/**
 * ServerSettings Component
 *
 * Allows users to manage connections to multiple servers.
 * Users can add new server URLs and remove existing ones.
 * On adding a server, the embedded NGINX proxy is reconfigured.
 */

import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import { NginxProxyManager } from '../services/NginxProxyManager';

export default function ServerSettings() {
  const [serverUrl, setServerUrl] = useState('');
  const [servers, setServers] = useState([]);

  /**
   * Adds a new server configuration and reconfigures the proxy.
   */
  function addServer() {
    const newServer = { id: Date.now().toString(), url: serverUrl };
    setServers([...servers, newServer]);
    setServerUrl('');
    // Reconfigure the embedded NGINX proxy for the new server.
    NginxProxyManager.reconfigure({ serverUrl: newServer.url })
      .then(() => console.log('NGINX reconfigured for new server:', newServer.url))
      .catch(error => console.error(error));
  }

  /**
   * Removes a server configuration.
   * @param {string} id - The unique ID of the server config to remove.
   */
  function removeServer(id) {
    setServers(servers.filter(server => server.id !== id));
  }

  return (
    <View style={{ padding: 10 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Server Settings</Text>
      <TextInput
        placeholder="Enter server URL"
        value={serverUrl}
        onChangeText={setServerUrl}
        style={{ borderWidth: 1, marginVertical: 5, padding: 5 }}
      />
      <Button title="Add Server" onPress={addServer} />

      <FlatList
        data={servers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text>{item.url}</Text>
            <Button title="Remove" onPress={() => removeServer(item.id)} />
          </View>
        )}
      />
    </View>
  );
}
