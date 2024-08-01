import {type ButtonProps} from '@mui/material';
import {type ChangeEventHandler, type InputHTMLAttributes} from 'react';

export interface AppButtonProps extends ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}
export interface WebinarDetailsType {
  id: string;
  instructorName: string;
  instructorRole: string;
  instructorCompany: string;
  topics: string;
  webinarTitle: string;
  startDate: string;
  startTime: string;
  endTime: string;
  image?: string;
}
export interface AppCardPropTypes {
  singleWebinarDetail: WebinarDetailsType;
  index: number;
}
export interface FiltersPropsTypes {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedTopic: string;
  setSelectedTopic: (topic: string) => void;
}
export interface AppModalPropsType {
  title: string;
  buttonText: string;
  showModal: boolean;
  handleClose: () => void;
  handleButtonClick: () => void;
  editableData?: WebinarDetailsType;
}
export interface InputFieldProps
  extends Readonly<InputHTMLAttributes<HTMLInputElement>> {
  readonly label: string;
  readonly type: string;
  readonly onChange?: ChangeEventHandler<HTMLInputElement>;
  readonly onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  readonly error?: boolean;
  readonly helperText?: any;
  readonly size?: any;
  readonly fullWidth?: any;
  readonly multiline?: any;
  readonly maxRows?: any;
  readonly className?: any;
  readonly ref?: any;
}
export interface ModalFooterPropsTypes {
  handleSubmit: () => void;
  handleClose: () => void;
  buttonText: string;
}
