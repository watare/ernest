import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import {MyDbService} from '../../services/my-db.service';
import { StepComponent} from '../../components/step/step';
import {ItemStep} from '../../assets/itemStep';

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

  @ViewChild(StepComponent) step: StepComponent;

	tutoId:number;
  numberSteps:number;
  steps: ItemStep[];
  count:number;

  constructor(public navCtrl: NavController, public navParams: NavParams,public myDbservice: MyDbService,public alertCtrl: AlertController) {
  	this.steps=[];
    this.tutoId=this.navParams.get("tutoId");
    this.numberSteps=this.navParams.get("numberSteps");
    this.myDbservice.stepList(this.tutoId)
      .then((result)=>{
        this.steps=result;
        //this.showSucces(JSON.stringify(this.steps[1]))
        for(let i=0;i<this.steps.length;i++){
          if(this.steps[i].ordre==1){
            this.step.showStep2(this.steps[i].medias)
            this.step.count=this.step.medias.length;
            this.count=0;
          }
        }

        //this.showSucces(this.steps[0].medias);
      });
          
      

  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad TutoPage');
      
    
  }

  nextStep(e){
    this.showSucces(this.step.stepOrdre);
    if (this.step.stepOrdre<this.numberSteps){
      this.count++;
      this.step.showStep2(this.steps[this.count].medias);
      this.step.count=this.step.medias.length;
    }
  }
  previousStep(e){
  this.showSucces('previousstep!');	
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
