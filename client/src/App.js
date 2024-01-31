import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home";
import Map from "./pages/Map";
import Books from "./pages/Books";
import Profile from "./pages/Profile";
import TeachingResources from "./pages/TeachingResources";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Navbar from "./components/header/Navbar";
import PasswordReset from "./components/header/PasswordReset";
import Reset from "./components/header/Reset";
import PrivacyPolicy from "./pages/PrivacyPolicy";

import AuthService from "./utils/auth";
const Auth = new AuthService();

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// Wrap the Header component with React.memo
const MemoizedHeader = React.memo(Header);

// Wrap the Footer component with React.memo
const MemoizedFooter = React.memo(Footer);

function App() {
  const background = {
    backgroundImage: "url(/assets/images/background.jpg)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
  };

  return (
    <ApolloProvider client={client}>
      <div className="App" style={background}>
        <MemoizedHeader />

        <Router>
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/map" element={<Map />} />
              <Route path="/books" element={<Books />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/teaching" element={<TeachingResources />} />
              <Route path="/passwordreset" element={<PasswordReset />} />
              <Route path="/reset/:token" element={<Reset />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </div>
        </Router>
        <MemoizedFooter className="Footer" />
      </div>
    </ApolloProvider>
  );
}

export default App;
