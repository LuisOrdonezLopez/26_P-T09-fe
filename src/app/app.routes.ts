import { Routes } from '@angular/router';
import { SidebarComponent } from './layout/sidebar/sidebar.component';

import { GarmentFormComponent } from './feature/garment/garment-form/garment-form.component';
import { GarmentListComponent } from './feature/garment/garment-list/garment-list.component';
import { GarmentPageComponent } from './pages/garment-page/garment-page.component';
import { SupplierFormComponent } from './feature/supplier/supplier-form/supplier-form.component';
import { SupplierListComponent } from './feature/supplier/supplier-list/supplier-list.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    {
        path: '',
        component: SidebarComponent,
        children: [
            {
                path: '',
                redirectTo: 'home',
                pathMatch: 'full'
            },
            {
                path: 'home',
                component: HomeComponent
            },
            {
                path: 'garment-form',
                component: GarmentFormComponent
            },
            {
                path: 'garment-list',
                component: GarmentListComponent
            },
            {
                path: 'garment-page',
                component: GarmentPageComponent
            },
            {
                path: 'supplier-form',
                component: SupplierFormComponent
            },
            {
                path: 'supplier-list',
                component: SupplierListComponent
            }
        ]
    }
];