import { Component, OnInit, Input, Output, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormControl, Validators, FormsModule } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { AppService } from '../../../core/services/app.service';

@Component({
  selector: 'app-search-gifts-form',
  templateUrl: './search-gifts-form.component.html',
  styleUrls: ['./search-gifts-form.component.scss']
})
export class SearchGiftsFormComponent implements OnInit {

  @Input() eventsOptions: any = [];
  @Input() interestsOptions: any = [];
  @Input() relationshipsOptions: any = [];
  @Input() ageOptions: any = [];

  public eventControl: FormControl;
  public interestControl: FormControl;
  public relationshipControl: FormControl;
  public ageControl: FormControl;
  public eventId: string;

  @ViewChild('input') input: ElementRef;
  @ViewChild('rangeCloud') rangeCloud: ElementRef;
  range: any = 500;

  constructor(private renderer: Renderer2, private appService: AppService) { }

  @ViewChild('popupLogin') popupLogin: ElementRef;
  public modalRef: BsModalRef;

  ngOnInit() {
    this.generateControls();
  }

  coverage() {
    if (typeof this.range === "string" && this.range.length !== 0) {
      return this.range;
    }
    const maxValue = this.input.nativeElement.getAttribute('max');
    const cloudRange = (this.range / maxValue) * 100;
    this.renderer.setStyle(this.rangeCloud.nativeElement, 'left', cloudRange + '%')
  }
  generateControls() {
    this.eventControl = new FormControl(null, Validators.required);
    this.interestControl = new FormControl(null, Validators.required);
    this.relationshipControl = new FormControl(null, Validators.required);
    this.ageControl = new FormControl(null, Validators.required);
  }
  searchProcuts() {
    //this.appService.showFullPageLoader = true;
  }
}
