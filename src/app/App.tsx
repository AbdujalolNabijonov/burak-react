import React from 'react';
import '../css/app.css';
import { Button, Container } from '@mui/material';
import Typography from './MaterialTheme/typography';
import { RippleBadge } from './MaterialTheme/styled';

function App() {
  return (
    <Container>
      <h1>Css framework Mui integration</h1>
      <RippleBadge badgeContent={3}>
        <Button variant={"contained"}> Contained</Button>
      </RippleBadge>
    </Container>
  );
}

export default App;
