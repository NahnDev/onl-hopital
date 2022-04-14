import { TimePeriod } from "../store/types";

export const TIME_PERIOD: TimePeriod[] = [
  new TimePeriod({ h: 7, m: 30 }, { h: 9, m: 0 }),
  new TimePeriod({ h: 9, m: 0 }, { h: 10, m: 30 }),
  new TimePeriod({ h: 10, m: 30 }, { h: 12, m: 0 }),
  new TimePeriod({ h: 13, m: 30 }, { h: 15, m: 0 }),
  new TimePeriod({ h: 15, m: 0 }, { h: 16, m: 30 }),
  new TimePeriod({ h: 16, m: 30 }, { h: 18, m: 0 }),
];
