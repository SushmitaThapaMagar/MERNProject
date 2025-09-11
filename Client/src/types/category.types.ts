export interface ICategoryData {
  _id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICategory {
  name: string;
  description?: string;
}
