const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(express.json());
const allowedOrigins = [
  'http://localhost:3000',          
  'https://your-frontend-url.com'   
];

app.use(cors({
  origin: function(origin, callback) {
   
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

const feedbackRoutes = require('./routes/feedback');
app.use('/feedback', feedbackRoutes);
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected');
    app.listen(5000, () => console.log('Server running on port 5000'));
}).catch(err => console.log(err));
