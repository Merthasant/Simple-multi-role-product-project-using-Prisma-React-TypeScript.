export interface ResponseType<T> {
  status: string;
  message: unknown;
  payload?: T;
}

export interface AddMetaData<T> {
  data: T;
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
