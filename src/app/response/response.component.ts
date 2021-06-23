import { Component, Input, OnInit } from '@angular/core';
import { AltapiService, DataDisplay } from '../altapi.service';

@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.scss']
})
export class ResponseComponent implements OnInit {

  @Input() data!:DataDisplay;

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
    autoRefresh:true,
    readOnly:true
  };
  jsonData:any;
  constructor() { }

  ngOnInit(): void {
    this.jsonData = JSON.stringify({
      "$schema": "http://json-schema.org/draft-07/schema#",
      "type": "object",
      "title": "Object",
      "additionalProperties": false,
      "properties": {
        "string": {
          "type": "string",
          "title": "String"
        }
      }
    },null," ");
  }


}
