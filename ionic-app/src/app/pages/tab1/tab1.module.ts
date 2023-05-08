import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { Tab1PageRoutingModule } from './tab1-routing.module';
import { SharedModulesModule } from '../shared-modules/shared-modules.module';

@NgModule({
    declarations: [Tab1Page],
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        Tab1PageRoutingModule,
        SharedModulesModule
    ]
})
export class Tab1PageModule {}
