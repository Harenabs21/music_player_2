import { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import usePlaylist from '../hooks/usePlaylist';

import className from 'twrnc';

const PlaylistScreen = () => {
  const { playlists, addPlaylist, deletePlaylist } = usePlaylist();
  const [newPlaylistName, setNewPlaylistName] = useState('');

  return (
    <View style={className`flex-1 bg-transparent`}>
      <TextInput
        style={className`border-b-[1px] border-solid border-white py-2 mb-2 text-white placeholder:text-white`}
        placeholder="Nouvelle playlist"
        value={newPlaylistName}
        onChangeText={setNewPlaylistName}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          if (newPlaylistName.trim() !== '') {
            addPlaylist(newPlaylistName);
            setNewPlaylistName('');
          }
        }}
      >
        <Text style={styles.buttonText}>Créer Playlist</Text>
      </TouchableOpacity>

      <FlatList
        data={playlists}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.playlistItem}>
            <Text style={styles.playlistText}>{item.name}</Text>
            <TouchableOpacity onPress={() => deletePlaylist(item.id)}>
              <Text style={styles.deleteText}>Supprimer</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#79299e',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  playlistItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: 'gray',
  },
  playlistText: { color: '#fff' },
  deleteText: { color: 'red' },
});

export default PlaylistScreen;
