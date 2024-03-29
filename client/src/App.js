import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import './App.css';
import './index.css';

import Navbar from './components/Header/Navbar';
import HomePage from './pages/Home/Home';
import Profile from './pages/Profile/Profile';
import UserList from './pages/UserList/UserList';
import Footer from './components/Footer/Footer';

require('dotenv').config();


const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Navbar />
          <Routes>
            <Route
              path="/"
              element={<HomePage />}
            />

            <Route path="/profile">
              <Route path=":username" element={<Profile />} />
              <Route path="" element={<Profile />} />
            </Route>

            <Route
              path="/users"
              element={<UserList />}
            />
          </Routes>
          <Footer />
      </Router>
    </ApolloProvider>
  );
}

export default App;
