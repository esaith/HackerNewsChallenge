export class Dictionary<T> {
    private _keys: Array<string> = new Array<string>();
    private _values: Array<T> = new Array<T>();
  
    constructor() {}
  
    add(key: string, value: T) {
      if (this[key]) {
        let i = this._keys.indexOf(key);
        this._values[i] = value;
      } else {
        this._keys.push(key);
        this._values.push(value);
      }
  
      this[key] = value;
    }
  
    remove(key: string) {
      let index = this._keys.indexOf(key, 0);
      if (index > -1) {
        this._keys.splice(index, 1);
        this._values.splice(index, 1);
  
        delete this[key];
      }
    }
  
    keys(): string[] {
      return this._keys;
    }
  
    values(): T[] {
      return this._values;
    }
  
    contains(key: string) {
      if (typeof this[key] === "undefined") {
        return false;
      }
  
      return true;
    }
  }
  