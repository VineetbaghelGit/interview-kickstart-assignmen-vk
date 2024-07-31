import {ERROR, SUCCESS, WARNING} from 'configs/constant';
import {
  Slide,
  type Theme,
  toast,
  type ToastPosition,
  type ToastTransition,
} from 'react-toastify';

interface ToastOptions {
  position: ToastPosition;
  autoClose: number;
  hideProgressBar: boolean;
  closeOnClick: boolean;
  pauseOnHover: boolean;
  draggable: boolean;
  progress?: number;
  theme: Theme;
  transition: ToastTransition;
}

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
