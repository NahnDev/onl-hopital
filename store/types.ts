import { GENDER } from "../enum/GENDER";
import { USER_ROLE } from "../enum/USER_ROLE";

export type LoginDto = {
  email: string;
  password: string;
};

export type TokenType = {
  accessToken: string;
  expires: number;
};

// user defined type
export type UserType = {
  _id: string;
  email: string;
  name: string;
  avatar: string;
  password?: string;
  role: USER_ROLE;
};
export type CreateUserDto = Pick<UserType, "email" | "name" | "password">;

//  Doctor defined
export type DoctorType = {
  _id: string;
  name: string;
  avatar: string;
  introduce: string;

  info?: string[];
  education?: string[];

  phone?: string;
  email?: string;
};
// export type DoctorRef = Pick<DoctorType, "_id" | "name">;

// profile define
export type ProfileType = {
  _id: string;
  name: string;
  image: string;

  phone?: string;
  age?: number;
  sex?: GENDER;

  address?: string;
  histories: HistoryType[];
};
// export type ProfileRef = Pick<ProfileType, "_id" | "name">;
export type CreateProfileDto = Pick<
  ProfileType,
  "address" | "age" | "name" | "phone" | "sex" | "image"
>;
export type UpdateProfileDto = CreateProfileDto;

// history define
export type HistoryType = {
  _id: string;
  result: string;
  at: number;
};

// book define
export type BookingType = {
  _id: string;
  date: number;
  time: number;
  note?: string;

  doctor: DoctorType;
  profile: ProfileType;
  services: ServiceType[];
};
// export type BookingRef = Pick<BookingType, "_id">;
export type CreateAppointmentDto = Pick<
  BookingType,
  "date" | "time" | "note"
> & {
  profile: string;
  services: string[];
  doctor: string;
};

// Service define
export type ServiceType = {
  _id: string;
  name: string;
};
// export type ServiceRef = Pick<ServiceType, "_id" | "name">;

// // time period
// export class TimePeriod {
//   constructor(
//     public start: { h: number; m: number },
//     public end: { h: number; m: number }
//   ) {}

//   in(date: Date): -1 | 0 | 1 {
//     if (
//       date.getHours() * 60 + date.getMinutes() <
//       this.start.h * 60 + this.start.m
//     ) {
//       return -1;
//     }
//     if (
//       date.getHours() * 60 + date.getMinutes() >
//       this.end.h * 60 + this.end.m
//     ) {
//       return 1;
//     }
//     return 0;
//   }
//   getStartDatetime(date: Date) {
//     const date = new Date();
//     date.setHours(this.start.h);
//   }

//   toJSON() {
//     return {
//       start: this.start,
//       end: this.end,
//     };
//   }

//   toString() {
//     const startHour = this.start.h < 10 ? `0${this.start.h}` : this.start.h;
//     const startMinute = this.start.m < 10 ? `0${this.start.m}` : this.start.m;
//     const endHour = this.end.h < 10 ? `0${this.end.h}` : this.end.h;
//     const endMinute = this.end.m < 10 ? `0${this.end.m}` : this.end.m;
//     return `${startHour}:${startMinute} - ${endHour}:${endMinute}`;
//   }
// }
