import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './homepage.component';
import { HomePageRoutingModule } from './homepage.routing.module';
import { HomePageService } from './homepage.service';
import { CoreModule } from '../../core/core.module';
import { ShareModule } from '../../share/share.module';

@NgModule({
    imports: [
        CommonModule,
        HomePageRoutingModule,
        CoreModule,
        ShareModule
    ],
    declarations: [
        HomePageComponent
    ],
    providers: [
        HomePageService
    ],
    entryComponents: []
})
export class HomePageModule {
}
