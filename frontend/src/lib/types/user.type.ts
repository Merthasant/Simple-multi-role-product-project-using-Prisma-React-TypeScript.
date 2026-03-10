export type UserOutput = {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  createdAt: string;
  updatedAt: string;
};

export type UserUpdateOutput = {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  createdAt: string;
  updatedAt: string;
};

export type UserDeleteOutput = {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  createdAt: string;
  updatedAt: string;
};

export type UserInput = {
  name: string;
  email: string;
  password: string;
  confPassword: string;
  role: "user" | "admin";
};

export type UserUpdateInput = {
  name?: string;
  email?: string;
  password?: string;
  confPassword?: string;
  role?: "user" | "admin";
};
