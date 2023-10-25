import { Admin } from '../admin/admin';
import { Material } from '../material/material';
import { Student } from '../student/student';

export class Feedback {
  constructor(
    public id: number,
    public student: Student,
    public material: Material,
    public quantity: number,
    public roomType: string,
    public numberRoom: number,
    public sendDate: Date,
    public status: number,
    public admin: Admin
  ) {}
}
