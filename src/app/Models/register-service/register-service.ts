import { Service } from '../service/service';
import { Sesmester } from '../sesmester/sesmester';
import { Student } from '../student/student';

export class RegisterService {
  constructor(
    public id: number,
    public registrationDate: Date,
    public student: Student,
    public service: Service,
    public sesmester: Sesmester,
    public motorbikeLicensePlate: string,
    public price: number,
    public status: number
  ) {}
}
