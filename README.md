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

## Entity Relationship Diagram
```mermaid
%%{init: {'theme':'dark'}}%%
erDiagram
    users ||--|| projects : creates
    users {
        int id PK
        varchar first_name
        varchar second_name
        varchar email
        varchar password
    }
    projects ||--|{ project_songs : contains
    projects ||--|{ routines : contains
    projects {
        int id PK
        varchar name
        dateFormat date_created
        int user_id FK

    }
    project_songs ||--|{ practice_songs : includes
    project_songs ||--|{ songs : includes
    project_songs {
        int id PK
        int projectId FK
        int songId FK

    }
    songs ||--|{ song_genres : includes
    songs {
        int id PK
        varchar name
        varchar artist
        varchar album
    }
    song_genres ||--|{ genres : includes
    song_genres {
        int id PK
        int songId FK
        int genreId FK
    }
    genres {
        int id PK
        varchar genre_name
    }
    practice_songs ||--|{ practice : includes
    practice_songs{
        int id pk
        varchar description
        int practiceId FK
        int routineId FK
    }

    practice ||--|{ routines: includes
    practice {
        int id PK
        varchar name
        dateFormat date_created
        int routineId FK

    }
    routines ||--|{ scales: includes
    routines ||--|{ techniques: includes
    routines {
        int id PK
        varchar name
        varchar description
        int projectId FK
        int techniqueId FK
        int scaleId FK
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