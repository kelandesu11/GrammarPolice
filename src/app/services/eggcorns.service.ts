import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

import { FirebaseService } from 'src/firefireStore.service';

@Injectable({
  providedIn: 'root'
})
export class EggcornService {


  //variables for eggcorn score
  private eggcornsAlertColor = new BehaviorSubject<string>(" ");
  currentEggcornsAlertColor = this.eggcornsAlertColor.asObservable();

  private eggcornsFeedback = new BehaviorSubject<string>(" ");
  currentEggcornsFeedback = this.eggcornsFeedback.asObservable();

  private eggcornsScore = new BehaviorSubject<number>(0);
  currentEggcornsScore = this.eggcornsScore.asObservable();

  private totalEggcorns = new BehaviorSubject<number>(0);
  currentTotalEggcorns = this.totalEggcorns.asObservable();

    // Passive Voice Error List
    private eggcornsTableSource = new BehaviorSubject<any>(this.testFireBase.getEggcorns());
    currentEggcornsTable = this.eggcornsTableSource.asObservable();

  // this table will contain the user's eggcorn words
  private eggcornsUserTable = new BehaviorSubject<any>({});
  currentEggcornsUserTable = this.eggcornsUserTable.asObservable();

  constructor(
    private testFireBase : FirebaseService
  ) { }

  changeEggcornsScore(eggcornsScore: number) {
    this.eggcornsScore.next(eggcornsScore);
  }

  changeTotalEggcorns(totalEggcorns: number) {
    this.totalEggcorns.next(totalEggcorns);
  }

  changeTable(table: any) {
    this.eggcornsTableSource.next(table);
  }

  changeEggcornsUserTable(eggcornsUserTable: any) {
    this.eggcornsUserTable.next(eggcornsUserTable);
  }

  changeEggcornsFeedback(eggcornsFeedback: string) {
    this.eggcornsFeedback.next(eggcornsFeedback);
  }


  changeEggcornsAlertColor(eggcornsAlertColor: string) {
    this.eggcornsAlertColor.next(eggcornsAlertColor);
  }
}
