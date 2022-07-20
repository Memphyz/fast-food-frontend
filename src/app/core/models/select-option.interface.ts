export class SelectOption<T> {
  label: string;
  sublabel?: string;
  value: T;
  disabled?: boolean;

  constructor(label: string, value: T, sublabel?: string, disabled?: boolean) {
    this.label = label;
    this.value = value;
    this.sublabel = sublabel;
    this.disabled = disabled;
  }
}
