import { ApiConnector } from "../ApiConnector.ts";
import type { AccountDto } from "./AccountDto.ts";
import { useMutation, useQuery } from "@tanstack/react-query";

class Accounts extends ApiConnector<AccountDto> {
  public static endpoint: string = "accounts";

  constructor() {
    super(Accounts.endpoint);
  }
}

export const useAccounts = () => {
  const instance = new Accounts();
  return {
    useGetById: (id: number) => {
      return useQuery({
        queryKey: [Accounts.endpoint, "getById", id],
        queryFn: async () => await instance.getById(id),
      });
    },
    useGetAll: () => {
      return useQuery({
        queryKey: [Accounts.endpoint, "getAll"],
        queryFn: async () => await instance.getAll(),
      });
    },
    useUpdate: () => {
      return useMutation({
        mutationKey: [Accounts.endpoint, "update"],
        mutationFn: async (model: Partial<AccountDto>) =>
          await instance.update(model),
      });
    },
  };
};
