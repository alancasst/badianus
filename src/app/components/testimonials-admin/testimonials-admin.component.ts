import { Component, OnInit } from '@angular/core';
import{Testimonial} from '../../models/testimonial';
import {TestimonialService} from '../../services/testimonial.service';
import {UploadService} from '../../services/upload.service';
import{Global} from '../../services/global';
import {faTrash} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-testimonials-admin',
  templateUrl: './testimonials-admin.component.html',
  styleUrls: ['./testimonials-admin.component.css'],
  providers: [TestimonialService,UploadService]
})
export class TestimonialsAdminComponent implements OnInit {

  public title: String;
  public testimonial: Testimonial;
  public status: String;
  public filestoUpload: Array<File>;
  public testimonials : Testimonial[];
  public url: String;
  public confirm: boolean;
  faTrash = faTrash;
  constructor(
    private _testimonialService: TestimonialService,
    private _uploadService: UploadService,
    
    
  ) { 
    this.title = "Añadir Testimonio";
    this.testimonial = new Testimonial('','','','');
    this.url=Global.url;
    this.confirm=false;
  }

  ngOnInit(): void {
    this.getTestimonials();
  }
  onSubmit(form){
  
  this._testimonialService.saveTestimonial(this.testimonial).subscribe(
    response=>{
      if (response.testimonial){
        
        
        
        
        this._uploadService.makeFileRequest(Global.url+"testimonial/upload-file/"+response.testimonial._id,[],this.filestoUpload,'image').then((result:any)=>{
          this.status = 'success';  
          form.reset();
          setTimeout(function() {
          
            $('.alert').fadeOut('fast');
            location.href="https://badianus-bbadd.web.app/testimonios-admin";
        }, 1500);
       
         
        });
      
      }else{
          this.status = 'failed';
      }
      
     
    },
    error =>{
      console.log("NO EXITO BRO");
    }
  );
  }

  fileChangeEvent(fileInput: any){

  this.filestoUpload = <Array<File>>fileInput.target.files;
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
  setConfirm(confirm){
    this.confirm=confirm;
  }
  deleteTestimonial(id){
    this._testimonialService.deleteTestimonial(id).subscribe(
      response =>{
        if (response.testimonial){
          console.log("borrado");
          location.href="https://badianus-bbadd.web.app/testimonios-admin";
        }
      }
     )
    
  }

}
