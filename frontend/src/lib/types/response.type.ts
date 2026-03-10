export interface ResponseType<T> {
  status: string;
  message: unknown;
  payload?: T;
}
