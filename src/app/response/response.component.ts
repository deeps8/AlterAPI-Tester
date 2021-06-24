import { Component, Input, OnInit } from '@angular/core';
import { MonacoEditorConstructionOptions } from '@materia-ui/ngx-monaco-editor';
import { AltapiService, DataDisplay } from '../altapi.service';

@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.scss']
})
export class ResponseComponent implements OnInit {

  @Input() data!:DataDisplay;

  editorOptions: MonacoEditorConstructionOptions = {
		theme: 'vs-dark',
		language: 'json',
		roundedSelection: true,
		autoIndent: "keep",
    readOnly: true
	};

  constructor() { }

  ngOnInit(): void {
  }


}
