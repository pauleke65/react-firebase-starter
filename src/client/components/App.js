/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {
  HashRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import 'tailwindcss/tailwind.css';

import { UserProvider } from './user-context';

import Home from './Home';
import NotFound from './NotFound';
import Layout from './Layout';

function App() {
  return (
    <Router>
      <UserProvider>
        <Layout>
          <Routes>
            <Route exact path="/" element={<Home />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </UserProvider>
    </Router>
  );
}

export default App;
