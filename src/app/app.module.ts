import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { File} from '@ionic-native/file';
import {MyMediaService} from '../pages/home/my-media.service';
import { TutoTreeComponent} from '../components/tuto-tree/tuto-tree';
import { BranchListProvider } from '../providers/branch-list/branch-list';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TutoTreeComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    File,
    MyMediaService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BranchListProvider,
  ]
})
export class AppModule {}
