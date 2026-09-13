export class BucketDto {
  name?: string;

  constructor(init?: Partial<BucketDto>) {
    Object.assign(this, init);
  }
}