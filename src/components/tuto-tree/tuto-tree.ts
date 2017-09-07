import { Component } from '@angular/core';
//import { BranchListProvider} from '../../providers/branch-list/branch-list';
/**
 * Generated class for the TutoTreeComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'tuto-tree',
  templateUrl: 'tuto-tree.html'
})
export class TutoTreeComponent {

//Id du tuto	
	id: string;
//titre du tuto
	title: string;
  constructor(/*public branchList:BranchListProvider*/) {
    console.log('Hello TutoTreeComponent Component');
    this.title = 'Hello World';
    this.id = 'cowboy';

  }

}
