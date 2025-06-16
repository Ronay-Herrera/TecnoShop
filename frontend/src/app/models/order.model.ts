export interface Product {
  productId: string | number;
  productName: string;
  productQuantity: number;
}

export interface Order {
  _id?: string;
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  orderId: string;
  products: Product[];
  userId?: string;
  date: string;
  state: string;
}
