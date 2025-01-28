const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Sample data
let movies = [
  { id: 1, title: "Inception", director: "Christopher Nolan", year: 2010 },
  { id: 2, title: "The Godfather", director: "Francis Ford Coppola", year: 1972 },
  { id: 3, title: "Pulp Fiction", director: "Quentin Tarantino", year: 1994 }
];

// Routes will be added here

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

//Get all movies

app.get('/api/movies', (req, res) => {
    res.json(movies);
  });

  //Get a specific movie

  app.get('/api/movies/:id', (req, res) => {
    const movie = movies.find(m => m.id === parseInt(req.params.id));
    if (!movie) return res.status(404).send('Movie not found');
    res.json(movie);
  });

  //Post a new movie

  app.post('/api/movies', (req, res) => {
    const movie = {
      id: movies.length + 1,
      title: req.body.title,
      director: req.body.director,
      year: req.body.year
    };
    movies.push(movie);
    res.status(201).json(movie);
  });

  //Update a movie

  app.put('/api/movies/:id', (req, res) => {
    const movie = movies.find(m => m.id === parseInt(req.params.id));
    if (!movie) return res.status(404).send('Movie not found');
    
    movie.title = req.body.title;
    movie.director = req.body.director;
    movie.year = req.body.year;
    
    res.json(movie);
  });

  //Patch movie

  app.patch('/api/movies/:id', (req, res) => {
    const movie = movies.find(m => m.id === parseInt(req.params.id));
    if (!movie) return res.status(404).send('Movie not found');
    
    if (req.body.title) movie.title = req.body.title;
    if (req.body.director) movie.director = req.body.director;
    if (req.body.year) movie.year = req.body.year;
    
    res.json(movie);
  });
  
  //Delete Movies

  app.delete('/api/movies/:id', (req, res) => {
    const movie = movies.find(m => m.id === parseInt(req.params.id));
    if (!movie) return res.status(404).send('Movie not found');
    
    const index = movies.indexOf(movie);
    movies.splice(index, 1);
    
    res.json(movie);
  });

  const apiKeyMiddleware = require('./apiKeyMiddleware');

// Apply middleware to all routes
app.use(apiKeyMiddleware);

//Error implement 

app.post('/api/movies', (req, res) => {
    try {
      // ... existing code ...
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while creating the movie' });
    }
  });

  app.post('/api/movies', (req, res) => {
    if (!req.body.title || !req.body.director || !req.body.year) {
      return res.status(400).json({ error: 'Title, director, and year are required' });
    }
    // ... rest of the code ...
  });