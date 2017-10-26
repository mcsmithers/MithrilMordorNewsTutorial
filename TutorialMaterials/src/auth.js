// src/auth.js

import auth0 from 'auth0-js';
import m from 'mithril';




//   - the app's main component should use the auth0.js `parseHash()` method to extract the necessary data from the hash: this data should be an `accessToken`, `idToken`, and `expiresIn` (see https://auth0.com/docs/libraries/auth0js/v8#extract-the-authresult-and-get-user-info)
//   - if desired, the app can make a call to the auth0.js `client.userInfo()` endpoint to retrieve the user's profile data
//   - a JS app can then store tokens, expiration, and user data in localStorage, where it can easily be accessed by the app at any time
//   - in order to log out, the localStorage data should be deleted. this revokes access to the app and any APIs that might require the access token