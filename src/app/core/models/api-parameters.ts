export abstract class APIParameters {}

export class CountriesParameters extends APIParameters {
  constructor(
    public search?: string,
  ) {super();}
}

export class StatisticsParameters extends APIParameters {
  constructor(
    public country?: string,
  ) {super();}
}

export class HistoryParameters extends APIParameters {
  constructor(
    /**
     * @description
     * required
     */
    public country: string,
    /**
     * @description
     * YYYY-MM-DD Format
     * Date and time are in UTC
     */
    public date?: string,
  ) {super();}
}
