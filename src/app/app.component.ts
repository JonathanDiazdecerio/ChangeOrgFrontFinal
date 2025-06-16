import { Component , OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { TokenService } from './shared/token.service';
import { AuthStateService } from './shared/auth-state.service';
import { AuthService } from './shared/auth.service';


export class User{
  name!:String;
  email!:String;
} 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit{
  title='fronted';
  isSignedIn!: boolean;
  isLoading = true;
  user: User=new User();
  constructor(private auth: AuthStateService, private router: Router, private token: TokenService, private authService:AuthService){ }

  ngOnInit(): void {
    this.auth.userAuthState.subscribe((val) => {
      this.isSignedIn = val;
      if(this.isSignedIn){
        this.authService.profileUser().subscribe((data:any)=>{
        this.user=data;
        });
    }
      this.isLoading = false;
  });
  }

  signOut(){
    this.token.removeToken();
    this.auth.setAuthState(false);
    this.router.navigate(['/']);
  }
}
