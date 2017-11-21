import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule,} from 'ionic-angular';
import {ObjectFitImagesModule} from 'heilbaum-ionic-object-fit-images';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TutoPage} from '../pages/tuto/tuto';
import {NewtutoPage} from '../pages/newtuto/newtuto';
import {AccueilPage} from '../pages/accueil/accueil';
import { File} from '@ionic-native/file';
import {MyMediaService} from '../services/my-media.service';
import {MyDbService} from '../services/my-db.service';
import { TutoTreeComponent} from '../components/tuto-tree/tuto-tree';
import { StepComponent} from '../components/step/step';
import { BranchListProvider } from '../providers/branch-list/branch-list';
import { IonicStorageModule } from '@ionic/storage';
import { SQLite } from '@ionic-native/sqlite';
import { Camera } from '@ionic-native/camera';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TutoPage,
    NewtutoPage,
    AccueilPage,
    TutoTreeComponent,
    StepComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    ObjectFitImagesModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    NewtutoPage,
    TutoPage,
    AccueilPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    File,
    SQLite,
    MyMediaService,
    MyDbService,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BranchListProvider,
  ]
})
export class AppModule {}
