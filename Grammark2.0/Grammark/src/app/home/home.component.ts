import { stringify } from '@angular/compiler/src/util';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NavigationExtras, Router, RouterLink } from '@angular/router';
import { DataService } from '../data.service';
import { PassivevoiceService } from '../services/passivevoice.service';
import { WordinessService } from '../services/wordiness.service';
import { TransitionsService} from '../services/transitions.service';
import { EggcornService} from '../services/eggcorns.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  message: string;
  grade: number;
  // Passive Voice
  passiveVoiceNumber: number;
  passiveVoiceTable: any;
  passiveVoiceHelperTable: any;
  passiveVoiceUserTable: any;
  // Wordiness
  wordinessNumber: number;
  wordinessTable: any;
  wordinessUserTable: any;

  //var for transitions 
  transitionsFeedback: string = " ";
  transitionsScore: number;
  totalSentences: number;
  totalTransitions: number;
  transitionsTable: any;
  transitionsUserTable: any;
  transitionsAlertColor: any;

  //Eggcorns
  eggcornsFeedback: string = " ";
  eggcornsScore: number;
  totalEggcorns: number;
  eggcornsTable: any;
  eggcornsUserTable: any;
  eggcornsAlertColor: any;

  title = 'OverView';

  constructor(private router : Router, private data: DataService, private passivevoice: PassivevoiceService,
              private wordiness: WordinessService, private transitions: TransitionsService,private eggcorns: EggcornService) { }
  table = { find:[], suggestion:[] };

  submitClick() : void {
    // Reset every time you hit re-highlight
    // this.data.changePassiveVoice(0);
    this.passivevoice.changePassiveVoiceNumber(0);
    this.wordiness.changeWordinessNumber(0);
    this.transitions.resetTransitionFix();
    this.eggcorns.resetEggcornFix();
    // Clear -- Reset
    this.passiveVoiceUserTable = { find:[], suggestion:[] };
    this.wordinessUserTable = { find:[], suggestion:[] };
    this.transitionsUserTable = { find: [], suggestion: [] };
    this.eggcornsUserTable = {find: [], suggestion: [] };
    // variables
    var userText = ( document.getElementById('userinput') as HTMLTextAreaElement).value;
    let aLetter = false;

    // This function checks if there is at least one letter inputed
    var validateChar = function() {
      if (/[a-zA-Z]/.test(userText)) {
        aLetter = true;
      }
    }

    // calling function - checker
    validateChar();

    // alters! or proceed to overview
    if (userText === '') {
      alert('Please fill out the text area');
    }
    else if (aLetter === false) {
      alert('Please enter at least one letter');
    }
    else {
      this.data.changeMessage(userText);
      this.router.navigate(['home/overview']);

      // tslint:disable-next-line: forin
      for (const fix in this.passiveVoiceTable) {

        // tslint:disable-next-line: forin
        for (const helper in this.passiveVoiceHelperTable) {
          // String
          const compareString = helper + fix;

          if (userText.includes(compareString)) {

            // this.data.changePassiveVoice(this.passiveVoiceNumber + 1);
            this.passivevoice.changePassiveVoiceNumber(this.passiveVoiceNumber + 1);
            this.passiveVoiceUserTable.find.push(compareString);
            this.passiveVoiceUserTable.suggestion.push(this.passiveVoiceTable[fix]);
            this.passivevoice.changePassiveVoiceUserTable(this.passiveVoiceUserTable);
          }
        }
      }

      for (const fix in this.wordinessTable) {

        if (userText.includes(fix)) {

          this.wordiness.changeWordinessNumber(this.wordinessNumber + 1);
          this.wordinessUserTable.find.push(fix);
          this.wordiness.changeWordinessUserTable(this.wordinessUserTable);
        }
      }
    }
       //transition fix!!
      this.transitionFix(userText);

      this.eggcornFix(userText);
  }


  ngOnInit(): void {
    // Input Text
    this.data.currentMessage.subscribe(message => this.message = message);
    // Grade
    this.data.currentGrade.subscribe(grade => this.grade = grade);

    // ************************
    // *                      *
    // *     Passive Voice    *
    // *                      *
    // ************************
    this.passivevoice.currentPassiveVoiceNumber.subscribe(passiveVoiceNumber => this.passiveVoiceNumber = passiveVoiceNumber);
    this.passivevoice.currentPassiveVoiceTable.subscribe(passiveVoiceTable => this.passiveVoiceTable = passiveVoiceTable);
    // tslint:disable-next-line: max-line-length
    this.passivevoice.currentPassiveVoiceHelperTable.subscribe(passiveVoiceHelperTable => this.passiveVoiceHelperTable = passiveVoiceHelperTable);
    this.passivevoice.currentPassiveVoiceUserTable.subscribe(passiveVoiceUserTable => this.passiveVoiceUserTable = passiveVoiceUserTable);

    // *********************
    // *                   *
    // *     Wordiness     *
    // *                   *
    // *********************
    this.wordiness.currentWordinessNumber.subscribe(wordinessNumber => this.wordinessNumber = wordinessNumber);
    this.wordiness.currentWordinessTable.subscribe(wordinessTable => this.wordinessTable = wordinessTable);
    this.wordiness.currentWordinessUserTable.subscribe(wordinessUserTable => this.wordinessUserTable = wordinessUserTable);
    // tslint:disable-next-line: max-line-length
    // this.passivevoice.currentPassiveVoiceUserTable2.subscribe(passiveVoiceUserTable2 => this.passiveVoiceUserTable2 = passiveVoiceUserTable2);
    
    // *********************
    // *                   *
    // *    Transitions    *
    // *                   *
    // *********************
    //subscribe to transition service 
    this.transitionService();
  }

  // subscribe to transition variables 
  transitionService(){
    //result color 
    this.transitions.currentTransitionsAlertColor.subscribe(transitionsAlertColor => this.transitionsAlertColor = transitionsAlertColor);

    //Feedback
    this.transitions.currentTransitionsFeedback.subscribe(transitionsFeedback => this.transitionsFeedback = transitionsFeedback);

    // Transitions score
    this.transitions.currentTransitionsScore.subscribe(transitionsScore => this.transitionsScore = transitionsScore);

    // Total number of sentences in the user input
    this.transitions.currentTotalSentences.subscribe(totalSentences => this.totalSentences = totalSentences);

    // Total number of transitions in the user input
    this.transitions.currentTotalTransitions.subscribe(totalTransitions => this.totalTransitions = totalTransitions);

    // Transition Table of all transitions
    this.transitions.currentTransitionsTable.subscribe(transitionsTable => this.transitionsTable = transitionsTable);

    // Transition Table of Current User Errors in Text 
    this.transitions.currentTransitionsUserTable.subscribe(transitionsUserTable => this.transitionsUserTable = transitionsUserTable);
  }

  // this function will calculate the transition score
  transitionFix(userText: string){
    for (const fix in this.transitionsTable) {
      // changing user text to lower Case to match with transitionsTable
      if (userText.toLocaleLowerCase().includes(fix)) {
        this.transitions.changeTotalTransitions(this.totalTransitions + 1);

        // add transition in user text into an array 
        this.transitionsUserTable.find.push(fix);
        this.transitionsUserTable.suggestion.push(this.transitionsUserTable[fix]);
        this.transitions.changeTransitionsUserTable(this.transitionsUserTable);
      }
  }
  //find total sentences in user text 
    for (let i = 0; i < userText.length; i++) {
      if(userText.charAt(i)=== "." || userText.charAt(i)=== "!"|| userText.charAt(i)=== "?"){
        this.transitions.changeTotalSentences(this.totalSentences + 1 );
      } 
    }
  //calcutale score
  this.transitionsScore = (this.totalTransitions/this.totalSentences)*100;
  if(isNaN(this.transitionsScore)  || this.transitionsScore === Infinity){
    this.transitionsScore = 0;
  }
  // round to whole number
  this.transitions.changeTransitionsScore(Math.round(this.transitionsScore));
  // this.transitions.changeTransitionsScore(this.transitionsScore);

  if(this.transitionsScore == 0 ){
    this.transitionsAlertColor = "red";
    this.transitionsFeedback = "Your writing seems to have no transition word";
  }else if (this.transitionsScore <= 10){
    this.transitionsFeedback = "The number of transition words in your writing seems low";
    this.transitionsAlertColor = "orange";
  }else if(this.transitionsScore <= 80){
    this.transitionsFeedback = "Woot! Your writing seems to have a good proportion of transitions";
    this.transitionsAlertColor = "green";
  }else{
    this.transitionsFeedback ="Woot! Your writing seems to have a lot of transitions. Make sure you\'re not overusing transition words";
    this.transitionsAlertColor = "green";
  }
  this.transitions.changeTransitionsFeedback(this.transitionsFeedback);
  this.transitions.changeTransitionsAlertColor(this.transitionsAlertColor);
  

 //Eggcorns

    // *********************
    // *                   *
    // *    Eggcorns       *
    // *                   *
    // *********************
    //subscribe to eggcorn service 
    this.eggcornService();
  }

  // subscribe to eggcorn variables 
  eggcornService(){
    //result color 
    this.eggcorns.currentEggcornsAlertColor.subscribe(eggcornsAlertColor => this.eggcornsAlertColor = eggcornsAlertColor);

    //Feedback
    this.eggcorns.currentEggcornsFeedback.subscribe(eggcornsFeedback => this.eggcornsFeedback = eggcornsFeedback);

    // eggcorn score
    this.eggcorns.currentEggcornsScore.subscribe(eggcornsScore => this.eggcornsScore = eggcornsScore);

    // Total number of sentences in the user input
    this.eggcorns.currentTotalSentences.subscribe(totalSentences => this.totalSentences = totalSentences);

    // Total number of eggcorns in the user input
    this.eggcorns.currentTotalEggcorns.subscribe(totalEggcorns => this.totalEggcorns = totalEggcorns);

    // Eggcorn Table of all eggcorns
    this.eggcorns.currentEggcornsTable.subscribe(eggcornsTable => this.eggcornsTable = eggcornsTable);

    // Eggcorn Table of Current User Errors in Text 
    this.eggcorns.currentEggcornsUserTable.subscribe(eggcornsUserTable => this.eggcornsUserTable = eggcornsUserTable);
  }

  // this function will calculate the eggcorn score
  eggcornFix(userText: string){
    for (const fix in this.eggcornsTable) {
      // changing user text to lower Case to match with transitionsTable
      if (userText.toLocaleLowerCase().includes(fix)) {
        this.eggcorns.changeTotalEggcorns(this.totalEggcorns + 1);

        // add transition in user text into an array 
        this.eggcornsUserTable.find.push(fix);
        this.eggcornsUserTable.suggestion.push(this.eggcornsUserTable[fix]);
        this.eggcorns.changeEggcornsUserTable(this.eggcornsUserTable);
      }
  }
  //find total sentences in user text 
    for (let i = 0; i < userText.length; i++) {
      if(userText.charAt(i)=== "." || userText.charAt(i)=== "!"|| userText.charAt(i)=== "?"){
        this.eggcorns.changeTotalSentences(this.totalSentences + 1 );
      } 
    }
  //calcutale score
  this.eggcornsScore = (this.totalEggcorns/this.totalSentences)*100;
  if(isNaN(this.eggcornsScore)  || this.eggcornsScore === Infinity){
    this.eggcornsScore = 0;
  }
  // round to whole number
  this.eggcorns.changeEggcornsScore(Math.round(this.eggcornsScore));
  // this.transitions.changeTransitionsScore(this.transitionsScore);

  if(this.eggcornsScore == 0 ){
    this.eggcornsAlertColor = "red";
    this.eggcornsFeedback = "Your writing seems to have Eggcorns";
  }else if (this.eggcornsScore <= 10){
    this.eggcornsFeedback = " Good job the number of Eggcorns words in your writing seems low";
    this.eggcornsAlertColor = "orange";
  }else if(this.transitionsScore <= 80){
    this.eggcornsFeedback = "Your writing seems to have alot of eggcorns";
    this.eggcornsAlertColor = "green";
  }else{
    this.eggcornsFeedback ="Woot! Your writing seems to have a lot of eggconss. Make sure you\'re not overusing eggcorns";
    this.eggcornsAlertColor = "green";
  }
  this.eggcorns.changeEggcornsFeedback(this.transitionsFeedback);
  this.eggcorns.changeEggcornsAlertColor(this.transitionsAlertColor);
  }

}


