import { Shift } from './shift.model';

export interface User {
  fullname: string;
  email: string;
  company: string;
  gender: string;
  shifts: Shift[];
}
