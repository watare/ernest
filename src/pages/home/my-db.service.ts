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
        this.db=db;
        db.executeSql('create table if not exists tutoTable(tutoId INTEGER PRIMARY KEY AUTOINCREMENT,title TEXT)',{})
        .then(() => db.executeSql('create table if not exists branchTable(branchId INTEGER PRIMARY KEY AUTOINCREMENT,title TEXT,branchTuto INTEGER,FOREIGN KEY(branchTuto) REFERENCES tutoTable(tutoId))',{})
          .then(() => db.executeSql('create table if not exists stepTable(stepId INTEGER PRIMARY KEY AUTOINCREMENT,title TEXT,stepBranch INTEGER,FOREIGN KEY(stepBranch) REFERENCES tutoTable(branchId))',{})
          )
    	  );
        this.showAlert('tables crees'); 
      })
      .catch(e => this.showAlert('fuck'));

      
  }

  insertTuto(title){
  	
    this.db.executeSql("INSERT INTO tutoTable (title) VALUES (?)",[title])
      .then(() => this.showSucces('insertion reussie'))
      .catch(e => this.showAlert('error'));
  }

  //fonction retournant l'ID d'un tutoriel à partir de son titre sous forme de promesse
   selectTuto(title):Promise <number> {
     //si la promesse fonctionne on renvoi la fonction resolve
    return new Promise((resolve, reject)=>{
      this.db.executeSql("SELECT tutoId FROM tutoTable WHERE title=?",[title])
        .then((result) => {
          var keyId =result.rows.item(0).tutoId;
          //definition de la variable à renvoyer
          resolve(keyId);
        })
      //this.showSucces(result.rows.item(0).title);})
        .catch(e => this.showAlert('ne fonctionne pas'));
    });
    
    


  }
  
  insertBranch(title, branchTuto){
    
    this.db.executeSql("INSERT INTO branchTable (title, branchTuto) VALUES (?,?)",[title,branchTuto])
      .then(() => this.showSucces('insertion reussie'))
      .catch(e => this.showAlert('error'));
  }
//selection des branches appartenant a un tuto a partir de sa key
  selectBranches(branchTuto): Promise <number[]>{
    
    return new Promise ((resolve,reject)=>
    {
      this.db.executeSql("SELECT branchId FROM branchTable WHERE branchTuto=?",[branchTuto])
      .then((result) => 
        {
          var branchIds:number[];
          for (let i=0;i<result.rows.length;i++)
          {
            branchIds[i]=result.rows.item(i).branchId;
          }
          resolve(branchIds);
        })
      .catch(e => this.showAlert('ne fonctionne pas'));
    })
    //return 
  }

  insertStep(title, stepBranch){
    
    this.db.executeSql("INSERT INTO branchTable (title, stepBranch) VALUES (?,?)",[title,stepBranch])
      .then(() => this.showSucces('insertion reussie'))
      .catch(e => this.showAlert('error'));
  }

  selectStep(title){
    this.db.executeSql("SELECT title FROM stepTable WHERE title=?",[title])
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