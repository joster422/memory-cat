import { Injectable } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class MenuService {
  showPattern$ = new Subject<null>();
  form = this.formBuilder.group({
    difficulty: [
      4,
      [Validators.required, Validators.min(4), Validators.max(200)]
    ],
    timing: [1, [Validators.required, Validators.min(0.2), Validators.max(3)]],
    size: [2, [Validators.required, Validators.min(2), Validators.max(5)]]
  });

  constructor(private formBuilder: FormBuilder) {}

  showPattern() {
    this.showPattern$.next();
  }
}
