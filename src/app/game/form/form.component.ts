import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";

import { Form } from "./form";

@Component({
  selector: "mem-cat-form[model]",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.scss"]
})
export class FormComponent implements OnInit {
  @Input() model!: Form;

  @Output() restart = new EventEmitter();
  @Output() showPattern = new EventEmitter();

  restart$ = new Subject();
  showPattern$ = new Subject();

  constructor() { }

  ngOnInit() {
    this.restart$
      .pipe(debounceTime(500))
      .subscribe(() => this.restart.emit());

    this.showPattern$
      .pipe(debounceTime(500))
      .subscribe(() => this.showPattern.emit());
  }
}