enum Type { job, item, comment, poll, pollopt, story };

export class Item {
  id: number;
  deleted: boolean;
  type: Type;
  by: string;
  time: number;
  text: string;
  dead: boolean;
  parent: number;
  poll: any;
  kids: Array<number>
  url: string;
  score: number;
  title: string;
  parts: Array<Type.pollopt>
  descendants: number;

  private _time;
  get CreatedOn(): string {
    if (this._time)
      return this._time;

    let time = new Date(this.time)
    let timeZoneOffset = time.getTimezoneOffset() * 60000;
    this._time = new Date(time.getTime() + timeZoneOffset)

    return this._time;
  }

  // If memory becomes an issue and speed is not a factor, then this can be done manually every time search 
  private _lowercaseText;
  get lowerCaseText() {
    if (this._lowercaseText)
      return this._lowercaseText;

    this._lowercaseText = this.text ? this.text.toLowerCase() : '';
    return this._lowercaseText;
  }
}
