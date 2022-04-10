import { USER_ROLE } from "../enum/USER_ROLE";

export type UserType = {
  _id: string;
  email: string;
  name: string;
  avatar: string;
  password?: string;
  role: USER_ROLE;
};
export type CreateUserDto = Pick<UserType, "email" | "name" | "password">;

export type TokenType = {
  accessToken: string;
  expires: number;
};

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
export type DoctorRef = Pick<DoctorType, "_id" | "name">;

export type ProfileType = {
  _id: string;
  name: string;
  image: string;

  phone?: string;
  age?: number;
  sex?: "MALE" | "FEMALE";

  address?: string;
  histories: HistoryType[];
};
export type ProfileRef = Pick<ProfileType, "_id" | "name">;
export type CreateProfileDto = Pick<
  ProfileType,
  "address" | "age" | "name" | "phone" | "sex"
>;

export type HistoryType = {
  _id: string;
  at: number;
};

export type BookingType = {
  _id: string;
  date: number;
  timePeriod: number;
  note?: string;

  doctor: DoctorRef;
  profile: ProfileRef;
  service: ServiceRef[];
};
export type BookingRef = Pick<BookingType, "_id">;
export type CreateAppointmentDto = Pick<
  BookingType,
  "date" | "note" | "timePeriod"
> & {
  profile: string;
  service?: string[];
  doctor: string;
};

export type ServiceType = {
  _id: string;
  name: string;
};
export type ServiceRef = Pick<ServiceType, "_id" | "name">;

export class TimePeriod {
  constructor(
    public start: { h: number; m: number },
    public end: { h: number; m: number }
  ) {}

  in(date: Date) {
    return (
      date.getHours() * 60 + date.getMinutes() >=
        this.start.h * 60 + this.start.m &&
      date.getHours() * 60 + date.getMinutes() <= this.end.h * 60 + this.end.m
    );
  }
  toJSON() {
    return {
      start: this.start,
      end: this.end,
    };
  }

  toString() {
    const startHour = this.start.h < 10 ? `0${this.start.h}` : this.start.h;
    const startMinute = this.start.m < 10 ? `0${this.start.m}` : this.start.m;
    const endHour = this.end.h < 10 ? `0${this.end.h}` : this.end.h;
    const endMinute = this.end.m < 10 ? `0${this.end.m}` : this.end.m;
    return `${startHour}:${startMinute} - ${endHour}:${endMinute}`;
  }
}
