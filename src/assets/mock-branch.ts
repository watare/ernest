
import {Media} from './media';
import {Branch} from './branch';
import {Step} from './step';
/*export class Branch{

	public id: number;
	public name: string;
}

*/
export const MEDIAS: Media[] =[
{id: '132', type:'video'},
{id: '144',type: 'photo'},
{id: '155',type: 'audio'},
]

export const STEPS: Step[] =[
{id: this.id,name: 'toto',mediaList: MEDIAS},
{id: this.id,name: 'toto',mediaList: MEDIAS},
{id: this.id,name: 'toto',mediaList: MEDIAS},
{id: this.id,name: 'toto',mediaList: MEDIAS},
];

export const BRANCHES: Branch[] = [
  { id: this.id, name: 'Mr. Nice',stepList: STEPS },
  { id: this.id, name: 'Narco',stepList:STEPS },
  { id: this.id, name: 'Bombasto' ,stepList:STEPS},
  { id: this.id, name: 'Celeritas' ,stepList:STEPS},
  { id: this.id, name: 'Magneta' ,stepList:STEPS},
  { id: this.id, name: 'RubberMan' ,stepList:STEPS},
  { id: this.id, name: 'Dynama' ,stepList:STEPS},
  { id: this.id, name: 'Dr IQ' ,stepList:STEPS},
  { id: this.id, name: 'Magma' ,stepList:STEPS},
  { id: this.id, name: 'Tornado' ,stepList:STEPS}
];
