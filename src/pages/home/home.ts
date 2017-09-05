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
nameMed : string;
constructor(private file: File,public navCtrl: NavController,public alertCtrl: AlertController) {}

Id(){
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return '_' + Math.random().toString(6).substr(2, 9);
}
createDir(){
  this.file.createDir('/data','violon',true).then(_ => this.showSucces('File created')).catch(err => this.showAlert('File not created'));
  this.file.checkDir('/data','violon').then(_ => this.showSucces('File exists')).catch(err => this.showAlert('File doesn\'t exist'));
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
  
  this.nameMed =this.Id() + '.wav';
  this.showSucces(this.file.externalRootDirectory+this.nameMed); 
  this.media = new MediaPlugin(this.file.externalRootDirectory+this.nameMed);

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
  try{
    this.media.stopRecord();
    setTimeout(this.file.resolveLocalFilesystemUrl(this.nameMed).then(reponse => this.showSucces(reponse)).catch(err =>this.showAlert('fuck')), 5000);
    this.file.checkDir('/data',this.nameMed).then(_ => this.showSucces('File exists')).catch(err => this.showAlert('File doesn\'t exist'));
    //this.file.checkDir(this.file.dataDirectory,'lapin').then(_ => this.showSucces('File exists')).catch(err => this.showAlert('File doesn\'t exist'));
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

