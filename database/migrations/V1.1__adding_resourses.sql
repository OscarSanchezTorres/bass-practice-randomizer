INSERT INTO genres (id, name) VALUES 
  (1, 'Rock'),
  (2, 'Pop'),
  (3, 'Hip Hop'),
  (4, 'Jazz'),
  (5, 'Classical'),
  (6, 'Blues'),
  (7, 'Country'),
  (8, 'Electronic'),
  (9, 'Folk'),
  (10, 'Funk'),
  (11, 'Gospel'),
  (12, 'Heavy Metal'),
  (13, 'Indie'),
  (14, 'Instrumental'),
  (15, 'Latin'),
  (16, 'New Age'),
  (17, 'R&B'),
  (18, 'Reggae'),
  (19, 'Soul'),
  (20, 'Soundtrack'),
  (21, 'World'),
  (22, 'Ambient'),
  (23, 'Bossa Nova'),
  (24, 'Chillout'),
  (25, 'Disco'),
  (26, 'Dubstep'),
  (27, 'Experimental'),
  (28, 'Grime'),
  (29, 'Hardcore'),
  (30, 'House'),
  (31, 'Industrial'),
  (32, 'Jungle'),
  (33, 'Metalcore'),
  (34, 'Minimal'),
  (35, 'Nu Jazz'),
  (36, 'Piano'),
  (37, 'Progressive Rock'),
  (38, 'Psychedelic'),
  (39, 'Punk'),
  (40, 'Ska'),
  (41, 'Smooth Jazz'),
  (42, 'Synthpop'),
  (43, 'Trance'),
  (44, 'Trip Hop'),
  (45, 'Vocal Jazz'),
  (46, 'West Coast Swing'),
  (47, 'Zydeco'),
  (48, 'Celtic'),
  (49, 'Afrobeat'),
  (50, 'K-Pop');


 INSERT INTO scales (id, key, name) VALUES 
  -- Major scales
  (1, 'C', 'C Major'),
  (2, 'C#', 'C# Major'),
  (3, 'D', 'D Major'),
  (4, 'D#', 'D# Major'),
  (5, 'E', 'E Major'),
  (6, 'F', 'F Major'),
  (7, 'F#', 'F# Major'),
  (8, 'G', 'G Major'),
  (9, 'G#', 'G# Major'),
  (10, 'A', 'A Major'),
  (11, 'A#', 'A# Major'),
  (12, 'B', 'B Major'),

  -- Natural minor scales
  (13, 'C', 'C Natural Minor'),
  (14, 'C#', 'C# Natural Minor'),
  (15, 'D', 'D Natural Minor'),
  (16, 'D#', 'D# Natural Minor'),
  (17, 'E', 'E Natural Minor'),
  (18, 'F', 'F Natural Minor'),
  (19, 'F#', 'F# Natural Minor'),
  (20, 'G', 'G Natural Minor'),
  (21, 'G#', 'G# Natural Minor'),
  (22, 'A', 'A Natural Minor'),
  (23, 'A#', 'A# Natural Minor'),
  (24, 'B', 'B Natural Minor'),

  -- Harmonic minor scales
  (25, 'C', 'C Harmonic Minor'),
  (26, 'C#', 'C# Harmonic Minor'),
  (27, 'D', 'D Harmonic Minor'),
  (28, 'D#', 'D# Harmonic Minor'),
  (29, 'E', 'E Harmonic Minor'),
  (30, 'F', 'F Harmonic Minor'),
  (31, 'F#', 'F# Harmonic Minor'),
  (32, 'G', 'G Harmonic Minor'),
  (33, 'G#', 'G# Harmonic Minor'),
  (34, 'A', 'A Harmonic Minor'),
  (35, 'A#', 'A# Harmonic Minor'),
  (36, 'B', 'B Harmonic Minor'),

  -- Melodic minor scales
  (37, 'C', 'C Melodic Minor'),
  (38, 'C#', 'C# Melodic Minor'),
  (39, 'D', 'D Melodic Minor'),
  (40, 'D#', 'D# Melodic Minor'),
  (41, 'E', 'E Melodic Minor'),
  (42, 'F', 'F Melodic Minor'),
  (43, 'F#', 'F# Melodic Minor'),
  (44, 'G', 'G Melodic Minor'),
  (45, 'G#', 'G# Melodic Minor'),
  (46, 'A', 'A Melodic Minor'),
  (47, 'A#', 'A# Melodic Minor'),
  (48, 'B', 'B Melodic Minor'),

  -- Modes of the major scale
  (49, 'C', 'C Ionian (Major)'),
  (50, 'D', 'D Dorian'),
  (51, 'E', 'E Phrygian'),
  (52, 'F', 'F Lydian'),
  (53, 'G', 'G Mixolydian'),
  (54, 'A', 'A Aeolian (Natural Minor)'),
  (55, 'B', 'B Locrian'),

  -- Modes of the melodic minor scale
  (56, 'C', 'C Melodic Minor Ascending'),
  (57, 'D', 'D Dorian b2'),
  (58, 'E', 'E Lydian Augmented'),
  (59, 'F', 'F Lydian Dominant'),
  (60, 'G', 'G Mixolydian b6'),
  (61, 'A', 'A Locrian #2'),
  (62, 'B', 'B Super Locrian (Altered Scale)'),

  -- Other modes
  (63, 'C', 'C Phrygian Dominant (5th mode of harmonic minor)'),
  (64, 'C', 'C Locrian #6 (6th mode of harmonic minor)'),
  (65, 'C', 'C Double Harmonic Major (5th mode of harmonic minor)'),
  (66, 'C', 'C Hungarian Minor (4th mode of harmonic minor)'),
  (67, 'C', 'C Neapolitan Major'),
  (68, 'C', 'C Neapolitan Minor'),
  (69, 'C', 'C Enigmatic'),
  (70, 'C', 'C Whole Tone'),
  (71, 'C', 'C Augmented'),
  (72, 'C', 'C Altered (Super Locrian)'),
  (73, 'C', 'C Pentatonic Major'),
  (74, 'C', 'C Pentatonic Minor'),
  (75, 'C', 'C Blues'),
  (76, 'C', 'C Chromatic');

  INSERT INTO techniques (id, complexity, name) VALUES
  (1, 'Beginner', 'Fingerstyle'),
  (2, 'Beginner', 'Pickstyle'),
  (3, 'Beginner', 'Slap bass'),
  (4, 'Beginner', 'Pop bass'),
  (5, 'Beginner', 'Palm muting'),

  (6, 'Intermediate', 'Tapping'),
  (7, 'Intermediate', 'Double thumbing'),
  (8, 'Intermediate', 'Harmonics'),
  (9, 'Intermediate', 'Chord playing'),
  (10, 'Intermediate', 'Walking bass'),

  (11, 'Advanced', 'Soloing'),
  (12, 'Advanced', 'Fretless playing'),
  (13, 'Advanced', 'Odd time signature playing'),
  (14, 'Advanced', 'Two-handed tapping'),
  (15, 'Advanced', 'Polyrhythmic playing');