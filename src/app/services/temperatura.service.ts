import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const UrlBase = 'https://api.openweathermap.org/data/2.5/weather';
const appId ='63716bd708b899c87debc793be9ace9d';

@Injectable({
  providedIn: 'root'
})
export class TemperaturaService {

  constructor(private hhtp: HttpClient) { 
  }

  
  getEstadoTiempo(ciudad: string, codigo: string){
    const url = `${ UrlBase }?q=${ciudad},${codigo}&appid=${appId}`;
    return this.hhtp.get(url);
  }

}
