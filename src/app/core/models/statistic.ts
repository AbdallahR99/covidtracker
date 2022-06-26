export interface Cases {
  new?: any;
  active: number;
  critical?: any;
  recovered: number;
  '1M_pop': string;
  total: number;
}

export interface Deaths {
  new?: any;
  '1M_pop': string;
  total: number;
}

export interface Tests {
  '1M_pop': string;
  total: number;
}

export class Statistic {
  constructor(
    public continent: string,
    public country: string,
    public population: number,
    public cases: Cases,
    public deaths: Deaths,
    public tests: Tests,
    public day: string,
    public time: Date,
    public countryName?: string,
    public countryCode?: string,
    public continentName?: string,

  ) {}
}
