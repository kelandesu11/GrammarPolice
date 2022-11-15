import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { FirebaseService } from 'src/firefireStore.service';

@Injectable({
  providedIn: 'root'
})
export class PassivevoiceService {

  private passiveVoiceAlertColorSource = new BehaviorSubject<string>(" ");
  currentPassiveVoiceAlertColor = this.passiveVoiceAlertColorSource.asObservable();

  private passiveVoiceFeedbackSource = new BehaviorSubject<string>(" ");
  currentPassiveVoiceFeedback = this.passiveVoiceFeedbackSource.asObservable();

  private passiveVoiceScoreSource = new BehaviorSubject<number>(0);
  currentPassiveVoiceScore = this.passiveVoiceScoreSource.asObservable();

  // Passive Voice Number of Errors
  private passiveVoiceNumberSource = new BehaviorSubject<number>(0);
  currentPassiveVoiceNumber = this.passiveVoiceNumberSource.asObservable();

  // Passive Voice Error List
  private passiveVoiceTableSource = new BehaviorSubject<any>(this.testFireBase.getPassiveVoice());
  currentPassiveVoiceTable = this.passiveVoiceTableSource.asObservable();

  // Passive Voice Helper List
  private passiveVoiceHelperTableSource = new BehaviorSubject<any>({
    ' is': '',
    ' isn\'t': '',
    ' is not': '',
    ' \'s': '',
    ' \'s not': '',
    ' are': '',
    ' aren\'t': '',
    ' are not': '',
    ' \'re': '',
    ' \'re not': '',
    ' was': '',
    ' wasn\'t': '',
    ' was not': '',
    ' were': '',
    ' weren\'t': '',
    ' were not': '',
    ' be': '',
    ' being': '',
    ' having': '',
    ' been': '',
  });
  currentPassiveVoiceHelperTable = this.passiveVoiceHelperTableSource.asObservable();

  // Passive Voice Current User Errors
  private passiveVoiceUserTableSource = new BehaviorSubject<any>({});
  currentPassiveVoiceUserTable = this.passiveVoiceUserTableSource.asObservable();

  constructor(
    private testFireBase : FirebaseService
  ) { }

  changePassiveVoiceAlertColor(passiveVoiceAlertColor: string) {
    this.passiveVoiceAlertColorSource.next(passiveVoiceAlertColor);
  }

  changePassiveVoiceFeedback(passiveVoiceFeedback: string) {
    this.passiveVoiceFeedbackSource.next(passiveVoiceFeedback);
  }

  changePassiveVoiceScore(passiveVoiceScore: number) {
    this.passiveVoiceScoreSource.next(passiveVoiceScore);
  }

  changePassiveVoiceNumber(passiveVoiceNumber: number) {
    this.passiveVoiceNumberSource.next(passiveVoiceNumber);
  }

  changePassiveVoiceTable(passiveVoiceTable: any) {
    this.passiveVoiceTableSource.next(passiveVoiceTable);
  }

  changePassiveVoiceHelperTable(passiveVoiceHelperTable: any) {
    this.passiveVoiceHelperTableSource.next(passiveVoiceHelperTable);
  }

  changePassiveVoiceUserTable(passiveVoiceUserTable: any) {
    this.passiveVoiceUserTableSource.next(passiveVoiceUserTable);
  }
}
