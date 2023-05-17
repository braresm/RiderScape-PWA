import { Component, inject } from '@angular/core';
import { PwaService } from '../../services/pwa.service';

@Component({
  selector: 'app-pwa-install',
  templateUrl: './pwa-install.component.html',
  styleUrls: ['./pwa-install.component.scss'],
})
export class PwaInstallComponent {
  private pwaService = inject(PwaService);

  isInstallNotiticationVisible$ = this.pwaService.isInstallVisible$;

  onInstallPwa(): void {
    this.pwaService.installPwa();
  }
}
