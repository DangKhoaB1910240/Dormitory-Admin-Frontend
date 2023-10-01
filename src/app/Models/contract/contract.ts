import { Admin } from '../admin/admin';
import { Service } from '../service/service';
import { Sesmester } from '../sesmester/sesmester';
import { Student } from '../student/student';

export class Contract {
  constructor(
    public id: number | null = null,
    public student: Student | null = null,
    public admin: Admin | null = null,
    public sesmester: Sesmester | null = null,
    public totalPrice: number | null = null,
    public roomType: string | null = null,
    public numberRoom: number | null = null,
    public createdDate: Date,
    public services: Service[] | null = null,
    public roomTypeUpdate: string | null = null,
    public numberRoomUpdate: number | null = null,
    public updatedDate: Date | null = null
  ) {}
}
