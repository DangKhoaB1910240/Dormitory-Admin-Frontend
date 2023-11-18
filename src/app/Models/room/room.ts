export class Room {
  constructor(
    public id: number | null,
    public numberRoom: number,
    public currentQuantity: number | null,
    public enable: boolean | null,
    public gender: number | null
  ) {}
}
