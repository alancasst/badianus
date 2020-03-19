import { Component, OnInit } from '@angular/core';
import{Review} from '../../models/review';
import {ReviewService} from '../../services/review.service';
import{Global} from '../../services/global';
import {faTrash} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css'],
  providers: [ReviewService]
})
export class ReviewsComponent implements OnInit {

  public title: String;
  public review: Review;
  public status: String;
  public filestoUpload: Array<File>;
  public reviews : Review[];
  public url: String;
  public confirm: boolean;
  faTrash = faTrash;
  todayString : string = new Date().toDateString();

  constructor(
    private _reviewService: ReviewService,
  ) {
    this.url=Global.url;
    this.confirm=false;
   }

  ngOnInit(): void {

    this.getReviews();
  }
  getReviews(){
    this._reviewService.getReviews().subscribe(
      response =>{
        console.log(response);
        if (response.reviews){
          this.reviews = response.reviews;
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
  deleteReview(id){
    this._reviewService.deleteReview(id).subscribe(
      response =>{
        if (response.review){
          console.log("borrado");
          location.href="http://localhost:4200/reseñas";
        }
      }
     )
    
  }

}
