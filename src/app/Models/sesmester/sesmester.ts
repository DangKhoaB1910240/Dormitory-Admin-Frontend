export class Sesmester {
  constructor(
    public id: number,
    public sesmester: number,
    public schoolYear: string,
    public startDate: Date,
    public endDate: Date,
    public registrationStartDate: Date,
    public registrationEndDate: Date,
    public status: boolean
  ) {}
}
