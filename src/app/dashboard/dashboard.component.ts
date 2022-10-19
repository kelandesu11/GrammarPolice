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
<<<<<<< HEAD
import { AngularFirestore } from "@angular/fire/compat/firestore";
=======
>>>>>>> 37605bc0 (Adds backend for adding rules to the html, and the temp rule table.)

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
    private nominalizations: NominalizationsService,
    private firestore: AngularFirestore) { }

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
    this.activeTable = 'academicstyle';
    this.ruleCards = [];
    for(const fix in this.academicStyleTable.__zone_symbol__value) {
      this.ruleCards.push ({
        rule: fix,
        suggestion: this.academicStyleTable.__zone_symbol__value[fix]
      })
    }
  }

  grammarLoad(): void {
    this.activeTable = 'grammar';
    this.ruleCards = [];
    for(const fix in this.grammarTable.__zone_symbol__value) {
      this.ruleCards.push ({
        rule: fix,
        suggestion: this.grammarTable.__zone_symbol__value[fix]
      })
    }
  }

  nominalizationsLoad(): void {
    this.activeTable = 'norminlizations';
    this.ruleCards = [];
    for(const fix in this.nominalizationsTable.__zone_symbol__value) {
      this.ruleCards.push ({
        rule: fix,
        suggestion: this.nominalizationsTable.__zone_symbol__value[fix]
      })
    }
  }

  eggcornsLoad(): void {
    this.activeTable = 'eggcorns';
    this.ruleCards = [];
    for(const fix in this.eggcornsTable.__zone_symbol__value) {
      this.ruleCards.push ({
        rule: fix,
        suggestion: this.eggcornsTable.__zone_symbol__value[fix]
      })
    }
  }

  wordinessLoad(): void {
    this.activeTable = 'wordiness';
    this.ruleCards = [];
    for(const fix in this.wordinessTable.__zone_symbol__value) {
      this.ruleCards.push ({
        rule: fix,
        suggestion: this.wordinessTable.__zone_symbol__value[fix]
      })
    }
  }

  transitionsLoad(): void {
    this.activeTable = 'transitions';
    this.ruleCards = [];
    for(const fix in this.transitionsTable.__zone_symbol__value) {
      this.ruleCards.push ({
        rule: fix,
        suggestion: this.transitionsTable.__zone_symbol__value[fix]
      })
    }
  }

<<<<<<< HEAD
  passiveLoad(): void {
    this.activeTable = 'passivevoice';
    this.ruleCards = [];
    for(const fix in this.passiveVoiceTable.__zone_symbol__value) {
      this.ruleCards.push ({
        rule: fix,
        suggestion: this.passiveVoiceTable.__zone_symbol__value[fix]
      })
    }
  }

=======
>>>>>>> 37605bc0 (Adds backend for adding rules to the html, and the temp rule table.)
  add(): void {
    this.ruleCards.push({
      rule: this.addRule.get('rule').value, 
      suggestion: this.addRule.get('fix').value
    });
<<<<<<< HEAD
    this.firestore.collection(this.activeTable).add({fixed: this.addRule.get('fix').value, wrong: this.addRule.get('rule').value})
=======
    if(this.activeTable == 'academic'){
      //insert method to add to academicStyleTable
    }
>>>>>>> 37605bc0 (Adds backend for adding rules to the html, and the temp rule table.)
    this.addRule.reset();
  }

  delete(rule: RuleType){
    let deleteArray = [];
    const index = this.ruleCards.indexOf(rule, 0);
    this.ruleCards.splice(index, 1);

      this.firestore.collection(this.activeTable, ref => ref.where("wrong", "==", rule.rule).where("fixed", "==", rule.suggestion)).get()
      .subscribe(ss => {
          ss.docs.forEach(doc => {
            doc.ref.delete();
          })
        }
      )       
  }
}
