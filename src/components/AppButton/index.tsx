import {Button} from '@mui/material'; // Importing Material-UI Button component
import {type AppButtonProps} from 'configs/appTypes'; // Importing the type for component props
import React from 'react';

/**
 * AppButton component to render a styled button.
 *
 * @param {AppButtonProps} props - The props for the AppButton component.
 * @param {React.ReactNode} props.children - The content to be displayed inside the button.
 * @param {() => void} props.onClick - The function to be called when the button is clicked.
 * @param {string} props.type - The type of the button (e.g., 'button', 'submit').
 * @returns {JSX.Element} The rendered AppButton component.
 */
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
      onClick={onClick} // Function to be called on button click
    >
      {children} {/* The content inside the button */}
    </Button>
  );
}

export default AppButton;
