const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();

// Fix cors error
app.use(cors());
// Init body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Init custom middleware
app.use(require('./api/middleware/logger'));
// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// members endpoint
app.use('/api/members', require('./api/routes/members'));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
