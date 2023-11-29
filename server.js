const express = require('express');
const path = require('path');
const fs = require('fs');


const PORT = process.env.PORT || 3001;

const app = express();



// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static('public'));

// GET Route for /notes
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// GET Route for /api/notes
app.get('/api/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/db/db.json'))
);

// Wildcard route to direct users to index.html
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);

// POST Route for /api/notes
app.post('/api/notes', (req, res) => {
  let existingNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  let neoNote = req.body;
  let neoID = existingNotes.length.toString();
  neoNote.id = neoID;
  existingNotes.push(neoNote);
  fs.writeFileSync("./db/db.json", JSON.stringify(existingNotes));
  res.json(existingNotes);
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
