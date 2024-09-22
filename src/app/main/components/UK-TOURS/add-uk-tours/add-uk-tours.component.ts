import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UkToursService } from 'src/app/main/services/uk-tours.service';
import { ImageService } from 'src/app/main/shared/components/image-selector/image.service';

@Component({
  selector: 'app-add-uk-tours',
  templateUrl: './add-uk-tours.component.html',
  styleUrl: './add-uk-tours.component.scss'
})
export class AddUkToursComponent implements OnInit, OnDestroy {
  ukToursForm: FormGroup;
  imageSelectorVisible: boolean = false;
  showLoader: boolean;
  value: string | undefined;

  imageSelectorSubscription?: Subscription;

  isVisibleVal: string;
  isVisibleValPost: boolean;
  id: any;
  routSubscription: Subscription;
  constructor(
    private imageService: ImageService,
    private ukToursService: UkToursService,
    private router: Router,
    private route: ActivatedRoute,
  ) {

  }


  ngOnInit(): void {
    this.showLoader = true;
    this.imageSelectorSubscription = this.imageService.onSelectImage()
      .subscribe({
        next: (selectedImage) => {
          this.ukToursForm.get('featuredImageUrl').setValue(selectedImage.url);
          this.closeImageSelector();
        }
      })
    this.ukToursForm = new FormGroup({
      toursTitle: new FormControl('', Validators.required),
      toursDescription: new FormControl('', Validators.required),
      featuredImageUrl: new FormControl('', Validators.required),
      timeInDays: new FormControl('', Validators.required),
      timeInNight: new FormControl('', Validators.required),
      tourPrice: new FormControl('', Validators.required),
      isVisible: new FormControl(false)
    });
    this.routSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');


        if (this.id) {
          this.ukToursService.getUkTourById(this.id).subscribe((tourData) => {
            this.ukToursForm.patchValue(tourData);
          });
          this.showLoader = false;
        } else {
          this.ukToursForm.reset();
        }
        this.showLoader = false;
      }
    });

  }

  selectStatus(event) {
    if (event.checked[0] == "true") {
      this.ukToursForm.get('isVisible').setValue(true);
    } else {
      this.ukToursForm.get('isVisible').setValue(false);
    }
  }

  onSubmit() {
    this.showLoader = true;
    if (this.ukToursForm.valid) {


      if (this.id) {
        this.ukToursService.updateUkTour(this.id, this.ukToursForm.value).subscribe({
          next: (responseData) => {
            this.ukToursForm.reset();
            this.showLoader = false;
            this.router.navigateByUrl('/main/components/UK-TOURS/uk-tours-list');
          }
        });
      } else {
        this.ukToursService.createUkTours(this.ukToursForm.value).subscribe({
          next: (responseData) => {
            this.ukToursForm.reset();
            this.showLoader = false;
            this.router.navigateByUrl('/main/components/UK-TOURS/uk-tours-list');
          }
        });
      }

    } else {
      this.showLoader = false;
      console.log('Form is invalid');
    }
  }

  openImageSelector(): void {
    this.imageSelectorVisible = true;
  }
  closeImageSelector(): void {
    this.imageSelectorVisible = false;
  }

  ngOnDestroy(): void {
    this.imageSelectorSubscription?.unsubscribe();
    this.routSubscription?.unsubscribe();
  }
}
