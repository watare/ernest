import {Step} from './step';
export class Branch{

	public id: string;
	public name: string;
	public stepList: Step[];
	constructor (){
		this.id='branch' + Math.random().toString(6).substr(2, 9);
		this.name='';
		this.stepList=[new Step(),
		];
	}
	addStep(){
		var lengthStep=this.stepList.length;
		this.stepList[lengthStep] = new Step();
	}
}