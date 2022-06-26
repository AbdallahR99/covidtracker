export interface Cases {
  new: string;
  active: number;
  critical: number;
  recovered: number;
  '1M_pop': string;
  total: number;
}

export interface Deaths {
  new: string;
  '1M_pop': string;
  total: number;
}

export interface Tests {
  '1M_pop': string;
  total: number;
}

export class History {
  constructor(
    public continent: string,
    public country: string,
    public population: number,
    public cases: Cases,
    public deaths: Deaths,
    public tests: Tests,
    public day: string,
    public time: Date,
  ) {}
}
