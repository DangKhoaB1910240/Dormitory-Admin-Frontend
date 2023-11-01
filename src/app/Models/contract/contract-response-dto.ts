export class ContractResponseDto {
  constructor(
    public numberStudent: string,
    public name: string,
    public major: string,
    public classroom: string,
    public email: string,
    public phone: string,
    public gender: number,
    public roomType: string,
    public numberRoom: number
  ) {}
}
