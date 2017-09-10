import {Media} from './media';

export class Step{

	public id: string;
	public name: string;
	public mediaList: Media[]
	constructor (){
		this.id='step' + Math.random().toString(6).substr(2, 9);
		this.name=null;
		this.mediaList=null;
	}
}
