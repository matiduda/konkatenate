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
import PlayPage from './pages/PlayPage';
import UsersPage from './pages/UsersPage';
import UserPage from './pages/UserPage';
import { Box } from '@radix-ui/themes';
import Footer from './components/Footer';

export const API_URL = "http://localhost:8080/api";
export const STATIC_URL = "http://localhost:8080/";
export const SERVER_STOMP_URL = "ws://localhost:8080/ws";

export const MAX_USERNAME_LENGTH = 20;

export const TOKEN_COOKIE_ID = "kkt_auth";

export default function App() {
  return (
    <div>
      <NavigationBar />
      <Box height="75px"></Box>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/games" element={<GamesPage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/play" element={<PlayPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </div>
  );
}