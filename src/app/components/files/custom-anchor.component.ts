import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit
} from '@angular/core';

@Component({
  selector: 'app-anchor',
  template: `
  <a
    #domAnchor
    target="_blank"
    rel="noopener"
    class="list-group-item list-group-item-action">
      {{title}}
    <button
      (click)="deleteFile()"
      class="float-right">
    </button>
  </a>
  `,
})
export class CustomAnchorComponent implements AfterViewInit {
  @Input('file-title') title: string = 'No title.';
  @Input('file-url') url: string = 'https://www.google.com/';
  @ViewChild('domAnchor') anchor: ElementRef;

  ngAfterViewInit() : void {
    const { nativeElement } = this.anchor;
    console.log(this.url);
    nativeElement.href = this.url;
  }

  public deleteFile() : void {
    console.log('Alguien quiso borrar algo.');
  }
}