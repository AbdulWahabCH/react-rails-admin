// import './App.css'
import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route, Navigate
} from "react-router-dom";
import Login from './components/Login';
import Admin from './components/Admin';
import Users from './components/Users';
import Settings from './components/Settings';
import Articles from './components/Articles';
import Comments from './components/Comments';
import UserProfile from './components/UserProfile';
import EditUserForm from './components/EditUserForm'
import Article from './components/Article'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/admin" element={isLoggedIn ? <Admin /> : <Navigate to="/" />} >
            <Route path="users" element={<Users />} />
            <Route path="users/:userId" element={<UserProfile />} />
            <Route
              path="/admin/users/:userId/edit"
              element={<EditUserForm />}
            />
            <Route path="articles" element={<Articles />} />
            <Route path="articles/:articleId" element={<Article />} />
            <Route path="comments" element={<Comments />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="/" element={<Login />} />
          <Route path="*" element={<Navigate to="/usr" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;