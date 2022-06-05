export class HouseholdPgData {
  last_visit: number;
  nickname: string;
  notes: string;
  passport: string;
  playground_id: string;

  constructor() {
    this.last_visit = -1;
    this.nickname = '';
    this.notes = '';
    this.passport = '';
    this.playground_id = '';
  }
}

export class Household {
  playgrounds: { [key: string]: HouseholdPgData } = {};
}
