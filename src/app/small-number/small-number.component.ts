import { Component, Input, forwardRef } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: "mc-small-number",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SmallNumberComponent),
      multi: true
    }
  ],
  templateUrl: "./small-number.component.html",
  styleUrls: ["./small-number.component.scss"]
})
export class SmallNumberComponent implements ControlValueAccessor {
  @Input() step = 1;
  @Input() min = 0;
  @Input() max: number;

  value = 0;

  constructor() {}

  get countDecimals(): number {
    return Math.floor(this.step) === this.step
      ? 0
      : this.step.toString().split(".")[1].length || 0;
  }

  get decimalString() {
    return `1.0-${this.countDecimals}`;
  }

  decrement() {
    if (this.value > this.min) {
      this.value = parseFloat(
        (this.value - this.step).toFixed(this.countDecimals)
      );
      this.onModelChange(this.value);
    }
    this.onTouch();
  }

  increment() {
    if (this.value < this.max) {
      this.value = parseFloat(
        (this.value + this.step).toFixed(this.countDecimals)
      );
      this.onModelChange(this.value);
    }
    this.onTouch();
  }

  registerOnChange(fn) {
    this.onModelChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouch = fn;
  }

  writeValue(value) {
    this.value = value || 0;
  }

  private onModelChange(value: number) {}

  private onTouch() {}
}
