import { TimePeriod } from "../store/types";

export const TIME_PERIOD: TimePeriod[] = [
  new TimePeriod({ h: 7, m: 30 }, { h: 9, m: 0 }),
  new TimePeriod({ h: 9, m: 0 }, { h: 10, m: 30 }),
  new TimePeriod({ h: 10, m: 30 }, { h: 12, m: 0 }),
  new TimePeriod({ h: 1, m: 30 }, { h: 3, m: 0 }),
  new TimePeriod({ h: 3, m: 0 }, { h: 4, m: 30 }),
  new TimePeriod({ h: 4, m: 30 }, { h: 6, m: 0 }),
];
