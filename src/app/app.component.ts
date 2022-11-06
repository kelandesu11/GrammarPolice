import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth, public auth: AuthService, private router: Router){}

  ngOnInit(): void {}

  logout():void{
    this.afAuth.signOut();
  }
  title = 'Grammark';

  
}

