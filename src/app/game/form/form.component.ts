import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from "@angular/core";
import { NgForm } from "@angular/forms";

import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";

import { Form } from "./form";

@Component({
  selector: "mc-form[model]",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.scss"]
})
export class FormComponent implements OnInit {
  @Input() model!: Form;

  @Output() restart = new EventEmitter();
  @Output() showPattern = new EventEmitter();

  @ViewChild("form") form!: NgForm;

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

    this.form.valueChanges!
      .subscribe(() => this.restart$.next());
  }
}