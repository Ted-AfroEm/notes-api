const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

app.get("/", (request, response) => {
  response.send(`
    <h1>Welcome to Notes API!</h1>
    <p>This is a simple API for managing notes.</p>
    <h2>Endpoints:</h2>
    <ul>
      <li><strong>GET /api/notes</strong>: Returns a list of all notes.</li>
      <li><strong>GET /api/notes/:id</strong>: Returns a single note by its ID.</li>
      <li><strong>POST /api/notes</strong>: Creates a new note.</li>
      <li><strong>DELETE /api/notes/:id</strong>: Deletes a note by its ID.</li>
    </ul>
    <p>For more details, refer to the <a href="https://github.com/Ted-AfroEm/notes-api">repo</a>.</p>
  `);
});

app.get("/api/notes", (request, response) => {
  response.json(notes);
});

app.get("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  const note = notes.find((note) => note.id === id);
  if (note) response.json(note);
  else response.status(404).end();
});
//Delete Note
app.delete("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  notes = notes.filter((note) => note.id !== id);

  response.status(204).end();
});

//Add Note
const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  return maxId + 1;
};

app.post("/api/notes", (request, response) => {
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const note = {
    content: body.content,
    important: Boolean(body.important) || false,
    id: generateId(),
  };

  notes = notes.concat(note);

  response.json(note);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
