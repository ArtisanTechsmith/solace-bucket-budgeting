export class AccountDto {
  constructor(init?: Partial<AccountDto>) {
    Object.assign(this, init);
  }
}
