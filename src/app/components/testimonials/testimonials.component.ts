import { Component, OnInit } from '@angular/core';
import { faSignInAlt} from '@fortawesome/free-solid-svg-icons';
import {Testimonial} from '../../models/testimonial';
import {TestimonialService} from '../../services/testimonial.service';
import {Global} from '../../services/global';
import { OwlModule } from 'ngx-owl-carousel'; 




@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css'],
  providers: [TestimonialService]
})
export class TestimonialsComponent implements OnInit {

  faSignIn = faSignInAlt;
  public testimonials : Testimonial[];
  public url: String;
  pageActual: number =1;
  
  
  constructor(    
  private _testimonialService: TestimonialService) {

    this.url=Global.url;
   }

  ngOnInit(): void {
    this.getTestimonials();
    
  
    
  }
  getTestimonials(){
    this._testimonialService.getTestimonials().subscribe(
      response =>{
        console.log(response);
        if (response.testimonials){
          this.testimonials = response.testimonials;
        }
      },
      error => {
        console.log(<any> error);
      }
    )
  }
  
  

}
