import { Component, computed, inject, signal } from '@angular/core';
import { ClaimItem, ClaimsServices } from './claims-service';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  imports: [DecimalPipe, RouterLink],
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
        this.error.set('ERROR LOADING CLAIMS');
      },
    });
  }

  total = computed(() => this.claims().length)
  approved = computed(() => this.claims().filter((c) => c.status === 'Approved').length)
  pending = computed(()=>this.claims().filter((c) => c.status === 'Pending').length)
  rejected = computed(() => this.claims().filter((c) => c.status === 'Rejected').length)

}
