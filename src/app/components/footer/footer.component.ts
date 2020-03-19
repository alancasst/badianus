import { Component, OnInit } from '@angular/core';
import { faFacebookSquare} from '@fortawesome/free-brands-svg-icons';
import { faInstagram} from '@fortawesome/free-brands-svg-icons';
import { faYoutube} from '@fortawesome/free-brands-svg-icons';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  faFb=faFacebookSquare;
  faIg=faInstagram;
  faYt=faYoutube
  constructor() { }

  ngOnInit(): void {
  }

}
