import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from '../Layout';
import Home from '../../pages/Home';
import About from '../../pages/About';
import HostLayout from '../HostLayout';
import { Vans, VanDetail } from '../../pages/Vans';
import {
  Dashboard,
  Income,
  Reviews,
  HostVans,
  HostVanDetail,
  HostVanInfo,
  HostVanPricing,
  HostVanPhotos,
} from '../../pages/Host';

import '../../server';

import './app.css';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="vans" element={<Vans />} />
          <Route path="vans/:id" element={<VanDetail />} />

          <Route path="host" element={<HostLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="income" element={<Income />} />
            <Route path="reviews" element={<Reviews />} />
            <Route path="vans" element={<HostVans />} />
            <Route path="vans/:id" element={<HostVanDetail />}>
              <Route index element={<HostVanInfo />} />
              <Route path="pricing" element={<HostVanPricing />} />
              <Route path="photos" element={<HostVanPhotos />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
