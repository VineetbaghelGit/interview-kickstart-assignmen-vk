import {Button} from '@mui/material';
import {type AppButtonProps} from 'configs/appTypes';
import React from 'react';

function AppButton({
  children,
  onClick,
  type,
}: Readonly<AppButtonProps>): JSX.Element {
  return (
    <Button
      type={type}
      className="app_button"
      sx={{
        padding: '12px 24px 12px 24px',
        borderRadius: '14px',
        boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.2)',
        color: '#fff',
        fontSize: '16px',
        fontWeight: '600',
        letterSpacing: '1px',
        textTransform: 'capitalize',
        backgroundColor: '#0E51F1',
        '&:hover': {
          backgroundColor: '#2f67ef',
        },
      }}
      onClick={onClick}>
      {children}
    </Button>
  );
}

export default AppButton;
