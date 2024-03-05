import '@radix-ui/themes/styles.css';

import { Route, Routes } from 'react-router-dom';
import Homepage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import SignInPage from './pages/SignInPage';
import NavigationBar from './components/NavigationBar';
import NotFoundPage from './pages/NotFoundPage';
import RegisterPage from './pages/RegisterPage';
import "./styles.css";

export default function App() {
  return (
    <div>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}