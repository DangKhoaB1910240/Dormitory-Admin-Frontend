export class ContractResponseDto {
  constructor(
    public id: number,
    public numberStudent: string,
    public name: string,
    public studentStatus: number,
    public major: string,
    public classroom: string,
    public email: string,
    public phone: string,
    public gender: number,
    public roomType: string,
    public numberRoom: number,
    public status: number,
    public totalPrice: number
  ) {}
}
