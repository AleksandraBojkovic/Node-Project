import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-component',
  templateUrl: './test-component.component.html',
  styleUrls: ['./test-component.component.css']
})
export class TestComponentComponent implements OnInit {
  private variabla: string;

  constructor() { 
    this.variabla = "Da li je povezano?";
  }

  ngOnInit() {
  }

}
