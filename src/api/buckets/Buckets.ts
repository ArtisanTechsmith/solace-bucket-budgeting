import {ApiConnector} from "../ApiConnector.ts";
import type {BucketDto} from "./BucketDto.ts";
import {useQuery, type UseQueryResult} from "@tanstack/react-query";
import type {Envelope} from "../Envelope.ts";

class Buckets extends ApiConnector<BucketDto> {
  constructor() {
    super("buckets");
  }

  async getAll() {
    return await super.getAll();
  }
}

export const useBuckets = () => {
  const model = new Buckets();
  return {
    useGetAll: (): UseQueryResult<Envelope<BucketDto>> => useQuery({
      queryKey: ["buckets", "getAll"],
      queryFn: async () => await model.getAll(),
    })
  }
}