import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import {Tuto} from '../../assets/tuto';
import {Branch} from '../../assets/branch';
import {Step} from '../../assets/step';
//import {MediaPlugin} from 'ionic-native';
//import { MediaPlugin } from 'ionic-native';
//import {MyMediaService} from '../home/my-media.service';
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
  //media : MediaPlugin;
  constructor(public navCtrl: NavController, 
  	public navParams: NavParams,public alertCtrl: AlertController,/*public mymedia: MyMediaService*/) {
  //this.media = this.mymedia.getMedia();
  }
  showSucces(message) {
    let alert = this.alertCtrl.create({
      title: 'Success',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TutoPage');
  }
  createTuto(){
  	try{
  		var tuto= new Tuto;
  		//this.showSucces(tuto.id); 		
  }
  	catch (e) {
      this.showSucces('Could not createtuto');
  }

  	try{
  			this.showSucces(tuto.branchList[0].stepList[0].id);
  			tuto.addBranch();
  			
  		}
  		catch(e){
  			this.showSucces('Could not create branch');
  		}
}
}