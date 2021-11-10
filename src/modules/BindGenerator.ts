export type StringOrNull = string | null;

export class BindGenerator {
  private _key: StringOrNull = null;
  private _command: StringOrNull = null;

  get key(): StringOrNull {
    return this._key;
  }
  get command(): StringOrNull {
    return this._command;
  }

  public reset(): void {
    this._key = null;
    this._command = null;
  }

  public setKey(key: string): void | never {
    if (typeof key !== 'string') {
      throw new Error('Key must be a string');
    }

    this._key = key;
  }

  public setCommand(command: string): void | never {
    if (typeof command !== 'string') {
      throw new Error('Command must be a string');
    }

    this._command = command;
  }

  public makeBind(): string | never {
    if (!this._command) {
      throw new Error('Missing command');
    }

    if (!this._key) {
      throw new Error('Missing key');
    }

    const completedBind = `bind "${this._key}" "${this._command}";`;
    return completedBind;
  }
}
