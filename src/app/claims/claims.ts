import { Component, inject, signal } from '@angular/core';
import { ClaimItem, ClaimsServices } from './claims-service';

@Component({
  imports: [],
  selector: 'app-claims',
  styleUrl: './claims.css',
  templateUrl: './claims.html',
})
export class Claims {
  private api = inject(ClaimsServices);

  claims = signal<ClaimItem[]>([]);
  loading = signal(true);
  error = signal('');

  constructor() {
    this.load();
  }
  load() {
    this.loading.set(true);
    this.error.set('');
    this.api.getAll().subscribe({
      next: (d) => {
        this.claims.set(d);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('ERROR LOADING CLAIMS')
      }
    });
  }
}
