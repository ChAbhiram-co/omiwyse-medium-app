import express from 'express';
import pkg from 'pg';
import cors from 'cors';

const { Pool } = pkg; 

const app = express();
app.use(cors());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'data-of-user',
  password: 'Abhiram@01',
  port: 5432,
});

pool.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => console.error('Connection error', err.stack));

app.get('/api/users', (req, res) => {
  pool.query('SELECT * FROM users')
    .then(result => res.json(result.rows))  
    .catch(err => {
      console.error('Error executing query', err.stack);
      res.status(500).send('Error fetching data from database');
    });
});

app.get('/', (req, res) => {
  res.send('Welcome to the API. Use /api/users to get user data.');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});



























































































// import express from 'express';
// import pkg from 'pg';
// import cors from 'cors';

// const { Pool } = pkg; // Correctly extract Pool from pg

// // Initialize express app
// const app = express();
// app.use(cors());

// // PostgreSQL connection setup
// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'data-of-user',
//   password: 'Abhiram',
//   port: 5432,
// });

// // Test the connection to PostgreSQL
// pool.connect()
//   .then(() => console.log('Connected to PostgreSQL'))
//   .catch(err => console.error('Connection error', err.stack));

// // Define an API route to get user data
// app.get('/api/users', async (req, res) => {
//   try {
//     const result = await pool.query('SELECT * FROM users');
//     res.json(result.rows);
//   } catch (err) {
//     console.error('Error executing query', err.stack);
//     res.status(500).send('Error fetching data from database');
//   }
// });


// app.get('/', (req, res) => {
//   res.send('Welcome to the API. Use /api/users to get user data.');
// });


// const port = 3000;
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });
