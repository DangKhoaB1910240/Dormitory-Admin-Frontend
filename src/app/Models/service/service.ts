export class Service {
  constructor(
    public id: number | null,
    public name: string,
    public price: number,
    public description: string,
    public enable: boolean
  ) {}
}
