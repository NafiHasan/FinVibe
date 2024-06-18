import logo from './logo.svg';
import './styles/App.css';
import './scripts/LoginPage'
import LoginPage from './scripts/LoginPage';
import RegisterPage from './scripts/RegisterPage';
import CommunityPage from './scripts/CommunityPage';
import Stocks from './scripts/Stocks';
import ExpandedStock from './scripts/ExpandedStock';
import Crypto from './scripts/Crypto'
import ExpandedCrypto from './scripts/ExpandedCrypto'
import ExpandedPost from './scripts/ExpandedPost';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProfilePage from './scripts/ProfilePage';
import MakePost from './scripts/MakePost'
import SearchPage from './scripts/SearchPage';
import NotificationPage from './scripts/NotificationPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />}/>
        <Route path="/register" element={<RegisterPage />}/>
        <Route path="/community" element={<CommunityPage />}/>
        <Route path="/stocks" element={<Stocks />}/>
        <Route path="/expandedstock" element={<ExpandedStock/>}/>
        <Route path="/crypto" element={<Crypto />}/>
        <Route path="/expandedcrypto" element={<ExpandedCrypto/>}/>
        <Route path="/expandedpost" element={<ExpandedPost/>}/>
        <Route path="/profile" element={<ProfilePage/>}/>
        <Route path="/makepost" element={<MakePost/>}/>
        <Route path="/search" element={<SearchPage/>}/>
        <Route path="/notification" element={<NotificationPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
