export class BillRequestDTO {
  constructor(
    public finalElectricity: number,
    public finalWater: number,
    public roomId: number
  ) {}
}
