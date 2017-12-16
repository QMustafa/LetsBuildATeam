import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule} from '@angular/http';
import { AppComponent } from './app.component';
import { Console } from '@angular/core/src/console';
import { StartGameComponent } from './start-game/start-game.component';
import { SelectPersonalityComponent } from './select-personality/select-personality.component';
import { ShowEventsComponent } from './show-events/show-events.component';
import { ResultComponent } from './result/result.component';
import { SharedComponent } from './shared/shared.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectPersonality2Component } from './select-personality-2/select-personality-2.component';


@NgModule({
  declarations: [
    AppComponent,
    StartGameComponent,
    SelectPersonalityComponent,
    ShowEventsComponent,
    ResultComponent,
    SharedComponent,
    SelectPersonality2Component
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: StartGameComponent },
      { path: 'Personalities', component: SelectPersonalityComponent },
      { path: 'Events', component: ShowEventsComponent },
      { path: 'result', component: ResultComponent },
      { path: 'Personalities2', component: SelectPersonality2Component },
      { path: '**', redirectTo: 'home' }
  ]), 
  ],
  providers: [AppComponent,StartGameComponent, SelectPersonalityComponent, ShowEventsComponent, ResultComponent, SelectPersonality2Component],
  bootstrap: [AppComponent,StartGameComponent, SelectPersonalityComponent, ShowEventsComponent, ResultComponent, SelectPersonality2Component]
})
export class AppModule {
  
 }
