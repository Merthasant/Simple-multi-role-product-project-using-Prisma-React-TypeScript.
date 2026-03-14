import type { UserOutput } from "./user.type";

export type RegisterInputDataType = {
  name: string;
  email: string;
  password: string;
  confPassword: string;
  role: string;
};

export type AuthOutputDataType = {
  data: UserOutput;
  token: {
    accessToken: string;
  };
};

export type LoginInputDataType = {
  email: string;
  password: string;
};
