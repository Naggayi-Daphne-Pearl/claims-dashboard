import { Injectable, signal } from '@angular/core';
import { Subject } from 'rxjs';
import { ClaimStatus } from './claims-service';
export interface StatusUpdate ={id:string; status:ClaimStatus }
export type ConnectionStatus = 'connecting' | 'connected' | 'disconnected'
@Injectable({providedIn: 'root'})
export class LiveStatusService{
    connnection = signal<ConnectionStatus> ('connecting')
    updates = new Subject<StatusUpdate>()
    private ws?: WebSocket

    connect(){
        this.connnection.set('connecting')
        this.ws = new WebSocket('ws://localhost:8082')
        this.ws.onopen = () => this.connnection.set('connected')
        this.ws.close = () => this.connnection.set('disconnected')
        this.ws.onmessage =(event) => this.updates.next(JSON.parse(event.data))
    }
    disconnect(){
        this.ws?.close()
    }


}
