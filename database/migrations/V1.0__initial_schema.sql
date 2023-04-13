CREATE TABLE IF NOT EXISTS public.genres
(
    id serial constraint genres_pk primary key,
    description text not null
);