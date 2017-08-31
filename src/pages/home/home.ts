import { Component } from '@angular/core';
import { MediaPlugin } from 'ionic-native';
import { NavController, AlertController } from 'ionic-angular';
import { File } from '@ionic-native/file';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

media: MediaPlugin;
constructor(private file: File,public navCtrl: NavController,public alertCtrl: AlertController) {}

createDir(){
  this.file.createDir(this.file.dataDirectory,'violon',true).then(_ => this.showSucces('File created')).catch(err => this.showAlert('File not created'));
  this.file.checkDir(this.file.dataDirectory,'violon').then(_ => this.showSucces('File exists')).catch(err => this.showAlert('File doesn\'t exist'));
}
showAlert(message) {
  let alert = this.alertCtrl.create({
    title: 'Error',
    subTitle: message,
    buttons: ['OK']
  });
  alert.present();
}

showSucces(message) {
  let alert = this.alertCtrl.create({
    title: 'Success',
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

