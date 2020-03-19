import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { IndexComponent } from './components/index/index.component';
import { ProductsComponent } from './components/products/products.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { ContactComponent } from './components/contact/contact.component';
import { ErrorComponent } from './components/error/error.component';
import { UsersComponent } from './components/users/users.component';
import { TestimonialsAdminComponent } from './components/testimonials-admin/testimonials-admin.component';
import { NoticesComponent } from './components/notices/notices.component';
import { FilesComponent } from './components/files/files.component'; 
import { ProductsAdminComponent } from './components/products-admin/products-admin.component'; 
import { DetailComponent } from './components/detail/detail.component'; 
import { ReviewsComponent } from './components/reviews/reviews.component'; 
import {AuthGuard} from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { EditComponent } from './components/edit/edit.component';

const appRoutes: Routes = [
    {path: '', component: IndexComponent},
    {path: 'productos', component: ProductsComponent},
    {path: 'testimonios', component: TestimonialsComponent},
    {path: 'testimonios-admin', component: TestimonialsAdminComponent, canActivate:[AuthGuard]},
    {path: 'contacto', component: ContactComponent},
    {path: 'usuarios', component: UsersComponent},
    {path: 'avisos', component: NoticesComponent,canActivate:[AuthGuard]},
    {path: 'documentos', component: FilesComponent,canActivate:[AuthGuard]},
    {path: 'productos-admin', component: ProductsAdminComponent,canActivate:[AuthGuard]},
    {path: 'detalles/:id', component: DetailComponent},
    {path: 'reseñas', component: ReviewsComponent,canActivate:[AuthGuard]},
    {path: 'iniciar-sesion', component: LoginComponent},
    {path: 'editar/:id', component: EditComponent},
    {path: '**',component: ErrorComponent}
];
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);