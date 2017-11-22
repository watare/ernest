import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ItemSliding, AlertController } from 'ionic-angular';
import {HomePage} from '../home/home';
import{NewtutoPage} from '../newtuto/newtuto';
import{TutoPage} from '../tuto/tuto';
import {MyDbService} from '../../services/my-db.service';
import {Item} from '../../assets/item';
/**
 * Generated class for the AccueilPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
/*export class Item{
  public title:string;
}*/
//export const ITEMS: Item[]=[
     // {name:'Amsterdam'},
      //{name:'Bogota'},
  //  ];
@IonicPage()
@Component({
  selector: 'page-accueil',
  templateUrl: 'accueil.html',
})

export class AccueilPage {
	
	searchQuery: string = '';
  	items: Item[];
    name:string;

  constructor(private myDbService: MyDbService,public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  	this.initializeItems();
    this.name='coco';
  }

  initializeItems() {
    this.items = [] ;
    this.myDbService.tutoList()
      .then((result)=>this.items=result);

  }
  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
  pushNewTuto(){
  	this.insertTuto();
    this.navCtrl.push(NewtutoPage);
   }

  pushTuto(id){
    for (let i=0;i<this.items.length;i++){
      if(id==this.items[i].tutoId){
       this.navCtrl.push(TutoPage,{
        tutoId:this.items[i].tutoId,
        numberSteps:this.items[i].numberSteps
        }) 
      }
    }
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad AccueilPage');
  }

//bar pour effectuer une recherche parmi les tutoriels
  insertTuto(name=this.name){
    var results=[];
    //this.showSucces('on est la insert');
    //creation du tuto
    this.myDbService.insertTuto(name)
    .then(() => 
       this.myDbService.db.executeSql("SELECT * FROM tutoTable",[])
       .then((result)=> {
         for (let i=0;i<result.rows.length;i++ )
           {
             results[i]=result.rows.item(i);
           }
           //this.showSucces(JSON.stringify(results))
         }
         )
       )

    
        }
showSucces(message) {
    let alert = this.alertCtrl.create({
      title: 'Success',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }
}
