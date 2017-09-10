import { Component } from '@angular/core';
import { BranchListProvider} from '../../providers/branch-list/branch-list';
import { Branch} from '../../assets/branch';
import {Tuto} from '../../assets/tuto';
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

	tuto: Tuto;

  constructor(public branchListProvider:BranchListProvider) {}

  /*setTitle(){
  	this.tuto.title = 'Hello World';	
  }
  
  setId(){
  	this.tuto.id = 'cowboy';	
  }
  
  addBranch(){
  	this.branchListProvider.getBranch()
    .then (branches=>this.tuto.branchList=branches);	
  }*/
}
