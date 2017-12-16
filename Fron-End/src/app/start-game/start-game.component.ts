import { Component, OnInit } from '@angular/core';
import {Http, RequestOptions, Headers} from '@angular/http';
import { Router } from '@angular/router';
import {map} from 'rxjs/operators';


@Component({
  selector: 'app-start-game',
  templateUrl: './start-game.component.html',
  styleUrls: ['./start-game.component.css']
})
export class StartGameComponent implements OnInit {

  gameName : "";
 
  constructor(private http: Http, private rout : Router  ) { }

  createNewGame()
  {
    var response;
    console.log('muhammad issa');
    this.http.post("http://34.238.136.185:8080/team/games", '{"player_name" : "' + this.gameName + '"}', this.getOptions())
    .pipe( 
      map(res => res.json()))
    .subscribe(resp => 
    
        this.rout.navigate(['/Personalities'], { queryParams: { gameId: resp.id, page : 1}})
      
    );
  
  
   
  }

  private getOptions() : RequestOptions {
    const options = new RequestOptions({
      headers: new Headers({
        "Content-Type" : "application/json"      
      })
    });
    return options;
  }

  ngOnInit() {
    
  }

}