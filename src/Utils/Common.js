// return the user data from the session storage
export const getUser = () => {
  const userStr = localStorage.getItem('name');
  if (userStr) return JSON.parse(userStr);
  else return null;
}

// return the username from local storage
export const getUsername = () => {
  const userStr = localStorage.getItem('username');
  if (userStr) return JSON.parse(userStr);
  else return null;
}

// return the photoURL from local storage
export const getPhotoURL = () => {
  const userStr = localStorage.getItem('photoURL');
  if (userStr) return JSON.parse(userStr);
  else return null;
}


// return the token from the session storage
export const getToken = () => {
  return localStorage.getItem('token') || null;
}

// remove the token and user from the session storage
export const removeUserSession = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  localStorage.removeItem('name');
}

// set the token and user from the session storage
export const setUserSession = (token, user, name, photoURL) => {
  localStorage.setItem('token', token);
  localStorage.setItem('username', JSON.stringify(user));
  localStorage.setItem('name', JSON.stringify(name));
  localStorage.setItem('photoURL', JSON.stringify(photoURL));
}