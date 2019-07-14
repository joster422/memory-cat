import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { FormControlModule } from "@joster/form-control";

import { AppComponent } from "./app.component";
import { GameComponent } from "./game/game.component";
import { FormComponent } from "./game/form/form.component";
import { CardComponent } from './game/card/card.component';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    FormComponent,
    CardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormControlModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
