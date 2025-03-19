import { openDatabaseSync } from 'expo-sqlite';

const db = openDatabaseSync('musicPlayer.db');

// 🔥 Initialisation de la base de données
export const initDatabase = () => {
  db.execAsync(
    `CREATE TABLE IF NOT EXISTS playlists (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL
        );`
  );

  db.execAsync(
    `CREATE TABLE IF NOT EXISTS playlist_songs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            playlist_id INTEGER NOT NULL,
            song_uri TEXT NOT NULL,
            FOREIGN KEY (playlist_id) REFERENCES playlists(id)
        );`
  );
};

// 🔥 Ajouter une nouvelle playlist
export const addPlaylist = async (name: string, callback: () => void) => {
  await db.runAsync('INSERT INTO playlists (name) VALUES (?);', [name]);
  callback();
};

// 🔥 Ajouter une chanson à une playlist
export const addSongToPlaylist = async (playlistId: number, songUri: string, callback: () => void) => {
  await db.runAsync('INSERT INTO playlist_songs (playlist_id, song_uri) VALUES (?, ?);', [playlistId, songUri]);
  callback();
};

// 🔥 Récupérer les playlists
export const getPlaylists = async (callback: (playlists: any[]) => void) => {
  const result = await db.getAllAsync('SELECT * FROM playlists;');
  callback(result);
};

// 🔥 Récupérer les chansons d'une playlist
export const getSongsFromPlaylist = async (playlistId: number, callback: (songs: any[]) => void) => {
  const result = await db.getAllAsync('SELECT * FROM playlist_songs WHERE playlist_id = ?;', [playlistId]);
  callback(result);
};
