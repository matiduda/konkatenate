import '@radix-ui/themes/styles.css';
import { Route, Routes } from 'react-router-dom';
import Homepage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import NavigationBar from './components/NavigationBar';
import NotFoundPage from './pages/NotFoundPage';
import RegisterPage from './pages/RegisterPage';
import "./styles.css";
import GamesPage from './pages/GamesPage';
import UploadPage from './pages/UploadPage';

export const API_URL = "http://localhost:8080/api";
export const MAX_USERNAME_LENGTH = 20;

export const TOKEN_COOKIE_ID = "kkt_auth";

export default function App() {
  return (
    <div>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/games" element={<GamesPage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}