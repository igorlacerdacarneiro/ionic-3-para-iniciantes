import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the MovieProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MovieProvider {

  private url = "https://api.themoviedb.org/3";
  private key = "api_key=****************"

  constructor(public http: HttpClient) {
    console.log('Hello MovieProvider Provider');
  }
  
  getLatestMovies(){
    return this.http.get(this.url + "/movie/latest?" + this.key);
  }

  getPopularMovies(page = 1){
    return this.http.get(this.url + `/movie/popular?page=${page}&` + this.key);
  }

  getMovieDetails(filmeId){
    return this.http.get(this.url + `/movie/${filmeId}?` + this.key);
  }
}
