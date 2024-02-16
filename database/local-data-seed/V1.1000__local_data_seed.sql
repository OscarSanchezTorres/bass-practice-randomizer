INSERT INTO users (id, first_name, second_name, email, password) VALUES
  (1, 'John', 'Doe', 'johndoe@example.com', 'password1'),
  (2, 'Jane', 'Doe', 'janedoe@example.com', 'password2'),
  (3, 'Bob', 'Smith', 'bobsmith@example.com', 'password3'),
  (4, 'Alice', 'Johnson', 'alicejohnson@example.com', 'password4'),
  (5, 'David', 'Brown', 'davidbrown@example.com', 'password5'),
  (6, 'Sarah', 'Lee', 'sarahlee@example.com', 'password6'),
  (7, 'Tom', 'Wilson', 'tomwilson@example.com', 'password7'),
  (8, 'Emily', 'Davis', 'emilydavis@example.com', 'password8'),
  (9, 'Michael', 'Taylor', 'michaeltaylor@example.com', 'password9'),
  (10, 'Jessica', 'Anderson', 'jessicaanderson@example.com', 'password10'); 
  ALTER SEQUENCE users_id_seq RESTART WITH 11;

  INSERT INTO songs (id, name, artist, album, key) VALUES
  (1, 'Bohemian Rhapsody', 'Queen', 'A Night at the Opera', 'B♭'),
  (2, 'Sweet Child OMine', 'Guns NRoses', 'Appetite for Destruction', 'D'),
  (3, 'Billie Jean', 'Michael Jackson', 'Thriller', 'F♯'),
  (4, 'Imagine', 'John Lennon', 'Imagine', 'C'),
  (5, 'Purple Haze', 'Jimi Hendrix', 'Are You Experienced', 'E'),
  (6, 'Hotel California', 'Eagles', 'Hotel California', 'B'),
  (7, 'Stairway to Heaven', 'Led Zeppelin', 'Led Zeppelin IV', 'A'),
  (8, 'Smells Like Teen Spirit', 'Nirvana', 'Nevermind', 'F'),
  (9, 'Back in Black', 'AC/DC', 'Back in Black', 'E'),
  (10, 'I Want to Hold Your Hand', 'The Beatles', 'Meet the Beatles!', 'G'),
  (11, 'Crazy Train', 'Ozzy Osbourne', 'Blizzard of Ozz', 'A'),
  (12, 'Yesterday', 'The Beatles', 'Help!', 'F'),
  (13, 'Sweet Home Alabama', 'Lynyrd Skynyrd', 'Second Helping', 'G'),
  (14, 'Livin on a Prayer', 'Bon Jovi', 'Slippery When Wet', 'C♯'),
  (15, 'Let It Be', 'The Beatles', 'Let It Be', 'C'),
  (16, 'Thriller', 'Michael Jackson', 'Thriller', 'B♭'),
  (17, 'Beat It', 'Michael Jackson', 'Thriller', 'F♯'),
  (18, 'The Twist', 'Chubby Checker', 'Twist with Chubby Checker', 'E♭'),
  (19, 'My Girl', 'The Temptations', 'The Temptations Sing Smokey', 'C'),
  (20, 'Stand By Me', 'Ben E. King', 'Dont Play That Song!', 'A'),
  (21, 'We Will Rock You', 'Queen', 'News of the World', 'C'),
  (22, 'Like a Rolling Stone', 'Bob Dylan', 'Highway 61 Revisited', 'C♯'),
  (23, 'California Love', '2Pac', 'All Eyez on Me', 'G♯'),
  (24, 'Empire State of Mind', 'Jay-Z', 'The Blueprint 3', 'F♯'),
  (25, 'Uptown Funk', 'Mark Ronson ft. Bruno Mars', 'Uptown Special', 'D♯'),
  (26, 'Despacito', 'Luis Fonsi ft. Daddy Yankee', 'Vida', 'B♭'),
  (27, 'Smooth', 'Santana ft. Rob Thomas', 'Supernatural', 'D♯'),
  (28, 'Hello', 'Adele', '25', 'A♭');
  ALTER SEQUENCE songs_id_seq RESTART WITH 29;

  INSERT INTO song_genres (id, song_id, genre_id) VALUES
  (1, 1, 1),
  (2, 2, 1),
  (3, 3, 1),
  (4, 4, 2),
  (5, 5, 2),
  (6, 6, 1),
  (7, 7, 1),
  (8, 8, 1),
  (9, 9, 1),
  (10, 10, 2),
  (11, 11, 15),
  (12, 12, 3),
  (13, 13, 2),
  (14, 14, 2),
  (15, 15, 2),
  (16, 16, 1),
  (17, 17, 1),
  (18, 18, 1),
  (19, 19, 2),
  (20, 20, 1),
  (21, 21, 1),
  (22, 22, 2),
  (23, 23, 12),
  (24, 24, 1),
  (25, 25, 3),
  (26, 26, 3),
  (27, 27, 2),
  (28, 28, 3);
  ALTER SEQUENCE song_genres_id_seq RESTART WITH 29;

INSERT INTO projects (id, name, date_created, user_id) VALUES
(1, 'Project 1', '02/07/2022 13:43:00', 1),
(2, 'Project 2', '02/08/2022 13:43:00', 2);
ALTER SEQUENCE projects_id_seq RESTART WITH 3;

INSERT INTO routines (id, name, description, project_id, technique_id, scale_id) VALUES
(1, 'Example 1', 'This is a routine example', 1, 1, 49),
(2, 'Example 2', 'This is a routine example', 2, 2, 20);
ALTER SEQUENCE routines_id_seq RESTART WITH 3;

INSERT INTO project_songs (id, project_id, song_id) VALUES
(1, 1, 1),
(2, 2, 2);
ALTER SEQUENCE project_songs_id_seq RESTART WITH 3;

INSERT INTO practices (id, name, date_created, routine_id) VALUES
(1, 'First practice', '02/07/2022 13:43:00', 1);
ALTER SEQUENCE practices_id_seq RESTART WITH 2;

INSERT INTO practice_songs (id, description, sequence, practice_id, song_id) VALUES
(1, 'Warm up song', 1, 1, 7);
ALTER SEQUENCE practice_songs_id_seq RESTART WITH 2