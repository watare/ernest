import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { AlertController } from 'ionic-angular';
import {Item} from '../assets/item';
import {ItemStep} from '../assets/itemStep';
@Injectable()


export class MyDbService {
	
	private TABLE_NAME: string='data.db';
	private CREATE_TABLE: string='create table if not exists';
	public db : SQLiteObject; 
	
	constructor(private sqlite: SQLite, public alertCtrl: AlertController) {
		//creation ou ouverture de la table
		this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
     .then((db: SQLiteObject) => {
        this.db=db;
        db.executeSql('create table if not exists tutoTable(tutoId INTEGER PRIMARY KEY AUTOINCREMENT,title TEXT,numberSteps INTEGER)',{})
        .then(() => db.executeSql('create table if not exists stepTable(stepId INTEGER PRIMARY KEY AUTOINCREMENT,media TEXT,ordre INTEGER ,stepTuto INTEGER,FOREIGN KEY(stepTuto) REFERENCES tutoTable(tutoId))',{})         
          ).catch(e => this.showAlert('fuck'));
      })
     //.then(()=> this.showSucces(JSON.stringify(this.db)))
      .catch(e => this.showAlert('echec creation table'));

      
  }
/* fonction pour ajouter un tutoriel dans une table existante
le nombre d etape initial est 0
la fonction renvoie une promesse qui permet de detecter les erreurs*/
  insertTuto(title){
  	return new Promise ((resolve,reject)=>
      this.db.executeSql("INSERT INTO tutoTable (title,numberSteps) VALUES (?,?)",[title,0])
        .then(() => {
          //la promesse ne renvoie rien
          resolve();
          //this.showSucces('insertion reussie');
        })
        .catch(e => this.showAlert("erreur lors de l'insertion du tutoriel"))
    )
  }

  //fonction retournant l'ID d'un tutoriel à partir de son titre sous forme de promesse
   selectTuto(tutoId):Promise <number> {
     //si la promesse fonctionne on renvoi la fonction resolve
    return new Promise((resolve, reject)=>{
      this.db.executeSql("SELECT * FROM tutoTable WHERE tutoId=?",[tutoId])
        .then((result) => {
          var numberSteps=result.rows.item(0).numberSteps;
          //definition de la variable à renvoyer
          resolve(numberSteps);
          //this.showSucces("selection tuto réussie");
        })
      //this.showSucces(result.rows.item(0).title);})
        .catch(e => this.showAlert("la sélection du tutoriel a échouée"));
    });

  }
  
  tutoList():Promise<Item[]>{
    return new Promise((resolve, reject)=>{
       var items:Item[]=[];

       this.db.executeSql("SELECT *  FROM tutoTable",[])
       .then((result)=>{
         
         for (let i=0;i<result.rows.length;i++){
           items.push({title:result.rows.item(i).title,
            tutoId:result.rows.item(i).tutoId,
            numberSteps: result.rows.item(i).numberSteps})
         }
         resolve(items);
         //this.showAlert(items[0].title);
       })
         .catch(e=>this.showAlert("mauvaise reception"))
    })
  }
  
  stepList(tutoId):Promise<ItemStep[]>{
    return new Promise((resolve, reject)=>{
      
      var itemSteps:ItemStep[]=[];
      this.db.executeSql("SELECT * FROM stepTable WHERE stepTuto=?",[tutoId])
        .then((result)=>{
          for(let i=0;i<result.rows.length;i++){
            itemSteps.push({stepId: result.rows.item(i).stepId,
              ordre:result.rows.item(i).ordre,
              medias:result.rows.item(i).media
          })
        }
        resolve(itemSteps);
      })
      .catch(e=>this.showAlert("mauvaise reception"))
    })
  }
/*fonction pour ajouter une etape dans la table tutoTable en spécifiant le tableau de medias à ajouter, 
 le tuto auquel elle appartient et l'ordre de l'etape
 a fonction retourne une promesse  ce qui permet de la serialisée*/  
insertStep(medias,tutoId,ordre){
    return new Promise ((resolve,reject)=>{
      var tutoIdOrdre = [tutoId,ordre];
      this.db.executeSql("INSERT INTO stepTable (media, stepTuto,ordre) VALUES (?,?,?)",[medias,tutoId,ordre])
      .then(() => {
      resolve(tutoIdOrdre);
      this.showAlert(tutoIdOrdre[1]);/*this.showSucces('insertion reussie')*/
    })
      .catch(e => this.showAlert('error'))
    })
    
  }
/*fonction qui renvoie l'ensemble des medias contenu dans un tuto dans le bon ordre=> chaque element medias peut être
injecté direcement dans une etape et la fonction ngFor utilisé pour afficher l'ensemble des etapes du tuto*/
  selectSteps(tutoId){
    return new Promise ((resolve,reject)=>{
      this.db.executeSql("SELECT ordre FROM stepTable WHERE stepTuto=? ORDER BY ordre ASC" ,[tutoId])
      .then((result) => 
        {
          var ordres = [];
          for (let i=0;i<result.rows.length;i++)
          {
            ordres[i]=result.rows.item(i).ordre;
          }
          //branchIds[0]=result.rows.length;
          resolve(ordres);
          this.showSucces(JSON.stringify(ordres));
          //this.showSucces(result.rows.length);
        })
      .catch(e => this.showAlert("erreur lors de la récuperation des medias"));

    })
  }

  selectStepMedias(tutoId): Promise <Object>{
    
    return new Promise ((resolve,reject)=>
    {
      this.db.executeSql("SELECT media FROM stepTable WHERE stepTuto=? ORDER BY ordre ASC" ,[tutoId])
      .then((result) => 
        {
          var medias = [];
          for (let i=0;i<result.rows.length;i++)
          {
            medias[i]=result.rows.item(i).media;
          }
          //branchIds[0]=result.rows.length;
          resolve(medias);
          //this.showSucces(JSON.stringify(medias));
          //this.showSucces(result.rows.length);
        })
      .catch(e => this.showAlert("erreur lors de la récuperation des medias"));
    })
    //return 
  }
  /*selection du dernier tuto (celui en cours de creation) et retourne l'iD du tuto
  et le nombre d'étape de ce dernier*/
  selectLastStep(): Promise <Object>{
    return new Promise ((resolve,reject)=>
    {
      this.db.executeSql("SELECT * FROM tutoTable ORDER BY tutoId DESC",[])
        .then((result)=>
          {
            var tutoIdOrdre=[];
            tutoIdOrdre[0]=result.rows.item(0).tutoId;
            tutoIdOrdre[1]=result.rows.item(0).numberSteps;
            resolve(tutoIdOrdre);
            //this.showSucces(JSON.stringify(tutoIdOrdre));
          }
        )
        .catch(e => this.showAlert('echec selection derniere etape'));
    })
  }
/*fonction permettant d'incrementer le nombre detape dans un tuto*/
  incrementTutoStep(tutoId, numberSteps):Promise <Object>{
    return new Promise ((resolve,reject)=>
    {
      //this.db.executeSql("REPLACE  INTO tutoTable  (tutoId,numberSteps) VALUES (?,?)",[tutoId,numberSteps])
      this.db.executeSql("UPDATE tutoTable  SET numberSteps=? WHERE tutoId=?",[numberSteps,tutoId])
        .then(()=>{
          resolve(numberSteps);
          //this.showAlert('youpi');
          }
        )
    }
    )
    .catch(e => this.showAlert('echec incrementation'));
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