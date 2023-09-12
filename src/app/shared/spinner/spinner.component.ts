import { Component, inject } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgIf, AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-spinner',
    templateUrl: './spinner.component.html',
    styleUrls: ['./spinner.component.scss'],
    standalone: true,
    imports: [NgIf, MatProgressSpinnerModule, AsyncPipe]
})
export class SpinnerComponent {
  private loadingService = inject(LoaderService)
  loading$ = this.loadingService.loading$;

}
