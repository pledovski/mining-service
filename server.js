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
app.use('/api/user-account', require('./routes/api/userAccount'));
app.use('/api/platform-account', require('./routes/api/platformAccount'));
app.use('/api/asset', require('./routes/api/asset'));
app.use('/api/allocation', require('./routes/api/allocation'));
// app.use('/api/mining', require('./controllers/mining'));

app.use('/api/launcher', require('./controllers/launcher'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));