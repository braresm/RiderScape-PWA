import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PwaService {
  private snackBar = inject(MatSnackBar);

  private promptEvent: any;
  private isInstallVisibleSubject = new BehaviorSubject<boolean>(false);

  isInstallVisible$ = this.isInstallVisibleSubject.asObservable();

  initPwaInstallPrompt() {
    window.addEventListener('beforeinstallprompt', (event: any) => {
      event.preventDefault();
      this.promptEvent = event;
      this.isInstallVisibleSubject.next(true);
    });
  }

  public installPwa() {
    this.promptEvent.prompt();
    this.promptEvent.userChoice.then((choiceResult: { outcome: string }) => {
      const appName = environment.app.name;

      if (choiceResult.outcome === 'accepted') {
        this.snackBar.open(`${appName} have been installed`);
        this.isInstallVisibleSubject.next(false);
      } else {
        this.snackBar.open(`${appName} have not been installed`);
      }

      this.promptEvent = null;
    });
  }
}
