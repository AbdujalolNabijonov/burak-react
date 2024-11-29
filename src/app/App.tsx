import React, { useState } from 'react';
import { Button, Container, Stack } from '@mui/material';
import { Link, Route, Switch, useLocation } from 'react-router-dom';
import ProductsPage from './screens/productsPage';
import HelpPage from './screens/helpPage';
import HomePage from './screens/homePage';
import OtherNavbar from './components/headers/OtherNavbar';
import Footer from './components/footer';

import '../css/app.css';
import "../css/navbar.css";
import "../css/footer.css";
import HomeNavbar from './components/headers/HomeNavbar';
import OrdersPage from './screens/ordersPage';
import UserPage from './screens/userPage';
import useBasket from './hooks/useBasket';
import AuthenticationModal from './components/auth';

function App() {
  //Initializations
  const location = useLocation();
  const [loginOpen, setLoginOpen] = useState<boolean>(false);
  const [signupOpen, setSignupOpen] = useState<boolean>(false);

  const {
    cartItems,
    onAdd,
    onRemove,
    onDelete,
    onDeleteAll
  } = useBasket()

  const handleSignupClose = () => {
    setSignupOpen(false)
  }
  const handleLoginClose = () => {
    setLoginOpen(false)
  }


  return (
    <>
      {
        location.pathname === "/" ?
          <HomeNavbar
            cartItems={cartItems}
            onAdd={onAdd}
            onRemove={onRemove}
            onDelete={onDelete}
            onDeleteAll={onDeleteAll}
            setLoginOpen={setLoginOpen}
            setSignupOpen={setSignupOpen}
          />
          : <OtherNavbar
            onAdd={onAdd}
            cartItems={cartItems}
            onRemove={onRemove}
            onDelete={onDelete}
            onDeleteAll={onDeleteAll}
            setLoginOpen={setLoginOpen}
          />
      }
      <Switch>
        <Route path="/help">
          <HelpPage />
        </Route>
        <Route path="/products">
          <ProductsPage
            onAdd={onAdd}

          />
        </Route>
        <Route path="/orders">
          <OrdersPage />
        </Route>
        <Route path="/member-page">
          <UserPage />
        </Route>
        <Route path="/help">
          <HelpPage />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
      <Footer />

      <AuthenticationModal
        signupOpen={signupOpen}
        loginOpen={loginOpen}
        handleLoginClose={handleLoginClose}
        handleSignupClose={handleSignupClose}
      />
    </>
  );
}

export default App;
