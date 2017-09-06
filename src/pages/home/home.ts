import { Component } from '@angular/core';
import { MediaPlugin } from 'ionic-native';
import { NavController, AlertController } from 'ionic-angular';
import { File } from '@ionic-native/file';
import {MyMediaService} from './my-media.service';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  //media: MediaPlugin;
  nameMed : string;
  media : MediaPlugin;
  constructor(public mymedia: MyMediaService , private file: File,public navCtrl: NavController,public alertCtrl: AlertController) {
    this.nameMed =this.mymedia.getName();
    this.media = this.mymedia.getMedia();
  }

  //verifie si le fichier a bien ete deplace
  createDir(){
    this.file.checkFile(this.file.dataDirectory+'/',this.nameMed)
      .then(_ => this.showSucces('ça bouge!'))
      .catch(err => this.showAlert('loupe!'));
    }
  //les alertes
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
    
  public startRecording() {
    try {
      this.media.startRecord();
      ///this.showAlert(this.nameMed);
    }
    catch (e) {
      this.showAlert('Could not start recording.');
    }
  }

  public stopRecording() {
    try{
      this.media.stopRecord();
      //setTimeout(this.file.resolveLocalFilesystemUrl(this.nameMed).then(reponse => this.showSucces(reponse)).catch(err =>this.showAlert('fuck')), 5000);
      this.file.checkFile('file:///storage/emulated/0/',this.nameMed)
      .then(_ => this.showSucces('File exists'))
      .catch(err => this.showAlert('File doesn\'t exist'+this.nameMed));

      /*this.file.moveFile('file:///storage/emulated/0/',this.nameMed, this.file.dataDirectory, this.nameMed)
        .then(_ => this.showSucces('so happy'))
        .catch(err => this.showAlert('fuck'));
*/
      //delete this.mymedia;
      //delete this.nameMed;
      //delete this.media;
      //this.mymedia = new MyMediaService;
      //this.media = this.mymedia.getMedia();
      //this.nameMed = this.mymedia.getName();
      
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

