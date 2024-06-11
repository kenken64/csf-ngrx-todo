import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { firstValueFrom } from 'rxjs';
import { UploadResult } from '../model/upload.result';

@Injectable({
  providedIn: 'root'
})
export class FileuploadService {

  constructor(private httpClient: HttpClient) { }

  getImage(postId: string) {
    return firstValueFrom(
      this.httpClient.get<UploadResult>('/api/v1/get-image/' + postId)
    );
  }

  upload(form :  any , audio: Blob){
    const formData = new FormData();
    formData.set("title", form['task']);
    formData.set("description", form['task']);
    formData.set("audioFile", audio);
    
    return firstValueFrom(this.httpClient.post<UploadResult>("/api/v1/upload",formData));
  }
}