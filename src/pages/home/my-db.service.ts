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
        this.selectStep(2); 
      })
      .catch(e => this.showAlert('fuck'));

      
  }

  insertTuto(title){
  	return new Promise ((resolve,reject)=>
      this.db.executeSql("INSERT INTO tutoTable (title) VALUES (?)",[title])
        .then(() => {
          resolve();
          this.showSucces('insertion reussie');
        })
        .catch(e => this.showAlert('error'))
    )
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
          this.showSucces("selection tuto réussie");
        })
      //this.showSucces(result.rows.item(0).title);})
        .catch(e => this.showAlert('ne fonctionne pas'));
    });
    
    


  }
  
  insertBranch(title, branchTuto){
    return new Promise ((resolve,reject)=>{
      this.db.executeSql("INSERT INTO branchTable (title, branchTuto) VALUES (?,?)",[title,branchTuto])
      .then(() => resolve()/*this.showSucces('insertion reussie')*/)
      .catch(e => this.showAlert('error'));
    })
    
  }
//selection des branches appartenant a un tuto a partir de sa key
  selectBranches(branchTuto): Promise <Number[]>{
    
    return new Promise ((resolve,reject)=>
    {
      this.db.executeSql("SELECT branchId FROM branchTable WHERE branchTuto=?" ,[branchTuto])
      .then((result) => 
        {
          var branchIds = [];
          for (let i=0;i<result.rows.length;i++)
          {
            branchIds[i]=result.rows.item(i).branchId;
          }
          //branchIds[0]=result.rows.length;
          resolve(branchIds);
          this.showSucces("selection branche réussie");
          //this.showSucces(result.rows.length);
        })
      .catch(e => this.showAlert('branch selection ne fonctionne pas'));
    })
    //return 
  }

insertStep(title, stepBranch){
    return new Promise ((resolve,reject)=>{
      this.db.executeSql("INSERT INTO stepTable (title, stepBranch) VALUES (?,?)",[title,stepBranch])
      .then(() => resolve()/*this.showSucces('insertion reussie')*/)
      .catch(e => this.showAlert('error'));
    })
    
  }
//selection des branches appartenant a une branche a partir de sa key
  selectStep(stepBranch): Promise <Number[]>{
    
    return new Promise ((resolve,reject)=>
    {
      this.db.executeSql("SELECT title FROM stepTable WHERE stepBranch=?" ,[stepBranch])
      .then((result) => 
        {
          var stepIds = [];
          for (let i=0;i<result.rows.length;i++)
          {
            stepIds[i]=result.rows.item(i).stepId;
          }
          //branchIds[0]=result.rows.length;
          resolve(stepIds);
          this.showSucces(result.rows.item(0).title);
          //this.showSucces(result.rows.length);
        })
      .catch(e => this.showAlert('step ne fonctionne pas'));
    })
    //return 
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