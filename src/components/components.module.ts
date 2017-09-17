import { NgModule } from '@angular/core';
import { TutoTreeComponent } from './tuto-tree/tuto-tree';
import { StepComponent } from './step/step';

@NgModule({
	declarations: [TutoTreeComponent,
    StepComponent],
	imports: [],
	exports: [,
    TutoTreeComponent,
    StepComponent,
    ]
})
export class ComponentsModule {}
