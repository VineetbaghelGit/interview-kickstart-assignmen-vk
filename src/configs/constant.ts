import {type WebinarDetailsType} from './appTypes';
import {User1, User2, User3, User4, User5, User6} from './images';

export const CardsColors = [
  '#741DE3',
  '#E72174',
  '#FFB023',
  '#08A79E',
  '#0E51F1',
  '#088761',
];
export const UserImages = [User1, User2, User3, User4, User5, User6];
export const defaultWebinar: WebinarDetailsType = {
  id: '',
  instructorName: '',
  instructorRole: '',
  instructorCompany: '',
  topics: '',
  webinarTitle: '',
  startDate: '',
  startTime: '',
  endTime: '',
};
export const SUCCESS = 'success';
export const ERROR = 'error';
export const WARNING = 'warning';
