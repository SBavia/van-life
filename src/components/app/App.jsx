import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from 'src/pages/Home';
import About from './pages/About';
import { Vans, VanDetail } from './pages/vans';
// import VanDetail from './pages/vans/VanDetail';
import Layout from './components/Layout';

import './server';

import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/vans" element={<Vans />} />
          <Route path="/vans/:id" element={<VanDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
