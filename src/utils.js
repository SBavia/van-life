import { redirect } from 'react-router-dom';

export default async function requireAuth() {
  const isLoggedIn = false;

  if (!isLoggedIn) {
    // throw redirect('/login?message=You must log in first.');
    const response = redirect('/login?message=You must log in first.');
    response.body = true; // It's silly, but it works
    return response;
  }
  return null;
}
