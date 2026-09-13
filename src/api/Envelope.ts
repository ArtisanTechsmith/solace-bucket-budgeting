export class Envelope<ResponseType extends object, ErrorType = string> {
  data: ResponseType[] = [];
  errors: ErrorType[] = [];

  constructor(init?: Partial<Envelope<ResponseType, ErrorType>>) {
    Object.assign(this, init);
  }
}