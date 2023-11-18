import { Image } from '../image/image';

export class RoomType {
  constructor(
    public id: number | null,
    public name: string,
    public maxQuantity: number,
    public price: number,
    public isAirConditioned: boolean | null,
    public isCooked: boolean | null,
    public enable: boolean,
    public createdDate: string,
    public updatedDate: string | null,
    public images: Image[]
  ) {}
}
