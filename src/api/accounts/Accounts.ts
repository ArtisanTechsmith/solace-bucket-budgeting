import { ApiConnector } from "../ApiConnector.ts";
import type { AccountDto } from "./AccountDto.ts";
import type { Envelope } from "../Envelope.ts";
import { useQuery } from "@tanstack/react-query";

class Accounts extends ApiConnector<AccountDto> {
  constructor() {
    super("accounts");
  }

  async getAll(): Promise<Envelope<AccountDto>> {
    return await super.getAll();
  }
}

export const useAccounts = () => {
  const instance = new Accounts();
  return {
    useGetAll: () => {
      return useQuery({
        queryKey: ["accounts", "getAll"],
        queryFn: async () => await instance.getAll(),
      });
    },
  };
};
