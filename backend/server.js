// Entry point. Run with: npm run dev
// This file is already set up. Only add new route files here (one app.use line each).
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // lets us read JSON request bodies

app.get('/api/health', (req, res) => res.json({ status: 'ok' })); // test: http://localhost:5000/api/health

app.use('/api/auth', require('./routes/auth'));
app.use('/api/jobs', require('./routes/jobs'));
app.use('/api/applications', require('./routes/applications'));

// Unknown URL -> 404
app.use((req, res) => res.status(404).json({ error: 'Not found' }));

// Any error that was not handled -> JSON error instead of an HTML page
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Server error' });
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`API running on http://localhost:${port}`));
