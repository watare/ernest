import { Component } from '@angular/core';
import {Media} from '../../assets/media';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { NavController, AlertController } from 'ionic-angular';
import {Description} from '../../assets/description';
import {Debug} from '../../assets/debug';
import {MyDbService} from '../../services/my-db.service';
/**
 * Generated class for the StepComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
 /*export const MEDIAS: Media[] =[
{id: 'https://i.skyrock.net/8256/48178256/pics/2117655687_1.jpg', type:'video',selected: true},
{id: 'http://fr.web.img5.acsta.net/videothumbnails/14/10/28/14/29/441515.jpg',type: 'photo',selected: false},
{id: 'http://images2.fanpop.com/image/photos/9000000/Baby-Bear-sweety-babies-9050355-500-375.jpg',type: 'audio',selected: false},
]

 export const MEDIUS: Media[] =[
{id: 'https://i.skyrock.net/8256/48178256/pics/2117655687_1.jpg', type:'video',selected: true},
{id: 'http://fr.web.img5.acsta.net/videothumbnails/14/10/28/14/29/441515.jpg',type: 'photo',selected: false},
]

export const MEDIOS: Media[]=[]
*/



@Component({
  selector: 'step',
  templateUrl: 'step.html'
})


//classe permettant l'affichage d'une etape
export class StepComponent {

  //tableau contenant les lignes de description de l'etape
  descriptions:Description[]
  //tableau contenant l'url des medias de l'etape
  medias: Media[]
  //pour tests
  medias2: Media[]
  // variable permettant de faire des affichages conditionnels. incrementation en fonction du nombre de media dans medias
  count:number;
  debug:Debug;
  //objet pour sqlite
  mediaSq:string;
  //objet definnissant les options de la camera. Permet egalement de prendre des videos et d'acceder a la gallerie photo/video
  options: CameraOptions = {
  quality: 60,
  destinationType: this.camera.DestinationType.FILE_URI,
  encodingType: this.camera.EncodingType.JPEG,
  mediaType: this.camera.MediaType.PICTURE
};

  //en parametre le constructor prend le provider camera, les alertes et l'acces au fichier
  constructor(private myDbService: MyDbService, private camera: Camera,private file: File) {
  	console.log('Hello StepComponent Component');
    //initialisation des variables.Pour rappel il est impossible  d'ajouter des variables dans un tableau sans l'avoir cree []
    this.medias=[];
    //boucle pour modifier count en fonction du nombre de variable dans medias
    	if (this.medias.length<1){
    		this.count=0;
    	}else{
    		this.count=this.medias.length;
    	}
      this.descriptions=[];
      this.descriptions.push(new Description);
  }
  //affichage de la photo de la galerie selectionne/tap
	tapEvent(id) {
	    for (let i=0;i<this.medias.length;i++){
	    	if (this.medias[i].id==id){
				this.medias[i].selected=true;
	    	}
	    	else {
	    		this.medias[i].selected=false;
	    	}
		}

	}


  //fonction permettant de prendre une photo et qui retourne le chemin de l'image.
  //la fonction split permet de separer le chemin du nom du fichier. retourn un tableau
  //la fonction pop recupere le dernier element d'un tableau et le supprime de ce meme tableau
	takePicture(){
    var splitted: string[];
    var name: string;
    var url: string

		 this.camera.getPicture(this.options).then((imageData) => {
       splitted=imageData.split('/');
       name=splitted.pop();
       url=splitted.join('/');
       this.myMove(url,name)
       .then(()=>{
         this.medias.push({id:'file:///storage/emulated/0/Ernestdata/'+ name,type: 'photo',selected: false});
         this.count++;
         this.mediaSq=this.toJson(this.medias);
         this.medias2=eval("(" + this.mediaSq + ")");
         this.myDbService.insertStep(this.mediaSq,2);
         this.myDbService.selectStep(2);
       })
       
       
       //this.myMove(imageData);
	 	//let base64Image = 'data:image/jpeg;base64,' + imageData;
		}, (err) => {
	 	// Handle error
		});
	}
  //fonction a deplacer dans une autre classe generique
  myMove(originalpath,name){
      return new Promise ((resolve,reject)=>
    this.file.moveFile(originalpath+"/",name,'file:///storage/emulated/0/Ernestdata/',name)
        .then(_ => resolve())
        )
        .catch(err => this.debug.showAlert('fuck'))

  }
  //fonction permettant d'ajouter une nouvelle ligne de description
  addDescription(){
    this.descriptions.push(new Description);
  }
  toJson(obj){
    return JSON.stringify(obj);
  }
}
