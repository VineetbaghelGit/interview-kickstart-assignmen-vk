import {ERROR, SUCCESS, WARNING} from 'configs/constant';
import {
  Slide,
  type Theme,
  toast,
  type ToastPosition,
  type ToastTransition,
} from 'react-toastify';

/**
 * Options for configuring toast notifications.
 * @interface ToastOptions
 */
interface ToastOptions {
  position: ToastPosition; // Position where the toast notification appears
  autoClose: number; // Duration in milliseconds before the toast automatically closes
  hideProgressBar: boolean; // Whether to hide the progress bar
  closeOnClick: boolean; // Whether clicking on the toast dismisses it
  pauseOnHover: boolean; // Whether hovering over the toast pauses auto-close
  draggable: boolean; // Whether the toast is draggable
  progress?: number; // Progress value for controlled progress bar
  theme: Theme; // Theme of the toast notification
  transition: ToastTransition; // Transition effect when showing/hiding the toast
}

/**
 * Default options for toast notifications.
 * @constant {ToastOptions}
 */
const defaultToastOptions: ToastOptions = {
  position: 'top-right',
  autoClose: 1000,
  closeOnClick: true,
  draggable: true,
  hideProgressBar: true,
  pauseOnHover: false,
  theme: 'light',
  transition: Slide,
};

/**
 * Displays a toast message based on the provided type.
 * @param {string} type - Type of toast message ('SUCCESS', 'ERROR', 'WARNING').
 * @param {string} message - Message content to display in the toast.
 */
function ToasterMessage(type: string, message: string): void {
  switch (type) {
    case SUCCESS:
      toast.success(message, defaultToastOptions);
      break;
    case ERROR:
      toast.error(message, defaultToastOptions);
      break;
    case WARNING:
      toast.warn(message, defaultToastOptions);
      break;
    default:
      break;
  }
}

export {ToasterMessage};
