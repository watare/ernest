import { Injectable } from '@angular/core';
import { BRANCHES} from '../../assets/mock-branch';
import { Branch} from '../../assets/branch';
//import {MockBranch} from '../../assets/mock-branch'; 

/*
  Generated class for the BranchListProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class BranchListProvider {

  public message : any = "lapiou"
  //a terme le getbranch prend l'id du tuto en parametre
  getBranch(): Promise <Branch[]> {
  	return Promise.resolve(BRANCHES);
  }

    
  }

