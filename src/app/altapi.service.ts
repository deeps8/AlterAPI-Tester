import { Injectable } from '@angular/core';
import axios from 'axios';
import * as prettyBytes from 'pretty-bytes';

export interface DataDisplay{
  statusCode:number,
  timeTaken:string,
  size:string,
  body:string,
  header:any
}

@Injectable({
  providedIn: 'root',
})
export class AltapiService {
  response: any ;
  dataToShow:DataDisplay | undefined;

  constructor() {}


  async requesting(apiData:any,jsonData:any){
    let data;
    try {
      data = JSON.parse(jsonData.toString() || null);
    } catch (error) {
      alert("JSON data is malformed");
      return;
    }

    let startTime = new Date().getTime();
    await axios({
      url: apiData.url,
      method: apiData.method,
      params: apiData.params,
      headers: apiData.headers,
      data
    })
      .catch(e => e.response)
      .then(res=> {
        res.timeTaken = new Date().getTime() - startTime - 10;
        this.response = res;

        res.size = prettyBytes(
          JSON.stringify(res.data).length + JSON.stringify(res.headers).length
        )
      });
      // what need to return : status code , time , size , body , header.

      // computing timeTaken
      if(this.response.timeTaken >= 1000){
        this.response.timeTaken = (this.response.timeTaken / 1000) + "s";
      }else{
        this.response.timeTaken = this.response.timeTaken + "ms";
      }

      this.dataToShow = {
        statusCode : this.response.status,
        timeTaken : this.response.timeTaken,
        size : this.response.size,
        body : JSON.stringify(this.response.data,null," "),
        header : this.response.headers
      }

      return true;
  }

}
