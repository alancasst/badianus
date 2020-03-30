import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import{FormsModule,ReactiveFormsModule} from '@angular/forms';
import {routing,appRoutingProviders} from './app.routing';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './components/index/index.component';
import { ProductsComponent } from './components/products/products.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { TestimonialsAdminComponent } from './components/testimonials-admin/testimonials-admin.component';
import { ContactComponent } from './components/contact/contact.component';
import { ErrorComponent } from './components/error/error.component';
import { OwlModule } from 'ngx-owl-carousel';
import { UsersComponent } from './components/users/users.component';
import { NoticesComponent } from './components/notices/notices.component';
import { FilesComponent } from './components/files/files.component';
import { ProductsAdminComponent } from './components/products-admin/products-admin.component';
import { DetailComponent } from './components/detail/detail.component';
import { ReviewsComponent } from './components/reviews/reviews.component'; 
import {NgxPaginationModule} from 'ngx-pagination';
import{AuthGuard} from './guards/auth.guard';
import{AuthService} from './services/auth.service';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FooterComponent } from './components/footer/footer.component';
import { EditComponent } from './components/edit/edit.component';
import { ajax} from "jquery";
import { AngularFireStorageModule} from "@angular/fire/storage";
import { environment} from "../environments/environment";
import { AngularFireModule } from '@angular/fire';





@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    ProductsComponent,
    TestimonialsComponent,
    ContactComponent,
    TestimonialsAdminComponent,
    ErrorComponent,
    UsersComponent,
    NoticesComponent,
    FilesComponent,
    ProductsAdminComponent,
    DetailComponent,
    ReviewsComponent,
    NavBarComponent,
    LoginComponent,
    FooterComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    routing,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    OwlModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    CarouselModule ,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebase)
    
  ],
  providers: [
    appRoutingProviders,
    AuthGuard,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
