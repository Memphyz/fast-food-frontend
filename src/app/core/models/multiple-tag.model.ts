export class MultipleTag<T> {
  public value: T;
  public editing: boolean;
  public titile: string;

  constructor(title: string, value: T, editing?: boolean) {
    this.titile = title;
    this.value = value;
    this.editing = !!editing;
  }
}
