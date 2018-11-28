import { FilmeDetalhesPage } from './../filme-detalhes/filme-detalhes';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { MovieProvider } from '../../providers/movie/movie';

/**
 * Generated class for the FeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
  providers:[
    MovieProvider
  ]
})
export class FeedPage {

  public listMovies = new Array<any>();
  public loader;
  public refresher;
  public isRefreshing: boolean = false;
  public page: number = 1;
  public infiniteScroll;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private movieProvider: MovieProvider,
    public loadingCtrl: LoadingController
  ) {
  }

  ionViewDidEnter() {
    this.carregarFilmes();
  }

  carregarFilmes(newPage: boolean = false){
    this.openLoading();
    this.movieProvider.getPopularMovies(this.page).subscribe(
    data =>{
      const response = (data as any);

      if(newPage){
        this.listMovies = this.listMovies.concat(response.results);
        this.infiniteScroll.complete();
      }else{
        this.listMovies = response.results;
      }

      this.closeLoading();

      if(this.isRefreshing){
        this.refresher.complete();
        this.isRefreshing = false;
      }

    }, error =>{
      console.log("error: ", error);

      this.closeLoading();

      if(this.isRefreshing){
        this.refresher.complete();
        this.isRefreshing = false;
      }
    });
  }

  openLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Carregando..."
    });
    this.loader.present();
  }

  closeLoading(){
    this.loader.dismiss();
  }

  doRefresh(refresher) {
    this.refresher = refresher;
    this.isRefreshing = true;
    this.carregarFilmes();
  }

  abrirDetalhes(filme){
    this.navCtrl.push(FilmeDetalhesPage, {id: filme.id});
  }

  doInfinite(infiniteScroll) {
    this.infiniteScroll = infiniteScroll;
    this.page++;
    this.carregarFilmes(true);
  }

}
