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
import Merchandise from "./pages/Merchandise";
import Books from "./pages/Books";
import Profile from "./pages/Profile";
import TeachingResources from "./pages/TeachingResources";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Success from "./pages/Success";
import PasswordReset from "./components/header/PasswordReset";
import Reset from "./components/header/Reset";
import PrivacyPolicy from "./pages/PrivacyPolicy";

import AuthService from "./utils/auth";
const Auth = new AuthService();

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: "http://localhost:3001/graphql",
});

// const httpLink = createHttpLink({
//   uri: "https://samuel-j-halpin-5ca11d52cf4b.herokuapp.com/graphql",
// });

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

function App() {
  const background = {
    backgroundImage: "url(/assets/images/background.jpg)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
  };

  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App" style={background}>
          <Header />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/map" element={<Map />} />
              <Route path="/merchandise" element={<Merchandise />} />
              <Route path="/books" element={<Books />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/teaching" element={<TeachingResources />} />
              <Route path="/success" element={<Success />} />
              <Route path="/passwordreset" element={<PasswordReset />} />

              <Route path="/reset/:token" element={<Reset />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </div>
          <Footer className="Footer" />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
