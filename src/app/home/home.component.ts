import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {DataService} from '../data.service';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	products = [];
	myControl = new FormControl();
	filteredProducts: Observable<string[]>;
	temp = [];
	open = false;

  constructor(private dataService: DataService) { }

  ngOnInit() {
  	//aquire the data from the endpoint
  	this.dataService.sendGetRequest().subscribe((datas: any[]) =>{ 
  		//console.log(datas);
  		//parse the data into the products array
  		for (let i of datas['jobs']){
  			this.products.push(i.data);
  		}
  		//console.log(this.products);
   	}

   	)
   	//filter the data based on user input for the autocomplete
  	this.filteredProducts = this.myControl.valueChanges
  		.pipe(
  			startWith(''),
  			map(value=>this._filter(value))
  		);

  }
  //returns the jobs that begin witht the given string
  private _filter(value: string): string[]{
  	const filterValue = value.toLowerCase();
  	this.open = false;
  	//base case for empty string
  	if(value == ''){
  		return this.products;
  	}
  	this.temp = [];
  	for (let i of this.products){
  		if(i['title'].toLowerCase().startsWith(filterValue)){
  			this.temp.push(i);
  		}
  	}
  	return this.temp;
  }
  //opens panel when job is selected from autocomplete's options
  private openPanel(event: string){
  	this.open = true;
  	//console.log(event);
  }
}
