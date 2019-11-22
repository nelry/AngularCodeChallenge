import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

	myControl = new FormControl();
	options: string[] = ['One', 'Two', 'Three'];
	filteredOptions: Observable<string[]>;

  constructor() { }

  ngOnInit() {
  	console.log(this.options);
  	
  	this.filteredOptions = this.myControl.valueChanges
  		.pipe(
  			startWith(''),
  			map(value=>this._filter(value))
  		);
  }

  private _filter(value: string): string[]{
  	const filterValue = value.toLowerCase();
  	return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

}
