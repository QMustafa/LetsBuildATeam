import { Component, OnInit } from '@angular/core';
import {Http, RequestOptions, Headers} from '@angular/http';
import { Router, RouterStateSnapshot } from '@angular/router';
import {map} from 'rxjs/operators';
import { equal } from 'assert';
import { retry } from 'rxjs/operators/retry';
import { element } from 'protractor';
import { concat } from 'rxjs/observable/concat';
import { GaugeModule } from 'angular-gauge';


@Component({
  selector: 'app-show-events',
  templateUrl: './show-events.component.html',
  styleUrls: ['./show-events.component.css']
})
export class ShowEventsComponent implements OnInit {


  gameId :"";
  page : string;
  pers : ["", ""];
  total: number;
  quesNum: number;
  tempTotal : number;
  constructor(private http: Http, private rout : Router, private gaugeModule : GaugeModule ) { 
    const snapshot: RouterStateSnapshot = rout.routerState.snapshot;
    this.gameId = snapshot.root.queryParams["gameId"];  // <-- hope it helps
    this.page = snapshot.root.queryParams["page"];
    this.pers = snapshot.root.queryParams["pers"];
    this.total = snapshot.root.queryParams["total"];
    this.quesNum = 0;
    this.tempTotal = 0;
    console.log(this.quesNum);

  }

  questions: any;
  Question: any;
  flip:boolean;
  ngOnInit() {
    this.http.get("http://34.238.136.185:8080/team/games/"+this.gameId+"/events?page=0&size=3", this.getOptions())
    .pipe( 
      map(res => res.json()))
    .subscribe(resp => 
      this.questions = resp.data
    );
    console.log(this.quesNum);
    this.flip = true;
  }

  private getOptions() : RequestOptions {
    const options = new RequestOptions({
      headers: new Headers({
        "Content-Type" : "application/json"      
      })
    });
    return options;
  }


getQuestionSum(questionSelector) : number
{
  console.log("First enter");
  let sum = 0;
  for(let j = 0; j < questionSelector.eventRoles.length; j++){
    if(questionSelector.eventRoles[j].correlation_impact == 0)
    {
      sum += questionSelector.eventRoles[j].impact;
    }
    else
    {
      sum += questionSelector.eventRoles[j].correlation_impact;
    }
      
    
  }
  this.tempTotal = sum;
  return (+this.total + +sum);
}
  ShowNext()  {
    this.total = +this.total + +this.tempTotal;
    this.tempTotal = 0;
    if(this.total < 20)
    {
      this.rout.navigate(['/result'], { queryParams: { gameId: this.gameId, total : this.total}});
      return;
    }
    if(this.quesNum >= 2 && this.page  === "1")
    {
      console.log("1");
      this.rout.navigate(['/Personalities2'], { queryParams: { gameId: this.gameId, page : 2, total: this.total,  pers : [this.pers[0], this.pers[1]]}});
    }
    else if(this.quesNum >= 2 && this.page  === "2")
    {
      this.rout.navigate(['/result'], { queryParams: { gameId: this.gameId, total : this.total}});
    }
    else{
      console.log("3");
      this.quesNum = (this.quesNum + 1);
    }
        
  }

}
