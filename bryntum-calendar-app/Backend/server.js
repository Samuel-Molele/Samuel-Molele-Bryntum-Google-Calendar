const express = require('express');
const bodyParser = require('body-parser');
const { OAuth2Client } = require('google-auth-library'); // For verifying Google tokens
const cors = require('cors'); // For handling CORS, if needed

const app = express();
const port = 5000;

// Google Client ID
const GOOGLE_CLIENT_ID = '887681904034-7jqjeh3l1ra3rpcdtr5bnm9kbm6or8p6.apps.googleusercontent.com'; 

const client = new OAuth2Client(GOOGLE_CLIENT_ID);

app.use(cors()); // Allow CORS if needed
app.use(bodyParser.json()); // Parse incoming JSON requests

// Endpoint to handle Google Sign-In
app.post('/api/auth/google', async (req, res) => {
  const { token } = req.body; // The Google token passed in the request body

  if (!token) {
    return res.status(400).json({ error: 'Token is required' });
  }

  try {
    // Verify the Google ID token using the OAuth2Client
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID, //  registered with Google
    });

    const payload = ticket.getPayload(); // Get the user information from the payload
    console.log('User verified:', payload);

    // Send a success response with user data
    res.json({
      message: 'User authenticated successfully',
      user: payload, // Return the payload which contains user info
    });
  } catch (error) {
    console.error('Error verifying Google token:', error);

    // Send a structured error response (with status code 400)
    res.status(400).json({
      error: 'Invalid Google token',
      details: error.message,
    });
  }
});

// another endpoint that uses the Google token for fetching events
app.get('/api/getEvents', async (req, res) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ error: 'Authorization header is required' });
  }

  try {
    // Verify the Google token directly 
    const ticket = await client.verifyIdToken({
      idToken: token.split(' ')[1], // Extract token from "Bearer token"
      audience: GOOGLE_CLIENT_ID, // Client ID for verifying the token
    });

    const payload = ticket.getPayload(); // Get the user information from the payload
    console.log('Decoded Google token:', payload);

    // Simulate fetching Google calendar events or other resources
    const events = [
      { summary: 'Meeting with Bob', start: { dateTime: '2024-11-08T09:00:00' }, end: { dateTime: '2024-11-08T10:00:00' } },
      { summary: 'Lunch with Alice', start: { dateTime: '2024-11-08T12:00:00' }, end: { dateTime: '2024-11-08T13:00:00' } },
    ];

    res.json(events); // Return events
  } catch (err) {
    console.error('Error verifying Google token:', err);
    res.status(401).json({ error: 'Invalid Google token' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);

});
