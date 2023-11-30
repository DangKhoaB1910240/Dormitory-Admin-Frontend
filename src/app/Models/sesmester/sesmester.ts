export class Sesmester {
  constructor(
    public id: number | null,
    public sesmester: number,
    public schoolYear: string,
    public startDate: Date | null,
    public endDate: Date | null,
    public registrationStartDate: Date | null,
    public registrationEndDate: Date | null,
    public status: boolean,
    public holidayWeek: number
  ) {}
}
