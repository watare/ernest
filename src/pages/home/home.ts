import { Component } from '@angular/core';
import { MediaPlugin } from 'ionic-native';
import { NavController, AlertController } from 'ionic-angular';
import { File } from '@ionic-native/file';
import {MyMediaService} from './my-media.service';
import { TutoTreeComponent} from '../../components/tuto-tree/tuto-tree';
import {MyDbService} from './my-db.service';
import {TutoPage} from '../tuto/tuto';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  //media: MediaPlugin;
  nameMed : string;
  media : MediaPlugin;
  //private db: SQLiteObject;
  constructor(private myDbService: MyDbService ,public mymedia: MyMediaService , private file: File,public navCtrl: NavController,public alertCtrl: AlertController) {
    this.nameMed =this.mymedia.getName();
    this.media = this.mymedia.getMedia();
  }

  //verifie si le fichier a bien ete deplace
  createDir(){
    this.file.checkFile(this.file.dataDirectory+'/',this.nameMed)
      .then(_ => this.showSucces('ça bouge!'))
      .catch(err => this.showAlert('loupe!'));
  }
 
  insertTuto(){
    //this.showSucces('on est la insert');
    this.myDbService.insertTuto('tata');
  
  }
   selectTuto(){
    this.myDbService.selectTuto('tata')
    .then((result)=>this.showSucces(result));
  }
  showTutoPage() {
    this.navCtrl.push(TutoPage);
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
      .then(_ => this.myMove())
      .catch(err => this.showAlert('File doesn\'t exist'+this.nameMed));
        
      
  }
    catch (e) {
      this.showAlert('Could not stop recording.');
    }
  }
  private myMove() {

    this.file.moveFile('file:///storage/emulated/0/',this.nameMed, 'file:///storage/emulated/0/Ernestdata/', this.nameMed)
        .then(_ => this.release())
        .catch(err => this.showAlert('fuck'));
  }
  private release() {

      delete this.mymedia;
      delete this.nameMed;
      delete this.media;
      this.mymedia = new MyMediaService;
      this.media = this.mymedia.getMedia();
      this.nameMed = this.mymedia.getName();
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

