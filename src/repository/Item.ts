export class Item {
  value: any;
  expiration: number;

  constructor(value: any, expiration: number) {
    this.value = value;
    this.expiration = expiration;
  }
}