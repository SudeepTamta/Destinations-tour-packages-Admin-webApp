import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ImageModel } from 'src/app/main/models/image.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  selectedImage: BehaviorSubject<ImageModel> = new BehaviorSubject<ImageModel>({
    id: '',
    fileExtension: '',
    fileName: '',
    title: '',
    url: ''
  })

  constructor(private http: HttpClient) { }

  getAllImages(): Observable<ImageModel[]> {
    const url = environment.baseUrl;
    return this.http.get<ImageModel[]>(`${url}/UkToursImages`);
  }

  uploadImage(file: File, fileName: string, title: string): Observable<ImageModel[]> {
    const url = environment.baseUrl;
    const formData = new FormData;
    formData.append('file', file);
    formData.append('fileName', fileName);
    formData.append('title', title);

    return this.http.post<ImageModel[]>(`${url}/UkToursImages`, formData);
  }

  selectImage(imageModel: ImageModel): void {
    this.selectedImage.next(imageModel);
  }

  onSelectImage(): Observable<ImageModel> {
    return this.selectedImage.asObservable();
  }
}
