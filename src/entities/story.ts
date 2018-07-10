enum Type { job, story, comment, poll, pollopt };

export class Story {
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
}
