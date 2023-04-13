# Bass Technique and Scales Randomizer
SDET project for the Unosquare centre of excellence

## Problem definition:
It is necessary to create a simple web app that allows the user to create projects such as songs and practice routines and includes features like randomized scales and bass techniques so that practice time is more productive and covers more areas to improve bass playing. Other products are more complex and require signing up and paying subscriptions 


#### Must Have
- A user must be able to register an account.
- A user must be able to login.
- A user must be able to add, edit, delete and update projects, routines and songs.
- A user must be able to randomize scales.
- A user must be able to randomize bass techniques.

#### Should Have
- A user should be able to attach multimedia content (youtube video) to song projects.

#### Could Have
- Administrators can add, edit, delete and update non-administrator users.
- Practice reminders though slack integration.

#### Will not Have
- Notifications.
- A mobile interface.

## Domain Object Model:
```mermaid
%%{init: {'theme':'dark'}}%%
erDiagram
    User ||--o{ Project: creates
    Project||--o{ Song: contains
    Project ||--o{ Routine : contains
    User ||--o{ Song: manages
    User ||--o{ Routine: manages
```

## Entity Relationship Diagram:
```mermaid
%%{init: {'theme':'dark'}}%%
erDiagram
    users ||--|{ projects : ""
    users {
        int id PK
        varchar first_name
        varchar second_name
        varchar email
        varchar password
    }
    projects ||--|{ project_songs : ""
    projects ||--|{ routines : ""
    projects {
        int id PK
        varchar name
        dateFormat date_created
        int user_id FK

    }
    project_songs ||--|{ practice_songs : ""
    project_songs ||--|{ songs : ""
    project_songs {
        int id PK
        int project_id FK
        int song_id FK

    }
    songs ||--|{ song_genres : ""
    songs {
        int id PK
        varchar name
        varchar artist
        varchar album
    }
    song_genres ||--|{ genres : ""
    song_genres {
        int id PK
        int song_id FK
        int genre_id FK
    }
    genres {
        int id PK
        varchar name
    }
    practice_songs ||--|{ practice : ""
    practice_songs{
        int id PK
        varchar description
        int sequence
        int practice_id FK
        int song_id FK
    }

    practice ||--|{ routines: ""
    practice {
        int id PK
        varchar name
        dateFormat date_created
        int routine_id FK

    }
    routines ||--|{ scales: ""
    routines ||--|{ techniques: ""
    routines {
        int id PK
        varchar name
        varchar description
        int project_id FK
        int technique_id FK
        int scale_id FK
    }
    scales {
        int id PK
        varchar key
        varchar name
    }
    techniques {
        int id PK
        int complexity
        varchar name
    }
```