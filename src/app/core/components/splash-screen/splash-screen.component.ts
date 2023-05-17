import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.scss'],
})
export class SplashScreenComponent implements OnInit {
  windowWidth!: string;
  showSplashScreen: boolean = true;

  ngOnInit(): void {
    setTimeout(() => {
      this.windowWidth = '-' + window.innerWidth + 'px';

      setTimeout(() => {
        this.showSplashScreen = !this.showSplashScreen;
      }, environment.app.splashScreen.animationDuration * 1000);
    }, environment.app.splashScreen.duration * 1000);
  }
}
