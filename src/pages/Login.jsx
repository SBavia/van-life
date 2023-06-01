import {
  Form,
  redirect,
  useLoaderData,
  useActionData,
  useNavigation,
} from 'react-router-dom';

import { loginUser } from '../api';

export const loader = async ({ request }) => {
  return new URL(request.url).searchParams.get('message');
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get('email');
  const password = formData.get('password');
  const pathname =
    new URL(request.url).searchParams.get('redirectTo') ?? '/host';

  try {
    await loginUser({ email, password });
    localStorage.setItem('loggedin', true);

    const response = redirect(pathname);
    response.body = true;
    return response;
  } catch (error) {
    return error.message;
  }
};

const Login = () => {
  const { state } = useNavigation();
  const message = useLoaderData();
  const errorMessage = useActionData();

  return (
    <div className="login-container">
      <h1>Sign in to your account</h1>
      {message && <h3 className="red">{message}</h3>}
      {errorMessage && <h3 className="red">{errorMessage}</h3>}
      <Form replace method="post" className="login-form">
        <input name="email" type="email" placeholder="Email address" />
        <input name="password" type="password" placeholder="Password" />
        <button type="submit" disabled={state === 'submitting'}>
          {state === 'submitting' ? 'Logging in...' : 'Log in'}
        </button>
      </Form>
    </div>
  );
};

export default Login;
