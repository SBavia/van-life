/* eslint-disable no-return-await */
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import Error from '../Error';
import Layout from '../Layout';
import HostLayout from '../HostLayout';
import Home from '../../pages/Home';
import About from '../../pages/About';
import Login, {
  loader as loginLoader,
  action as loginAction,
} from '../../pages/Login';
import NotFound from '../../pages/NotFound';
import { Vans, vansLoader, VanDetail, vanDetailLoader } from '../../pages/Vans';
import {
  Dashboard,
  Income,
  Reviews,
  HostVans,
  hostVansLoader,
  HostVanDetail,
  hostVanDetailLoader,
  HostVanInfo,
  HostVanPricing,
  HostVanPhotos,
} from '../../pages/Host';

import requireAuth from '../../utils';
import '../../server';

import './app.css';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route
        path="login"
        element={<Login />}
        loader={loginLoader}
        action={loginAction}
      />
      <Route
        path="vans"
        element={<Vans />}
        loader={vansLoader}
        errorElement={<Error />}
      />
      <Route path="vans/:id" element={<VanDetail />} loader={vanDetailLoader} />

      <Route path="host" element={<HostLayout />}>
        <Route
          index
          element={<Dashboard />}
          loader={async ({ request }) => await requireAuth(request)}
        />
        <Route
          path="income"
          element={<Income />}
          loader={async ({ request }) => await requireAuth(request)}
        />
        <Route
          path="reviews"
          element={<Reviews />}
          loader={async ({ request }) => await requireAuth(request)}
        />
        <Route path="vans" element={<HostVans />} loader={hostVansLoader} />
        {/* <Route
          path="vans"
          element={<HostVans />}
          loader={async () => {
            await requireAuth();
            return hostVansLoader();
          }}
        /> */}
        <Route
          path="vans/:id"
          element={<HostVanDetail />}
          loader={hostVanDetailLoader}
        >
          <Route
            index
            element={<HostVanInfo />}
            loader={async ({ request }) => await requireAuth(request)}
          />
          <Route
            path="pricing"
            element={<HostVanPricing />}
            loader={async ({ request }) => await requireAuth(request)}
          />
          <Route
            path="photos"
            element={<HostVanPhotos />}
            loader={async ({ request }) => await requireAuth(request)}
          />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
