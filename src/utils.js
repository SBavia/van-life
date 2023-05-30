import { redirect } from 'react-router-dom';

export default async function requireAuth() {
  const isLoggedIn = false;

  if (!isLoggedIn) {
    // throw redirect('/login');
    const response = redirect('/login');
    response.body = true; // It's silly, but it works
    return response;
  }
  return null;
}
