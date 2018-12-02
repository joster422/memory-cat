import { Injectable } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class MenuService {
  showPattern$ = new Subject<null>();
  form = this.formBuilder.group({
    difficulty: [4],
    timing: [1],
    size: [2]
  });

  constructor(private formBuilder: FormBuilder) {}

  showPattern() {
    this.showPattern$.next();
  }
}
