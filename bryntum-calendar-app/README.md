# Google Calendar Integration with Bryntum Calendar

This project demonstrates how to integrate Google Sign-In with a React frontend and Express backend to fetch Google Calendar events. The frontend displays the events using the Bryntum Calendar component. The backend uses the Google OAuth2 authentication to verify the user and fetch calendar events.

## Features
- Google Sign-In to authenticate users
- Fetch Google Calendar events after authentication
- Display events on the Bryntum Calendar component
- Backend integration with Google OAuth2 to verify tokens and fetch events

## Project Structure
- server.js # Backend server using Express, handles Google token verification and event fetching
- App.js # Frontend React component, handles Google Sign-In and event display
- CalendarConfig.js # Configuration file for Bryntum Calendar component
- App.scss # Styling for the app


## Prerequisites

Before you begin, ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/en/) (version 12 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)

Additionally, you will need a Google Cloud project with OAuth2 credentials:

1. Create a project in the [Google Developer Console](https://console.developers.google.com/).
2. Enable the Google Calendar API.
3. Create OAuth2 credentials and set the redirect URI to match your app's setup.
4. Copy the client ID for Google Sign-In.

## Getting Started

### Clone the Repository
- git clone https://github.com/Samuel-Molele/Samuel-Molele-Bryntum-Google-Calendar
  ```bash
  cd bryntum-calendar-app


### Backend (Express Server)

1. **Navigate to the backend folder** (where `server.js` is located).
   
2. **Install dependencies**:
   ```bash
   npm install

3. **Run the  backend server**:
  ```bash
  npm run dev

### Frontend(React+Vite App)

1. Navigate to the frontend folder (where App.jsx is located)
2. Install dependencies
  ```bash
  npm install

3. Start the frontend application
  ```bash
  npm run dev

### Configuring Google OAuth
Ensure you replace the placeholder Google Client ID in both server.js and App.js with your own Google OAuth2 credentials.

1. server.js
- Replace this line with your Google Client ID:
  ```bash
  const GOOGLE_CLIENT_ID = 'your-google-client-id-here';

2. App.jsx
- Replace this line with your Google Client ID:
  ```bash
  client_id: 'your-google-client-id-here', 

### Usage 

1. Open your browser and navigate to http://localhost:5173/
2. Click on the "Sign In with Google" button to authenticate with your Google account.
3. After successful sign-in, Google Calendar events will be displayed in the Bryntum Calendar.

### Dependencies

1. Backend (server.js)
- express: Web framework for Node.js
- google-auth-library: Library for verifying Google OAuth tokens
- cors: Middleware for handling CORS
- body-parser: Middleware for parsing incoming JSON requests

2. Frontend (APP.jsx)
- react: Frontend JavaScript library
- @bryntum/calendar-react: React component for displaying events on the Bryntum Calendar
- @google/auth-library: Google Identity Services for React

### Notes:

- **Google Client ID**: Remember to replace `your-google-client-id-here` with your actual Google OAuth2 client ID in both `server.js` and `App.jsx`.
- **Running Locally**: The frontend assumes the backend is running on `localhost:5000`, and you should be able to interact with it via the API endpoints.







