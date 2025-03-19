import { FlatList, Modal, Text, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import className from 'twrnc';
import usePlaylist from '@/hooks/usePlaylist';

interface PlaylistModalProps {
  audioFiles: any[];
  state: {
    isPlaying: boolean;
    position: number;
    duration: number;
  };
  currentTitle: string | null;
  currentIndex: number | null;
}

const PlaylistModal = ({ audioFiles, currentIndex, currentTitle, state }: PlaylistModalProps) => {
  const { playlists, addTrackToPlaylist } = usePlaylist();
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<number | null>(null);

  return (
    <View>
      <TouchableOpacity style={className`bg-[#79299e] p-3 rounded mt-4`} onPress={() => setModalVisible(true)}>
        <Text style={className`text-white text-center`}>Choisir une Playlist</Text>
      </TouchableOpacity>

      {selectedPlaylistId !== null && currentIndex !== null && (
        <TouchableOpacity
          style={className`bg-green-500 p-3 rounded mt-2`}
          onPress={() => {
            if (currentTitle && state.isPlaying) {
              addTrackToPlaylist(selectedPlaylistId, audioFiles[currentIndex].uri, currentTitle);
              alert('Ajouté à la playlist !');
            }
          }}
        >
          <Text style={className`text-white text-center`}>Ajouter à la Playlist</Text>
        </TouchableOpacity>
      )}

      <Modal visible={isModalVisible} transparent animationType="slide">
        <View style={className`flex-1 bg-black bg-opacity-80 justify-center`}>
          <View style={className`bg-[#222] p-5 rounded mx-5`}>
            <Text style={className`text-white text-lg mb-2`}>Sélectionne une Playlist :</Text>
            <FlatList
              data={playlists}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={className`p-3 bg-[#444] my-1 rounded`}
                  onPress={() => {
                    setSelectedPlaylistId(item.id);
                    setModalVisible(false);
                  }}
                >
                  <Text style={className`text-white`}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity style={className`mt-3 p-3 bg-red-500 rounded`} onPress={() => setModalVisible(false)}>
              <Text style={className`text-white text-center`}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default PlaylistModal;
