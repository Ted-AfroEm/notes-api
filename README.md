# Notes API

This is a simple notes API built with Express.

## Deployment

The API has been deployed and is accessible at [https://notes-api-f2ne.onrender.com](https://notes-api-f2ne.onrender.com).

## Endpoints

### GET /api/notes

Returns a list of all notes.

### GET /api/notes/:id

Returns a single note by its ID.

### POST /api/notes

Creates a new note.

#### Request Body

| Field     | Type    | Description                            |
| --------- | ------- | -------------------------------------- |
| content   | string  | The content of the note                |
| important | boolean | Indicates note's importance (optional) |

### DELETE /api/notes/:id

Deletes a note by its ID.
