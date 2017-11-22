import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TutoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tuto',
  templateUrl: 'tuto.html',
})
export class TutoPage {


	tutoId:number;
  	numberSteps:number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.tutoId=this.navParams.get("tutoId");
    this.numberSteps=this.navParams.get("numberSteps");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TutoPage');
  }
  nextStep(e){

  }
  previousStep(e){
  	
  }

}
