/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import 'tailwindcss/tailwind.css';

import { UserProvider } from './user-context';

import Home from './Home';
import Login from './auth/Login';
import Register from './auth/Register';
import NotFound from './NotFound';
import Layout from './Layout';
import Dashboard from './dashboard/Dashboard';

function App() {
  return (
    // https://ui.dev/react-router-cannot-get-url-refresh
    <Router >
      <UserProvider>
        <Layout>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />

            <Route path="/dashboard" element={<Dashboard />} />



            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </UserProvider>
    </Router>
  );
}

export default App;
