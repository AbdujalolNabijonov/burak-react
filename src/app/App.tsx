import React from 'react';
import { Button, Container, Stack } from '@mui/material';
import { Link, Route, Switch, useLocation } from 'react-router-dom';
import ProductsPage from './screens/productsPage';
import HelpPage from './screens/helpPage';
import HomePage from './screens/homePage';
import { OtherNavbar } from './components/headers/OtherNavbar';
import Footer from './components/footer';

import '../css/app.css';
import "../css/navbar.css";
import "../css/footer.css";
import HomeNavbar from './components/headers/HomeNavbar';

function App() {
  //Initializations
  const location = useLocation();
  return (
    <>
      {
        location.pathname === "/" ? <HomeNavbar /> : <OtherNavbar />
      }
      <Switch>
        <Route path="/help">
          <HelpPage />
        </Route>
        <Route path="/products">
          <ProductsPage />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
      <Footer />
    </>
  );
}

export default App;
