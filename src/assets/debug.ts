import { AlertController } from 'ionic-angular';

export class Debug {

	constructor(public alertCtrl: AlertController){}

	showSucces(message) {
    let alert = this.alertCtrl.create({
      title: 'Success',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  showAlert(message) {
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

}