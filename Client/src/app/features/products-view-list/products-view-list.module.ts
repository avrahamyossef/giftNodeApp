import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsViewListComponent } from './products-view-list.component';
import { ProductsViewRoutingModule } from './products-view-list.routing';
import { ProductsViewListService } from './products-view-list.service';
import { CoreModule } from '../../core/core.module';
import { ShareModule } from '../../share/share.module';

@NgModule({
    imports: [
        CommonModule,
        ProductsViewRoutingModule,
        CoreModule,
        ShareModule
    ],
    declarations: [
        ProductsViewListComponent
    ],
    providers: [
        ProductsViewListService
    ],
    entryComponents: []
})
export class ProductViewListModule {
}
