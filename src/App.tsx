import 'react-toastify/dist/ReactToastify.css'; // Importing React Toastify CSS

import {Container} from '@mui/material'; // Importing Container component from Material-UI
import Home from 'pages/Home'; // Importing Home component
import React from 'react';
import {ToastContainer} from 'react-toastify'; // Importing ToastContainer for toast notifications

/**
 * Main application component.
 *
 * @returns {JSX.Element} The rendered application component.
 */
function App(): JSX.Element {
  return (
    // Container from Material-UI with specific styling
    <Container
      className="app_container"
      maxWidth="xl"
      sx={{padding: '10px 0px'}}>
      {/* Home component which is the main page */}
      <Home />
      {/* ToastContainer for displaying toast notifications */}
      <ToastContainer />
    </Container>
  );
}

export default App;
