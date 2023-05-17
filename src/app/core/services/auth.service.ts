import { Injectable, inject } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
  user,
} from '@angular/fire/auth';
import { UserData } from '../models/user-data.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth: Auth = inject(Auth);

  user$ = user(this.auth);

  login(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  async register(userData: UserData): Promise<void> {
    // create user account
    const createUserResponse = await createUserWithEmailAndPassword(
      this.auth,
      userData.email,
      userData.password
    );

    // update user display name
    return updateProfile(createUserResponse.user, {
      displayName: userData.fullname,
    });
  }

  updatePhotoUrl(url: string): Promise<void> {
    if (!this.auth.currentUser) {
      throw Error('Cannot retrieve the current user');
    }

    return updateProfile(this.auth.currentUser, {
      photoURL: url,
    });
  }

  logout(): Promise<void> {
    return signOut(this.auth);
  }
}
