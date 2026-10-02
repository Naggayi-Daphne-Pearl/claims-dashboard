import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ClaimsServices, ClaimStatus } from '../claims-service';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  imports: [RouterLink, ReactiveFormsModule],
  selector: 'app-new-claims',
  styleUrl: './new-claims.css',
  templateUrl: './new-claims.html',
})
export class NewClaimsForm {
  private api = inject(ClaimsServices);
  private fb = inject(NonNullableFormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  error = signal('');
  saving = signal(false);
  id = this.route.snapshot.paramMap.get('id');
  form = this.fb.group({
    member_no: ['', Validators.required],
    member_name: ['', Validators.required],
    type: ['', Validators.required],
    amount: [0, [Validators.required, Validators.min(1)]],
    status: ['Pending' as ClaimStatus],
  });

  constructor() {
    if (this.id) {
      this.api.getClaim(this.id).subscribe({
        next: (d) => {
          this.form.patchValue(d);
        },
        error: () => {
          this.error.set('Claim not found');
        },
      });
    }
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.saving.set(true);
    this.error.set('');
    const values = this.form.getRawValue();
    const request = this.id
      ? this.api.updateClaim(this.id, values)
      : this.api.createClaim({ ...values, submitted_on: new Date().toISOString().slice(0, 10) });

    request.subscribe({
      next: () => this.router.navigate(['/claims']),
      error: () => {
        this.saving.set(false);
        this.error.set('Could not save the claim. Please try again.');
      },
    });
  }
}
