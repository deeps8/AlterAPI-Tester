import { Component,OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AltapiService } from '../altapi.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  apiTest: FormGroup = new FormGroup({});
  queryParams:Array<any> = [{
    key:"",
    value:""
  }];

  reqHeaders:Array<any> = [{
    key:"",
    value:""
  }];

  jsonData:any;
  spinner:boolean = false;

  codeMirrorOptions: any = {
    theme: 'seti',
    mode: 'application/ld+json',
    lineNumbers: true,
    lineWrapping: true,
    foldGutter: true,
    gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter', 'CodeMirror-lint-markers'],
    autoCloseBrackets: true,
    matchBrackets: true,
    lint: true,
    autoRefresh:true
  };

  constructor(public altApi:AltapiService) {

  }


  ngOnInit(): void {

    this.jsonData = JSON.stringify({},null," ");

    this.apiTest = new FormGroup({
      method : new FormControl("GET",[Validators.required]),
      url : new FormControl("",[Validators.required]),
      params : new FormControl(this.queryParams),
      headers : new FormControl(this.reqHeaders)
    });

  }

  onSubmit(form:FormGroup){

    this.spinner = true;

    this.queryParams = this.queryParams.filter(p => p.key.trim() != "" && p.value.trim() != "");
    this.reqHeaders = this.reqHeaders.filter(h => h.key.trim() != "" && h.value.trim() != "");
    form.patchValue({params:this.queryParams,headers:this.reqHeaders});

    let pr = Object({});
    this.queryParams.map(p=>{
      pr[p.key]=p.value;
    });

    let hr = Object({});
    this.reqHeaders.map(h=>{
      hr[h.key]=h.value;
    });

    let apiData = Object({
      url:form.value.url,
      method:form.value.method,
      params:pr,
      headers:hr
    });

    // console.log(apiData);
    this.altApi.requesting(apiData,this.jsonData);
    setTimeout(() => {
      this.spinner = false;
    }, 500);
  }

  removeParams(index:number,arr:Array<any>){
    arr.splice(index,1);
  }

  addParams(arr:Array<any>){
    arr.push({
      key:"",value:""
    });
  }

}
