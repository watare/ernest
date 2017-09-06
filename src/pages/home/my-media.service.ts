import { MediaPlugin } from 'ionic-native';
import { Injectable } from '@angular/core';

@Injectable()
//initialisation du media avec un nom aleatoire
export class MyMediaService {
  
	nameMed: string
	media: MediaPlugin
	constructor(){
		this.nameMed= this.Id();
		this.media = new MediaPlugin(this.nameMed);

	}
private  Id(){
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return '_' + Math.random().toString(6).substr(2, 9);

  
}

getMedia() { return this.media }
getName() { return this.nameMed }
}