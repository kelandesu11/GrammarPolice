import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { PassivevoiceService } from '../services/passivevoice.service';
import { WordinessService } from '../services/wordiness.service';
import { TransitionsService } from '../services/transitions.service';
import { GrammarService } from '../services/grammar.service';
import { EggcornService } from '../services/eggcorns.service';
import { AcademicStyleService } from '../services/academicstyle.service';
import { NominalizationsService } from '../services/nominalizations.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

type RuleType = { rule: string, suggestion: string }

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // Global global
  message: string;
  ruleCards: Array<RuleType>;
  activeTable: string;
  addRule: any;

  // Passive Voice
  passiveVoiceTable: any;
  passiveVoiceHelperTable: any;
  passiveVoiceUserTable: any;
  // Wordiness
  wordinessTable: any;
  wordinessUserTable: any;
  // Academic Style
  academicStyleTable: any;
  academicStyleUserTable: any;
  // Transitions
  transitionsTable: any;
  transitionsUserTable: any;
  // Grammar
  grammarTable: any;
  grammarUserTable: any;
  // Eggcorns
  totalEggcorns: number;
  eggcornsTable: any;
  eggcornsUserTable: any;
  // Nominalizations
  nominalizationsTable: any;
  nominalizationsUserTable: any;

  constructor(private router: Router,
    private data: DataService,
    private passivevoice: PassivevoiceService,
    private wordiness: WordinessService,
    private transitions: TransitionsService,
    private grammar: GrammarService,
    private eggcorns: EggcornService,
    private academic: AcademicStyleService,
    private nominalizations: NominalizationsService) { }

  ngOnInit(): void {
    this.ruleCards = [];
    this.addRule = new FormGroup({
      'rule': new FormControl('', Validators.required),
      'fix': new FormControl('', Validators.required)
    });
    this.academic.currentAcademicStyleTable.subscribe(academicStyleTable => this.academicStyleTable = academicStyleTable);
    this.wordiness.currentWordinessTable.subscribe(wordinessTable => this.wordinessTable = wordinessTable);
    this.transitions.currentTransitionsTable.subscribe(transitionsTable => this.transitionsTable = transitionsTable);
    this.passivevoice.currentPassiveVoiceTable.subscribe(passiveVoiceTable => this.passiveVoiceTable = passiveVoiceTable);
    this.passivevoice.currentPassiveVoiceHelperTable.subscribe(passiveVoiceHelperTable => this.passiveVoiceHelperTable = passiveVoiceHelperTable);
    this.grammar.currentGrammarTable.subscribe(grammarTable => this.grammarTable = grammarTable);
    this.eggcorns.currentEggcornsTable.subscribe(eggcornsTable => this.eggcornsTable = eggcornsTable);
    this.nominalizations.currentNominalizationsTable.subscribe(nominalizationsTable => this.nominalizationsTable = nominalizationsTable)
  }


  academicLoad(): void {
    this.activeTable = 'academic';
    this.ruleCards = [];
    for(const fix in this.academicStyleTable) {
      this.ruleCards.push ({
        rule: fix,
        suggestion: this.academicStyleTable[fix]
      })
    }
  }

  grammarLoad(): void {
    this.activeTable = 'grammar';
    this.ruleCards = [];
    for(const fix in this.grammarTable) {
      this.ruleCards.push ({
        rule: fix,
        suggestion: this.grammarTable[fix]
      })
    }
  }

  nominalizationsLoad(): void {
    this.activeTable = 'nominalization';
    this.ruleCards = [];
    for(const fix in this.nominalizationsTable) {
      this.ruleCards.push ({
        rule: fix,
        suggestion: this.nominalizationsTable[fix]
      })
    }
  }

  eggcornsLoad(): void {
    this.activeTable = 'eggcorn';
    this.ruleCards = [];
    for(const fix in this.eggcornsTable) {
      this.ruleCards.push ({
        rule: fix,
        suggestion: this.eggcornsTable[fix]
      })
    }
  }

  wordinessLoad(): void {
    this.activeTable = 'wordiness';
    this.ruleCards = [];
    for(const fix in this.wordinessTable) {
      this.ruleCards.push ({
        rule: fix,
        suggestion: this.wordinessTable[fix]
      })
    }
  }

  transitionsLoad(): void {
    this.activeTable = 'transitions';
    this.ruleCards = [];
    for(const fix in this.transitionsTable) {
      this.ruleCards.push ({
        rule: fix,
        suggestion: this.transitionsTable[fix]
      })
    }
  }

  passiveLoad(): void {
    this.activeTable = 'passive';
    this.ruleCards = [];
    for(const fix in this.passiveVoiceTable) {
      this.ruleCards.push ({
        rule: fix,
        suggestion: this.passiveVoiceTable[fix]
      })
    }

    for(const fix in this.passiveVoiceHelperTable) {
      this.ruleCards.push ({
        rule: fix,
        suggestion: this.passiveVoiceHelperTable[fix]
      })
    }
  }

  add(): void {
    this.ruleCards.push({
      rule: this.addRule.get('rule').value, 
      suggestion: this.addRule.get('fix').value
    });
    if(this.activeTable == 'academic'){
      //insert method to add to academicStyleTable
    }
    this.addRule.reset();
  }

  delete(rule: RuleType){
    const index = this.ruleCards.indexOf(rule, 0);
    this.ruleCards.splice(index, 1);
    if(this.activeTable == 'academic'){
      //insert method to remove from academicStyleTable
    }
  }
}
