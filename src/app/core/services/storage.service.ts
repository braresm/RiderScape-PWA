import { Injectable } from '@angular/core';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  async uploadUserProfilImage(file: File, path: string): Promise<string> {
    const storage = getStorage();
    const fileRef = ref(storage, path);

    const uploadSnapshot = await uploadBytes(fileRef, file);
    const downloadUrl = await getDownloadURL(uploadSnapshot.ref);

    return downloadUrl;
  }
}
