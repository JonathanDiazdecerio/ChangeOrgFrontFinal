import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../shared/auth.service';
import { TokenService } from '../../shared/token.service';
export class User {
  name: any;
  email: any;
}
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  UserProfile!: User;
  constructor(public authService: AuthService, private token: TokenService) {
    this.authService.profileUser().subscribe((data: any) => {
      console.log(data);
      this.UserProfile = data;
    });
  }
  ngOnInit() {}
}
