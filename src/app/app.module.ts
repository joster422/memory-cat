import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { GameComponent } from "./game/game.component";
import { MenuComponent } from "./menu/menu.component";

import { MenuService } from "./menu/menu.service";

@NgModule({
  declarations: [AppComponent, GameComponent, MenuComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [MenuService],
  bootstrap: [AppComponent]
})
export class AppModule {}
