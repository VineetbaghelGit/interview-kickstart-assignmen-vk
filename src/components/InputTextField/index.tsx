import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import {alpha, styled} from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import {type InputFieldProps} from 'configs/appTypes';
import React from 'react';

/**
 * Styled wrapper for custom input components.
 * This component wraps the input field with a label and helper text.
 */
const CustomInputWrapper = styled(Box)(({theme}) => ({
  display: 'flex',
  flexDirection: 'column',
  margin: '8px 0',
  width: '100%', // Ensure the wrapper takes full width
}));

/**
 * Styled input component using Material-UI's InputBase.
 * It provides customized styling for the input field.
 */
const InputField = styled(InputBase)(({theme}) => ({
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

/**
 * Props for the CustomInput component.
 * These props define the structure and behavior of the input field.
 * @typedef {Object} CustomInputProps
 * @property {string} id - The ID of the input field.
 * @property {string} name - The name attribute of the input field.
 * @property {string} label - The label text displayed above the input field.
 * @property {string} [placeholder] - The placeholder text inside the input field.
 * @property {boolean} [required] - Whether the input field is required or not.
 * @property {'small' | 'medium'} [size] - The size variant of the input field.
 * @property {string} [value] - The current value of the input field.
 * @property {React.ChangeEventHandler<HTMLInputElement>} [onChange] - Event handler for input changes.
 * @property {React.FocusEventHandler<HTMLInputElement>} [onBlur] - Event handler for input blur.
 * @property {boolean} [error] - Indicates whether the input has an error state.
 * @property {string} [className] - Additional CSS class names for customization.
 * @property {string} [helperText] - Helper text to provide additional context or error messages.
 */

/**
 * InputTextField component renders a labeled input field with customizable options.
 * It utilizes Material-UI components for styling and functionality.
 * @param {CustomInputProps} props - The props passed to the component.
 * @returns {JSX.Element} - Rendered JSX element representing the input field.
 */
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
}: InputFieldProps): JSX.Element => {
  return (
    <CustomInputWrapper>
      {/* Label for the input field */}
      <Typography
        variant="body2"
        component="label"
        htmlFor={id}
        sx={{display: 'flex', alignItems: 'center'}}>
        {label}
        {required && <span style={{color: 'red', marginLeft: 4}}>*</span>}
      </Typography>

      {/* Actual input field */}
      <InputField
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

      {/* Helper text for validation or additional information */}
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
