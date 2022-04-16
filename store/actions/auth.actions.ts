import { AppDispatch } from "..";
import { BaseUrl } from "../../constants/BaseUrl";
import { axiosClient } from "../api/axiosClient";
import { set as setAuth, clear as clearAuth } from "../slices/auth.slice";
import { CreateUserDto, LoginDto, UserType } from "../types";
import { set as setUser } from "../slices/user.slice";
import { USER_ROLE } from "../../enum/USER_ROLE";
import ProcessActions from "./process.actions";

type AuthResponseType = {
  user: UserType;
  accessToken: string;
};

export function register(dto: CreateUserDto) {
  return async (dispatch: AppDispatch) => {
    const authResponse = await axiosClient.post<any, AuthResponseType>(
      "/auth/register",
      dto
    );
    console.log(authResponse);
    const { user, accessToken } = authResponse;

    dispatch(setUser(user));
    dispatch(setAuth({ accessToken }));
  };
}

export function login(dto: LoginDto) {
  return async (dispatch: AppDispatch) => {
    const authResponse = await axiosClient.post<any, AuthResponseType>(
      "/auth/login",
      { username: dto.email, password: dto.password }
    );
    console.log(authResponse);
    const { user, accessToken } = authResponse;

    dispatch(setUser(user));
    dispatch(setAuth({ accessToken }));
  };
}
export function logout() {
  return async (dispatch: AppDispatch) => {
    dispatch(clearAuth(""));
  };
}

export function reLogin(refreshToken: string) {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(ProcessActions.start("AuthReLogin"));
      dispatch(setAuth({ accessToken: refreshToken }));
      const authResponse = await axiosClient.post<any, AuthResponseType>(
        "/auth/re-login"
      );
      const { user, accessToken } = authResponse;
      dispatch(setUser(user));
      dispatch(setAuth({ accessToken }));
      dispatch(ProcessActions.complete("AuthReLogin"));
    } catch {
      dispatch(ProcessActions.failure("AuthReLogin"));
    }
  };
}
