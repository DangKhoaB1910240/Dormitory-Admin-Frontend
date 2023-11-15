import { Admin } from '../admin/admin';

export class Bill {
  constructor(
    public id: number,
    public admin: Admin,
    public admin2: Admin,
    public createdDate: Date,
    public initialElectricity: number,
    public finalElectricity: number,
    public initialWater: number,
    public finalWater: number,
    public price: number,
    public roomType: string,
    public numberRoom: number,
    public status: boolean
  ) {}
}
