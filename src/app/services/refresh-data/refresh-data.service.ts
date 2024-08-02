// refresh-data.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RefreshDataService {
  private refreshDataSubject = new Subject<void>();

  refreshData$ = this.refreshDataSubject.asObservable();

  notifyRefreshData(): void {
    this.refreshDataSubject.next();
  }
}
