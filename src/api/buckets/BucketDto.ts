export class BucketDto {
  bucketId?: string;
  name?: string;
  amount?: number;
  id?: number;

  constructor(init?: Partial<BucketDto>) {
    Object.assign(this, init);
  }
}
