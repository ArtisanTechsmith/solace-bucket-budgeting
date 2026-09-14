import { BucketDto } from "../buckets/BucketDto";
import type { ColorOption } from "../../components/color/hooks/useColorOptions.ts";

export class AccountDto {
  id?: number;
  name?: string;
  balance?: number;
  color?: ColorOption;
  buckets?: Array<BucketDto>;

  constructor(init?: Partial<AccountDto>) {
    Object.assign(this, init);
  }
}
