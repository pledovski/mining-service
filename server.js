const express = require('express');
const connectDB = require('./config/db');

const app = express();

connectDB();

// Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API Running'));

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/balance', require('./routes/api/userBalance'));
app.use('/api/mining', require('./routes/api/mining'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));