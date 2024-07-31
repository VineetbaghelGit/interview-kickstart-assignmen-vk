import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import {alpha, styled} from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import React from 'react';

const CustomInputWrapper = styled(Box)(({theme}) => ({
  display: 'flex',
  flexDirection: 'column',
  margin: '8px 0',
  width: '100%', // Ensure the wrapper takes full width
}));

const BootstrapInput = styled(InputBase)(({theme}) => ({
  borderRadius: 4,
  position: 'relative',
  backgroundColor: theme.palette.mode === 'light' ? '#F3F6F9' : '#1A2027',
  border: '1px solid',
  borderColor: theme.palette.mode === 'light' ? '#E0E3E7' : '#2D3843',
  fontSize: 16,
  width: '100%',
  padding: '10px 12px',
  transition: theme.transitions.create([
    'border-color',
    'background-color',
    'box-shadow',
  ]),
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  '&:focus': {
    boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
    borderColor: theme.palette.primary.main,
  },
}));

interface CustomInputProps {
  id: string;
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  type: string;
  size?: 'small' | 'medium';
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  error?: boolean;
  helperText?: string;
  className: string;
}

const InputTextField = ({
  id,
  name,
  label,
  placeholder,
  required = false,
  size,
  value,
  onChange,
  type,
  onBlur,
  error,
  className,
  helperText,
}: CustomInputProps): JSX.Element => {
  return (
    <CustomInputWrapper>
      <Typography
        variant="body2"
        component="label"
        htmlFor={id}
        sx={{display: 'flex', alignItems: 'center'}}>
        {label}
        {required && <span style={{color: 'red', marginLeft: 4}}>*</span>}
      </Typography>
      <BootstrapInput
        id={id}
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        size={size}
        value={value}
        className={className}
        onChange={onChange}
        onBlur={onBlur}
        sx={{border: error ? '1px solid red' : undefined}}
      />
      {helperText && (
        <Typography
          variant="body2"
          color={error ? 'error.main' : 'text.secondary'}
          sx={{marginTop: 1}}>
          {helperText}
        </Typography>
      )}
    </CustomInputWrapper>
  );
};

export default InputTextField;
