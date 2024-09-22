import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { ImageModel } from 'src/app/main/models/image.model';
import { ImageService } from './image.service';

@Component({
  selector: 'app-image-selector',
  templateUrl: './image-selector.component.html',
  styleUrl: './image-selector.component.scss'
})
export class ImageSelectorComponent implements OnInit {
  private file?: File;
  fileName: string = "";
  title: string = "";

  images$?: Observable<ImageModel[]>;

  @ViewChild('form', { static: false }) imageUploadForm?: NgForm;

  constructor(
    private imageService: ImageService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getImages();
  }



  onFileUploadChange(event: Event): void {

    const element = event.currentTarget as HTMLInputElement;
    this.file = element.files?.[0];
    this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode' });
  }


  uploadImage(): void {

    if (this.file && this.fileName !== '' && this.title !== '') {
      this.imageService.uploadImage(this.file, this.fileName, this.title)
        .subscribe({
          next: (response) => {
            console.log(response)
            this.imageUploadForm?.resetForm();
            this.getImages();
          }
        })
    }
  }

  selectImage(image: ImageModel): void {
    console.log(image)
    this.imageService.selectImage(image);
  }

  private getImages(): void {
    this.images$ = this.imageService.getAllImages();
  }

}
