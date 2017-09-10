import {Branch} from './branch';
export class Tuto {

	private id: string
	public title: string
	public branchList: Branch[]
	constructor (){
		this.id='tuto' + Math.random().toString(6).substr(2, 9);
		this.title='';
		this.branchList=null;
	}

}