import AppBar from '@mui/material/AppBar'; // Importing AppBar component from Material-UI
import Box from '@mui/material/Box'; // Importing Box component from Material-UI for layout
import Toolbar from '@mui/material/Toolbar'; // Importing Toolbar component from Material-UI
import Typography from '@mui/material/Typography'; // Importing Typography component from Material-UI
import AppButton from 'components/AppButton'; // Importing custom AppButton component
import AppModal from 'components/AppModal'; // Importing custom AppModal component
import * as React from 'react';

/**
 * Header component for the application.
 *
 * @returns {JSX.Element} The rendered Header component.
 */
function Header(): JSX.Element {
  // State to control the visibility of the modal
  const [openModal, setOpenModal] = React.useState(false);

  /**
   * Handles opening the modal.
   */
  const handleOpen = React.useCallback((): void => {
    setOpenModal(true);
  }, []);

  /**
   * Handles closing the modal.
   */
  const handleClose = React.useCallback((): void => {
    setOpenModal(false);
  }, []);

  return (
    <>
      {/* Box component for layout with flex grow */}
      <Box sx={{flexGrow: 1}}>
        {/* AppBar component with custom styling */}
        <AppBar
          position="static"
          sx={{
            backgroundColor: '#fff',
            boxShadow: '0',
            borderBottom: '1px solid #E3E7EC',
            height: '80px',
          }}>
          {/* Toolbar component with custom padding */}
          <Toolbar sx={{padding: '0px !important'}}>
            {/* Typography for the title */}
            <Typography
              variant="h6"
              component="div"
              sx={{flexGrow: 1, color: '#000'}}>
              Webinar
            </Typography>
            {/* Custom button to open the modal */}
            <AppButton onClick={handleOpen} type="button">
              Add Webinar
            </AppButton>
          </Toolbar>
        </AppBar>
      </Box>
      {/* Custom modal component */}
      <AppModal
        title="Create Webinar"
        buttonText="Create Webinar"
        showModal={openModal}
        handleButtonClick={handleClose}
        handleClose={handleClose}
      />
    </>
  );
}

export default Header;
