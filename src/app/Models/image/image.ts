export class Image {
  constructor(
    public id: number | null,
    public name: string,
    public type: string,
    public imageData: Blob | null //
  ) {}
}
