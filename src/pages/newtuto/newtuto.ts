import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,Slides } from 'ionic-angular';
import { StepComponent} from '../../components/step/step';
import {MyDbService} from '../../services/my-db.service';
/**
 * Generated class for the NewtutoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-newtuto',
  templateUrl: 'newtuto.html',
})
export class NewtutoPage {
	@ViewChild(Slides) slides: Slides;
	@ViewChild(StepComponent) step: StepComponent;
	count=1;
  constructor(private myDbService: MyDbService,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewtutoPage');
  }

  newStep(){
  	this.step.saveStep();
  	this.navCtrl.push(NewtutoPage);
  }
  nextStep(e){
    this.myDbService.selectLastStep().then(result=>{
      if (result[1]>0){
    this.step.showStep(this.step.tutoId,this.step.stepOrdre+1);
    this.step.stepOrdre=this.step.stepOrdre+1;

    }else{
      this.step.showAlert('pas de nextStep');
    }
    })
    

  }
  previousStep(e){
    var id= this.step.tutoId;
    var ordre=this.step.stepOrdre;
    this.step.showAlert(ordre)
    this.step.showAlert(id)
      if (ordre>0){
    this.step.showStep(id,ordre-1);
    this.step.stepOrdre=ordre-1;
    }else{
      this.step.showAlert('pas de previousStep');
    }
  }

}
