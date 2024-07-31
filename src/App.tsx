import 'react-toastify/dist/ReactToastify.css';

import {Container} from '@mui/material';
import Home from 'pages/Home';
import React from 'react';
import {ToastContainer} from 'react-toastify';

function App(): JSX.Element {
  return (
    <Container maxWidth="xl" sx={{padding: '10px 0px'}}>
      <Home />
      <ToastContainer />
    </Container>
  );
}

export default App;
