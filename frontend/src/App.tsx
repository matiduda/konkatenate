import '@radix-ui/themes/styles.css';

import { Route, Routes } from 'react-router-dom';
import Homepage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import SignInPage from './pages/SignInPage';
import Navigation from './components/Navigation';

export default function App() {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </div>
  );
}