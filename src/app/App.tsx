import React from 'react';
import { Button, Container, Stack } from '@mui/material';
import { Link, Route, Switch } from 'react-router-dom';
import HomePage from './screens/HomePage';
import ProductPage from './screens/ProductPage';
import '../css/app.css';

function App() {
  return (
    <Container>
      <Stack flexDirection={'row'} justifyContent={"space-between"}>
        <Link to="/">
          Home Page
        </Link>
        <Link to="/product">
          Product Page
        </Link>
        <Link to="/faq">
          Faq Rage
        </Link>
      </Stack>
      <Switch>
        <Route path="/about">
          <ProductPage />
        </Route>
        <Route path="/product">
          <ProductPage />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    </Container>
  );
}

export default App;
