import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AppButton from 'components/AppButton';
import AppModal from 'components/AppModal';
import * as React from 'react';

function Header(): JSX.Element {
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpen = (): void => {
    setOpenModal(true);
  };
  const handleClose = (): void => {
    setOpenModal(false);
  };
  return (
    <>
      <Box sx={{flexGrow: 1}}>
        <AppBar
          position="static"
          sx={{
            backgroundColor: '#fff',
            boxShadow: '0',
            borderBottom: '1px solid #E3E7EC',
            height: '80px',
          }}>
          <Toolbar sx={{padding: '0px !important'}}>
            <Typography
              variant="h6"
              component="div"
              sx={{flexGrow: 1, color: '#000'}}>
              Webinar
            </Typography>
            <AppButton onClick={handleOpen} type="button">
              Add Webinar
            </AppButton>
          </Toolbar>
        </AppBar>
      </Box>
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
