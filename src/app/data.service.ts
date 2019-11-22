import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

	private REMOTE_SERVER = 'https://testapi.io/api/crimsonsunset/code-challenge-jobs';

  constructor(private httpClient: HttpClient) { }

  //gets the data from the endpoint
  public sendGetRequest(){
  	return this.httpClient.get(this.REMOTE_SERVER)
  	.pipe(
  		retry(2), //retry attempt to connect 
  		catchError(this.errorHandler) //handle error
  	);
  }
  
  //The error handler
  private errorHandler(error: HttpErrorResponse){
  	if(error.error instanceof ErrorEvent){
  		console.error('An error occurred: ', error.error.message)
  	} else{
  		console.error('Something wierd happened. Error: ${error.error}');
  	}
  	return throwError('Beware, the error bears are here!');
  }

}
