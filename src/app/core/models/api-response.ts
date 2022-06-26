import { APIParameters } from "./api-parameters";

export interface APIResponseError {
  required?: string;
  endpoint?: string;
}
export class APIResponse<ResponseType, Parameters extends APIParameters> {
  constructor(
    public get: string,
    public parameters: Parameters[],
    public errors: APIResponseError[],
    public results: number,
    public response: ResponseType[],
  ) {}
}



