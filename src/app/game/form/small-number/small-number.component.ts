import { Component, Input, forwardRef } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: "mc-small-number",
  templateUrl: "./small-number.component.html",
  styleUrls: ["./small-number.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SmallNumberComponent),
      multi: true
    }
  ]
})
export class SmallNumberComponent implements ControlValueAccessor {
  @Input() min = 0;
  @Input() max = 5;
  @Input() step = 1;

  isDisabled = false;
  value = 0;

  constructor() {}

  get countDecimals() {
    return Math.floor(this.step) === this.step
      ? 0
      : this.step.toString().split(".")[1].length || 0;
  }

  get decimalString() {
    return `1.${this.countDecimals}-${this.countDecimals}`;
  }

  decrement() {
    if (this.value > this.min) {
      this.value = this.float(this.value - this.step);
      this.onChange(this.value);
    }
    this.onTouched();
  }

  increment() {
    if (this.value < this.max) {
      this.value = this.value + this.step;
      this.onChange(this.value);
    }
    this.onTouched();
  }

  onChange(value: number) {}

  onTouched() {}

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  writeValue(value: number) {
    this.value = value || 0;
  }

  setDisabledState(isDisabled: boolean) {}

  private float(value: number) {
    return parseFloat(value.toFixed(this.countDecimals));
  }
}
