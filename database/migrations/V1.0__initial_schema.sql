CREATE TABLE IF NOT EXISTS public.users
(
    id serial constraint users_pk primary key,
    first_name text not null,
    second_name text not null,
    email text not null,
    password text not null
);

CREATE TABLE IF NOT EXISTS public.projects
(
    id serial constraint projects_pk primary key,
    name text not null,
    date_created date not null,
    user_id int constraint project_user_user_id_fk references public.users(id)
);

CREATE TABLE IF NOT EXISTS public.songs
(
    id serial constraint songs_pk primary key,
    name text not null,
    artist text not null,
    album text not null,
    key text not null
);

CREATE TABLE IF NOT EXISTS public.project_songs
(
    id serial constraint project_songs_pk primary key,
    project_id int constraint project_song_project_project_id_fk references public.projects(id),
    song_id int constraint project_song_song_song_id_fk references public.songs(id)
);

CREATE TABLE IF NOT EXISTS public.scales
(
    id serial constraint scales_pk primary key,
    key text not null,
    name text not null
);

CREATE TABLE IF NOT EXISTS public.techniques
(
    id serial constraint techniques_pk primary key,
    complexity text not null,
    name text not null
);

CREATE TABLE IF NOT EXISTS public.routines
(
    id serial constraint routines_pk primary key,
    name text not null,
    description text not null,
    project_id int constraint routine_project_project_id_fk references public.projects(id),
    technique_id int constraint routine_technique_technique_id_fk references public.techniques(id),
    scale_id int constraint routine_scale_scale_id_fk references public.scales(id)
);

CREATE TABLE IF NOT EXISTS public.practices
(
    id serial constraint practice_pk primary key,
    name text not null,
    date_created date not null,
    routine_id int constraint practice_routine_routine_id_fk references public.routines(id)
);

CREATE TABLE IF NOT EXISTS public.practice_songs
(
    id serial constraint practice_songs_pk primary key,
    description text not null,
    sequence text not null,
    practice_id int constraint practice_id_practice_practice_id_fk references public.practices(id),
    song_id int constraint practice_song_song_song_id_fk references public.songs(id)
);

CREATE TABLE IF NOT EXISTS public.genres
(
    id serial constraint genres_pk primary key,
    name text not null
);

CREATE TABLE IF NOT EXISTS public.song_genres
(
    id serial constraint song_genres_pk primary key,
    song_id int constraint song_genre_song_song_id_fk references public.songs(id),
    genre_id int constraint song_genre_genre_genre_id_fk references public.genres(id)
);