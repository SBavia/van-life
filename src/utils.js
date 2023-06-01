import { redirect } from 'react-router-dom';

export default async function requireAuth(request) {
  const { pathname } = new URL(request.url);
  const isLoggedIn = localStorage.getItem('loggedin');

  if (!isLoggedIn) {
    // throw redirect('/login?message=You must log in first.');
    const response = redirect(
      `/login?message=You must log in first.&redirectTo=${pathname}`
    );
    response.body = true; // It's silly, but it works
    return response;
  }
  return null;
}
