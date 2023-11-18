import { Image } from '../image/image-interface';

export interface RoomType {
  id?: number;
  name?: string;
  maxQuantity?: number;
  price?: number;
  isAirConditioned?: boolean;
  isCooked?: boolean;
  enable?: boolean;
  createdDate?: Date;
  updatedDate?: Date;
  images?: Image[];
}
