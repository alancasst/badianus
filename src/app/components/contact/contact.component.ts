import { Component, OnInit } from '@angular/core';
import { faFacebookSquare} from '@fortawesome/free-brands-svg-icons';
import { faInstagram} from '@fortawesome/free-brands-svg-icons';
import { faYoutube} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope} from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp} from '@fortawesome/free-brands-svg-icons';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  faFb=faFacebookSquare;
  faIg=faInstagram;
  faYt=faYoutube;
  faMail=faEnvelope;
  faWhats=faWhatsapp;

  constructor() { }

  ngOnInit(): void {
  }

}
