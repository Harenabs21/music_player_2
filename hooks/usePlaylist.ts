import { useEffect, useState } from 'react';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('musicApp.db');

type Playlist = {
  id: number;
  name: string;
};

type Track = {
  id: number;
  playlistId: number;
  uri: string;
  filename: string;
};

export default function usePlaylist() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [playlistTracks, setPlaylistTracks] = useState<Track[]>([]);

  useEffect(() => {
    initializeDatabase();
  }, []);

  // ⚡ Initialisation de la BD
  const initializeDatabase = async () => {
    await db.execAsync(`
            CREATE TABLE IF NOT EXISTS playlists (
                id INTEGER PRIMARY KEY AUTOINCREMENT, 
                name TEXT
            );
        `);
    await db.execAsync(`
            CREATE TABLE IF NOT EXISTS playlist_tracks (
                id INTEGER PRIMARY KEY AUTOINCREMENT, 
                playlistId INTEGER, 
                uri TEXT, 
                filename TEXT,
                FOREIGN KEY (playlistId) REFERENCES playlists (id) ON DELETE CASCADE
            );
        `);
    loadPlaylists();
  };

  // ⚡ Charger toutes les playlists
  const loadPlaylists = async () => {
    const result = await db.getAllAsync('SELECT * FROM playlists;');
    setPlaylists(result as Playlist[]);
  };

  // ⚡ Ajouter une nouvelle playlist
  const addPlaylist = async (name: string) => {
    await db.runAsync('INSERT INTO playlists (name) VALUES (?);', [name]);
    await loadPlaylists(); // Charger les playlists après ajout
  };

  // ⚡ Supprimer une playlist
  const deletePlaylist = async (id: number) => {
    await db.runAsync('DELETE FROM playlists WHERE id = ?;', [id]);
    await loadPlaylists(); // Charger les playlists après suppression
  };

  // ⚡ Ajouter un son à une playlist
  const addTrackToPlaylist = async (playlistId: number, uri: string, filename: string) => {
    await db.runAsync('INSERT INTO playlist_tracks (playlistId, uri, filename) VALUES (?, ?, ?);', [
      playlistId,
      uri,
      filename,
    ]);
  };

  // ⚡ Récupérer les sons d'une playlist
  const getTracksFromPlaylist = async (playlistId: number) => {
    const result = await db.getAllAsync('SELECT * FROM playlist_tracks WHERE playlistId = ?;', [playlistId]);
    setPlaylistTracks(result as Track[]);
  };

  return {
    playlists,
    playlistTracks,
    addPlaylist,
    deletePlaylist,
    addTrackToPlaylist,
    getTracksFromPlaylist,
    loadPlaylists, // ✅ Correction : Ajouter loadPlaylists ici
  };
}
