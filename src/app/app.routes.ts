import { Routes } from '@angular/router';
import { ProductListComponent } from './pages/product/list/list.component';
import { ProductAddComponent } from './pages/product/add/add.component';

export const routes: Routes = [{ path: '', redirectTo: '/products', pathMatch: 'full' },
{ path: 'products', component: ProductListComponent },
{ path: 'product/create', component: ProductAddComponent },
{ path: 'product/view/:id', component: ProductAddComponent },
];
