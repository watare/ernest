import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TutoPage} from '../pages/tuto/tuto';
import { File} from '@ionic-native/file';
import {MyMediaService} from '../pages/home/my-media.service';
import {MyDbService} from '../pages/home/my-db.service';
import { TutoTreeComponent} from '../components/tuto-tree/tuto-tree';
import { BranchListProvider } from '../providers/branch-list/branch-list';
import { IonicStorageModule } from '@ionic/storage';
import { SQLite } from '@ionic-native/sqlite';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TutoPage,
    TutoTreeComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TutoPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    File,
    SQLite,
    MyMediaService,
    MyDbService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BranchListProvider,
  ]
})
export class AppModule {}
