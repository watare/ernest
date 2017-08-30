import { Component } from '@angular/core';
import { MediaPlugin } from 'ionic-native';
import { NavController, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

media: MediaPlugin;
constructor(public navCtrl: NavController,public alertCtrl: AlertController) {}
showAlert(message) {
  let alert = this.alertCtrl.create({
    title: 'Error',
    subTitle: message,
    buttons: ['OK']
  });
  alert.present();
}
ionViewDidEnter(){

this.media = new MediaPlugin('toto.3gp');	

}		

  
  public startRecording() {
  try {
    this.media.startRecord();
  }
  catch (e) {
    this.showAlert('Could not start recording.');
  }
}

public stopRecording() {
  try {
    this.media.stopRecord();
  }
  catch (e) {
    this.showAlert('Could not stop recording.');
  }
}

public startPlayback() {
  try {
    this.media.play();
  }
  catch (e) {
    this.showAlert('Could not play recording.');
  }
}

public stopPlayback() {
  try {
    this.media.stop();
  }
  catch (e) {
    this.showAlert('Could not stop playing recording.');
  }
}
}

