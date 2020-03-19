import { Component } from '@angular/core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { Title } from '@angular/platform-browser';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private titleService: Title) {
    titleService.setTitle("Badianus-Labs");
}

  faCoffee = faCoffee;
  title = 'owlcarouselinAngular';  
  Images = ['assets/images/BANNERS/BANNER INICIO_3.jpg', 'assets/images/BANNERS/BANNER INICIO_2.jpg', 'assets/images/BANNERS/BANNER INICIO_3.jpg'];  
  
  SlideOptions = { items: 1, dots: true, nav: true };  
  CarouselOptions = { items: 3, dots: true, nav: true };  
  
}
