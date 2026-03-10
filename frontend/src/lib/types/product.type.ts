export type ProductOutput = {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  userId: string;
  user: {
    name: string;
    email: string;
  };
};

export type ProductInput = {
  name: string;
  description: string;
  price: number;
  quantity: number;
};

export type ProductUpdateInput = {
  name?: string;
  description?: string;
  price?: number;
  quantity?: number;
};

export type ProductUpdateOutput = {
  name: string;
  description: string;
  price: number;
  quantity: number;
};

export type ProductDeleteOutput = {
  name: string;
  description: string;
  price: number;
  quantity: number;
};
