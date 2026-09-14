import { Envelope } from "./Envelope.ts";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export class ApiConnector<ResponseType extends object> {
  private readonly endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  //#region Api Methods
  async getById(id: number): Promise<Envelope<ResponseType>> {
    return await this.sendRequest("GET", id);
  }

  async getAll(): Promise<Envelope<ResponseType>> {
    return await this.sendRequest("GET");
  }

  async update<T>(body: T, id?: number): Promise<Envelope<ResponseType>> {
    return await this.sendRequest(
      "PUT",
      body,
      id ?? (body as { id: number }).id,
    );
  }

  async create<T>(body: T): Promise<Envelope<ResponseType>> {
    return await this.sendRequest("POST", body);
  }

  async delete(id: number): Promise<Envelope<ResponseType>> {
    return await this.sendRequest("DELETE", id);
  }
  //#endregion

  //#region Inner Utility Methods
  private async sendRequest(
    method: "GET",
    id?: number,
  ): Promise<Envelope<ResponseType>>;
  private async sendRequest<T>(
    method: "POST",
    body: T,
  ): Promise<Envelope<ResponseType>>;
  private async sendRequest<T>(
    method: "PUT",
    body: T,
    id?: number,
  ): Promise<Envelope<ResponseType>>;
  private async sendRequest(
    method: "DELETE",
    id: number,
  ): Promise<Envelope<ResponseType>>;
  private async sendRequest<T extends object>(
    method: HttpMethod,
    input?: T | number,
    identifier?: number,
  ): Promise<Envelope<ResponseType>> {
    await this.simulateRequest();

    const body = typeof input === "object" ? input : undefined;
    const id = typeof input === "number" ? input : identifier;
    const promise = fetch(this.getUrl(id), {
      method,
      body: body ? JSON.stringify(body) : undefined,
    });

    return await this.simulateResponse(promise);
  }

  private getUrl(id?: number): string {
    return `${import.meta.env.VITE_API_HOST}/${this.endpoint}${id ? `/${id}` : ""}`;
  }
  //#endregion

  //#region Simulate Real Server Activity. Temporary/Local-Only.
  private async simulateRequest(): Promise<void> {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(null as never);
      }, 500);
    });
  }

  private async simulateResponse(
    promise: Promise<Response>,
  ): Promise<Envelope<ResponseType>> {
    try {
      const resp = await promise;
      const json = await resp.json();
      return new Envelope<ResponseType>({
        data: Array.isArray(json) ? json : [json],
      });
    } catch (_error) {
      const error = _error as Error;
      return new Envelope<ResponseType>({ errors: [error.message] });
    }
  }
  //#endregion
}
