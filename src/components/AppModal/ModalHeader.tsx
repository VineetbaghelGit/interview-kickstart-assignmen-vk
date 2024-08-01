import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React from 'react';

/**
 * Component representing the header of the modal.
 *
 * @param {Object} props - The properties for the ModalHeader component.
 * @param {string} props.title - The title to display in the header.
 * @param {Function} props.onClose - Function to call when the close icon is clicked.
 * @returns {JSX.Element} The rendered ModalHeader component.
 */
const ModalHeader: React.FC<{title: string; onClose: () => void}> = ({
  title,
  onClose,
}) => (
  <Box
    sx={{
      padding: '14px 22px',
      borderBottom: '1px solid #E3E7EC',
      display: 'flex',
      justifyContent: 'space-between',
    }}>
    <Typography
      variant="h6"
      component="h2"
      sx={{fontSize: '18px', fontWeight: '550'}}>
      {title}
    </Typography>
    <CloseIcon
      sx={{color: '#444952', fontSize: '24px', cursor: 'pointer'}}
      onClick={onClose}
    />
  </Box>
);

export default ModalHeader;
