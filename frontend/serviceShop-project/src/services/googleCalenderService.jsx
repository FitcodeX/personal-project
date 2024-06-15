const CLIENT_ID = '1094263414397-75573d3ach7clcf4v0rk64rht07b7d0o.apps.googleusercontent.com';
const API_KEY = 'AIzaSyBtVH74KQKTkplENH1eywkVCj22aFdQt7w';
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
const SCOPES = "https://www.googleapis.com/auth/calendar.events";

export const initClient = () => {
  return new Promise((resolve, reject) => {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      }).then(() => {
        resolve();
      }).catch(error => {
        reject(error);
      });
    });
  });
};

export const signIn = () => {
  return window.gapi.auth2.getAuthInstance().signIn();
};

export const signOut = () => {
  return window.gapi.auth2.getAuthInstance().signOut();
};

export const createEvent = (event) => {
  return window.gapi.client.calendar.events.insert({
    calendarId: 'primary',
    resource: event,
  });
};
