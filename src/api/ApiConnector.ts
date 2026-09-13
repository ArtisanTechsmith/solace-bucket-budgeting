import {Envelope} from "./Envelope.ts";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export class ApiConnector<ResponseType extends object> {
  private readonly endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  //#region Api Methods
  async getAll(): Promise<Envelope<ResponseType>> {
    return await this.sendRequest("GET")
  }

  async update<T>(body: T): Promise<Envelope<ResponseType>> {
    return await this.sendRequest("PUT", body)
  }

  async create<T>(body: T): Promise<Envelope<ResponseType>> {
    return await this.sendRequest("POST", body)
  }

  async delete(): Promise<Envelope<ResponseType>> {
    return await this.sendRequest("DELETE")
  }
  //#endregion

  //#region Inner Utility Methods
  private async sendRequest(method: "GET"): Promise<Envelope<ResponseType>>;
  private async sendRequest<T>(method: "POST", body: T): Promise<Envelope<ResponseType>>;
  private async sendRequest<T>(method: "PUT", body: T): Promise<Envelope<ResponseType>>;
  private async sendRequest(method: "DELETE"): Promise<Envelope<ResponseType>>;
  private async sendRequest<T>(method: HttpMethod, body?: T): Promise<Envelope<ResponseType>> {
    await this.simulateRequest()
    const promise = fetch(this.getUrl(), {
      method,
      body: body ? JSON.stringify(body) : undefined,
    })
    return await this.simulateResponse(promise)
  }

  private getUrl() {
    return `${import.meta.env.VITE_API_HOST}/${this.endpoint}`;
  }
  //#endregion

  //#region Simulate Real Server Activity. Temporary/Local-Only.
  private async simulateRequest(): Promise<void> {
    await new Promise(resolve => {
      setTimeout(() => {
        resolve(null as never)
      }, 500)
    })
  }

  private async simulateResponse(promise: Promise<Response>): Promise<Envelope<ResponseType>> {
    try {
      const resp = await promise;
      return await resp.json() as Envelope<ResponseType>;
    } catch (_error) {
      const error = _error as Error;
      return new Envelope<ResponseType>({ errors: [error.message] });
    }
  }
  //#endregion
}