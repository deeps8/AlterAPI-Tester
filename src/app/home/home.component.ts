import { Component,OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MonacoEditorComponent, MonacoEditorConstructionOptions } from '@materia-ui/ngx-monaco-editor';
import { AltapiService } from '../altapi.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild(MonacoEditorComponent, { static: false })
  monacoComponent: MonacoEditorComponent | undefined;

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

  editorOptions: MonacoEditorConstructionOptions = {
		theme: 'vs-dark',
		language: 'json',
		roundedSelection: true,
		autoIndent: "keep"
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

  async onSubmit(form:FormGroup){

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
    let data = await this.altApi.requesting(apiData,this.jsonData);
    let el = document.getElementById('response');
    el?.scrollIntoView({behavior: "smooth", block: "start", inline: "start"});
    this.spinner = false;
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
