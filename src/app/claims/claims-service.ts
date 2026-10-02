import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

export type ClaimStatus = 'Pending' | 'Approved' | 'Rejected';
export interface ClaimItem {
  id: string;
  member_no: string;
  member_name: string;
  type: string;
  amount: number;
  status: ClaimStatus;
  submitted_on: string;
}
export type NewClaim = Omit<ClaimItem, "id">
export
@Injectable({ providedIn: 'root' })
class ClaimsServices {
  private http = inject(HttpClient);

  getClaim(id: string) {
    return this.http.get<ClaimItem>(`${environment.apiUrl}/claims/${id}`);
  }
  getAll(){
    return this.http.get<ClaimItem[]>(`${environment.apiUrl}/claims`)
  }
  createClaim(payload: NewClaim){
    return this.http.post<ClaimItem>(`${environment.apiUrl}/claims`, payload)
  }
  deleteClaim(id:string){
    return this.http.delete<void>(`${environment.apiUrl}/claims/${id}`)
  }

  updateClaim(id:string, changes: Partial<ClaimItem>){
    return this.http.patch<ClaimItem>(`${environment.apiUrl}/claims/${id}`, changes)
  }
}
