import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsViewListComponent } from './products-view-list.component';

const routes: Routes = [
  {
    path: 'products-results',
    component: ProductsViewListComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [RouterModule]
})
export class ProductsViewRoutingModule {
}
