import { useEffect, useState } from 'react';
import { BryntumCalendar } from '@bryntum/calendar-react';
import { calendarProps } from './CalendarConfig';
import './App.scss';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null); // State to handle error messages

  useEffect(() => {
    // Check if Google script is loaded
    if (window.google && window.google.accounts) {
      window.google.accounts.id.initialize({
        client_id: '887681904034-7jqjeh3l1ra3rpcdtr5bnm9kbm6or8p6.apps.googleusercontent.com', //Google client ID
        callback: handleGoogleSignIn,
        scope: 'https://www.googleapis.com/auth/calendar.readonly', // calendar scope
      });

      // Render the Google Sign-In button
      window.google.accounts.id.renderButton(
        document.getElementById('googleSignInButton'),
        { theme: 'outline', size: 'large' }
      );
    } else {
      console.error('Google accounts API not loaded');
      setError('Google accounts API not loaded');
    }
  }, []);

  const handleGoogleSignIn = async (response) => {
    try {
      setIsLoggedIn(true);
      const token = response.credential; // The Google token

      // Send the token to the backend for validation
      const eventsData = await fetchEvents(token);
      setEvents(eventsData);
    } catch (err) {
      setError('Google Sign-In failed. Please try again.');
      console.error('Error during Google Sign-In:', err);
    }
  };

  const fetchEvents = async (googleToken) => {
    try {
      const res = await fetch('http://localhost:5000/api/getEvents', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${googleToken}`,  // Send Google token in header as Bearer token
        },
      });

      // Check if the response is successful
      if (!res.ok) {
        throw new Error('Failed to fetch events');
      }

      const data = await res.json();
      return formatEventsForBryntum(data); // Transform events for Bryntum
    } catch (err) {
      setError('Error fetching events. Please try again.');
      console.error('Error fetching events:', err);
    }
  };

  const formatEventsForBryntum = (googleEvents) => {
    return googleEvents.map((event) => ({
      startDate: new Date(event.start.dateTime || event.start.date),
      endDate: new Date(event.end.dateTime || event.end.date),
      name: event.summary,
      location: event.location,
    }));
  };

  return (
    <div id="calendarContainer">
      {error && <div className="error-message">{error}</div>} {/* Display error message if there's an error */}
      {isLoggedIn ? (
        <BryntumCalendar {...calendarProps} events={events} />
      ) : (
        <div className="overlay">
          <div id="googleSignInButton" />
          <p>Please sign in to view calendar events.</p>
        </div>
      )}
    </div>
  );
}

export default App;
