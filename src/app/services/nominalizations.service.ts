import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { FirebaseService } from 'src/firefireStore.service';

@Injectable({
  providedIn: 'root'
})
export class NominalizationsService {

  private nominalizationsAlertColorSource = new BehaviorSubject<string>("");
  currentNominalizationsAlertColor = this.nominalizationsAlertColorSource.asObservable();

  private nominalizationsFeedbackSource = new BehaviorSubject<string>("");
  currentNominalizationsFeedback = this.nominalizationsFeedbackSource.asObservable();

  private nominalizationsScoreSource = new BehaviorSubject<number>(0);
  currentNominalizationsScore = this.nominalizationsScoreSource.asObservable();

  private nominalizationsNumberSource = new BehaviorSubject<number>(0);
  currentNominalizationsNumber = this.nominalizationsNumberSource.asObservable();

  private nominalizationsUserTableSource = new BehaviorSubject<any>({});
  currentNominalizationsUserTable = this.nominalizationsUserTableSource.asObservable();

  private nominalizationsTableSource = new BehaviorSubject<any>(this.testFireBase.getNorminlizations());
  currentNominalizationsTable = this.nominalizationsTableSource.asObservable();

  constructor(
    private testFireBase : FirebaseService
  ) { }

  changeNominalizationsAlertColor(nominalizationsAlertColor: string) {
    this.nominalizationsAlertColorSource.next(nominalizationsAlertColor);
  }

  changeNominalizationsFeedback(nominalizationsFeedback: string) {
    this.nominalizationsFeedbackSource.next(nominalizationsFeedback);
  }

  changeNominalizationsScore(nominalizationsScore: number) {
    this.nominalizationsScoreSource.next(nominalizationsScore);
  }

  changeNominalizationsNumber(nominalizationsNumber: number) {
    this.nominalizationsNumberSource.next(nominalizationsNumber);
  }

  changeNominalizationsUserTable(nominalizationsUserTable: any) {
    this.nominalizationsUserTableSource.next(nominalizationsUserTable);
  }

  changeNominalizationsTable(nominalizationsTable: any) {
    this.nominalizationsTableSource.next(nominalizationsTable);
  }
}
