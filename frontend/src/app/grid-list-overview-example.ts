import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * @title Basic grid-list
 */
@Component({
  selector: 'grid-list-overview-example',
  styleUrls: ['grid-list-overview-example.css'],
  templateUrl: 'grid-list-overview-example.html',
})


export class GridListOverviewExample implements OnInit {

  constructor(private httpClient: HttpClient) {}


  // public lista_sensor = [
  //     {
  //       incendio : false,
  //       temperatura : 25
  //     },{
  //       incendio : false,
  //       temperatura : 25
  //     },{
  //       incendio : false,
  //       temperatura : 25
  //     },{
  //       incendio : false,
  //       temperatura : 25
  //     }
  //   ];

  public lista_sensor : Observable <any>;

  ngOnInit() {
    console.log("teste");
    this.buscar();
  }

  buscar(): any {
    var req = this.httpClient.get("http://127.0.0.1:3000/pega_dados");

    req.subscribe((data: any) => {      
      this.lista_sensor = data[0].matriz_sensor;      
      console.log(this.lista_sensor);      
    });

  }
}





/**  Copyright 2020 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */