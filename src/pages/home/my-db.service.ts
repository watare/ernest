import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { AlertController } from 'ionic-angular';


@Injectable()


export class MyDbService {
	
	private TABLE_NAME: string='data.db';
	private CREATE_TABLE: string='create table if not exists';
	private db : SQLiteObject; 
	
	constructor(private sqlite: SQLite, public alertCtrl: AlertController) {
		//creation ou ouverture de la table
		this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
    this.db=db; db.executeSql('create table if not exists tutoTable(tutoId INTEGER PRIMARY KEY AUTOINCREMENT,title TEXT)',{})
    .then(() => db.executeSql('create table if not exists branchTable(BranchId INTEGER PRIMARY KEY AUTOINCREMENT,title TEXT,branchTuto INTEGER,FOREIGN KEY(branchTuto) REFERENCES tutoTable(tutoId))',{})
    .then(() => db.executeSql('create table if not exists stepTable(stepId INTEGER PRIMARY KEY AUTOINCREMENT,title TEXT,stepBranch INTEGER,FOREIGN KEY(stepBranch) REFERENCES tutoTable(branchId))',{}))
    	)
    	; this.showAlert('tables crees'); })
      .catch(e => this.showAlert('fuck'));

      
  }



  insertTuto(title){
  	
    this.db.executeSql("INSERT INTO tutoTable (title) VALUES (?)",[title])
    .then(() => this.showSucces('insertion reussie'))
    .catch(e => this.showAlert('insert into tutoTable (title) values ('+ title +')'));
  }
   selectTuto(title){
    var a;
    this.db.executeSql("SELECT title FROM tutoTable WHERE title=?",[title])
    .then((result) => this.showSucces(result.rows.item(0).title))
    .catch(e => this.showAlert('ne fonctionne pas'));
    //return a
  }
  getDb(){return this.db};

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
}