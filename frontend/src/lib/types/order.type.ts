export type OrderOutput = {
  id: string;
  quantity: number;
  total: number;
  createdAt: string;
  updatedAt: string;
  userId: string;
  productId: string;
  products: {
    name: string;
    price: number;
    createdAt: string;
    updatedAt: string;
    user: {
      name: string;
      email: string;
    };
  };
  user?: {
    name: string;
    email: string;
  };
};

export type OrderInput = {
  quantity: number;
  total: number;
  userId: string;
  productId: string;
};

export type OrderUpdateInput = {
  quantity?: number;
  total?: number;
  userId?: string;
  productId?: string;
};
