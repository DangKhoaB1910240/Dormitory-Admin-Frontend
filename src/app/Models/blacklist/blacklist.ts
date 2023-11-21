import { Admin } from '../admin/admin';
import { Student } from '../student/student';

export class Blacklist {
  constructor(
    public id: number,
    public admin: Admin,
    public reason: string,
    public student: Student
  ) {}
}
