// ModalFooter.jsx

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AppButton from 'components/AppButton';
import {type ModalFooterPropsTypes} from 'configs/appTypes';
import React from 'react';

const ModalFooter = ({
  handleSubmit,
  handleClose,
  buttonText,
}: ModalFooterPropsTypes): JSX.Element => {
  return (
    <Box
      className="modal_footer_section"
      sx={{
        padding: '14px 22px',
        borderTop: '1px solid #E3E7EC',
        display: 'flex',
        gap: '20px',
      }}>
      {/* Submit Button */}

      <AppButton type="button" onClick={handleSubmit}>
        {buttonText}
      </AppButton>
      {/* Cancel Button */}
      <Button
        sx={{
          color: '#0E51F1',
          fontSize: '18px',
          fontWeight: '600',
          textTransform: 'capitalize',
        }}
        onClick={handleClose}
        size="small">
        Cancel
      </Button>
    </Box>
  );
};

export default ModalFooter;
