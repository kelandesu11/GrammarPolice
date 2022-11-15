import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { FirebaseService } from 'src/firefireStore.service';

@Injectable({
  providedIn: 'root'
})
export class GrammarService {

  //variables for grammar
  private grammarAlertColor = new BehaviorSubject<string>(" ");
  currentGrammarAlertColor = this.grammarAlertColor.asObservable();

  private grammarFeedback = new BehaviorSubject<string>(" ");
  currentGrammarFeedback = this.grammarFeedback.asObservable();

  private grammarScore = new BehaviorSubject<number>(0);
  currentGrammarScore = this.grammarScore.asObservable();

  private totalGrammar = new BehaviorSubject<number>(0);
  currentTotalGrammar = this.totalGrammar.asObservable();

  //this table contains all of the grammartrap words and its fix
  private grammarTable = new BehaviorSubject<any>(this.testFireBase.getGrammar());
  currentGrammarTable = this.grammarTable.asObservable();

  // this table will contain the user's grammartrap words
  private grammarUserTable = new BehaviorSubject<any>({});
  currentGrammarUserTable = this.grammarUserTable.asObservable();

  constructor(private testFireBase : FirebaseService) { }

  changeTotalGrammar(totalGrammar: number) {
    this.totalGrammar.next(totalGrammar);
  }

  changeGrammarTable(table: any) {
    this.grammarTable.next(table);
  }

  changeGrammarUserTable(grammarUserTable: any) {
    this.grammarUserTable.next(grammarUserTable);
  }

  changeGrammarFeedback(grammarFeedback: string) {
    this.grammarFeedback.next(grammarFeedback);
  }

  changeGrammarAlertColor(grammarAlertColor: string) {
    this.grammarAlertColor.next(grammarAlertColor);
  }

  changeGrammarScore(grammarScore: number) {
    this.grammarScore.next(grammarScore);
  }
}

