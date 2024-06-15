// src/components/CalendarComponent.jsx
import React, { useEffect, useState } from 'react';
import { initClient, signIn, signOut, createEvent } from '../services/googleCalenderService';

export default function CalendarComponent() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [event, setEvent] = useState({
    summary: '',
    description: '',
    start: { dateTime: '' },
    end: { dateTime: '' },
  });

  useEffect(() => {
    initClient().then(() => {
      const authInstance = window.gapi.auth2.getAuthInstance();
      setIsSignedIn(authInstance.isSignedIn.get());
      authInstance.isSignedIn.listen(setIsSignedIn);
    });
  }, []);

  const handleSignIn = () => {
    signIn().then(() => setIsSignedIn(true));
  };

  const handleSignOut = () => {
    signOut().then(() => setIsSignedIn(false));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  const handleCreateEvent = () => {
    createEvent(event).then((response) => {
      alert('Event created successfully');
    }).catch((error) => {
      alert('Error creating event');
    });
  };

  return (
    <div>
      <h1>Google Calendar Integration</h1>
      {isSignedIn ? (
        <div>
          <button onClick={handleSignOut}>Sign Out</button>
          <h2>Create Event</h2>
          <input
            type="text"
            name="summary"
            placeholder="Event Title"
            value={event.summary}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="description"
            placeholder="Event Description"
            value={event.description}
            onChange={handleInputChange}
          />
          <input
            type="datetime-local"
            name="start.dateTime"
            placeholder="Start Time"
            value={event.start.dateTime}
            onChange={handleInputChange}
          />
          <input
            type="datetime-local"
            name="end.dateTime"
            placeholder="End Time"
            value={event.end.dateTime}
            onChange={handleInputChange}
          />
          <button onClick={handleCreateEvent}>Create Event</button>
        </div>
      ) : (
        <button onClick={handleSignIn}>Sign In with Google</button>
      )}
    </div>
  );
};


