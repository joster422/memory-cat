import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { GameComponent } from "./game/game.component";
import { SmallNumberComponent } from "./game/form/small-number/small-number.component";
import { FormComponent } from "./game/form/form.component";

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    SmallNumberComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
