import {Component, Input} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent {
  @Input() viewMode = false;

  @Input() currentUser: User = {
    name: '',
    prenom: '',
    password: '',
    email: '',
    adresse: '',
    poste: '',
    situation_familiale: '',
    matricule: '',
    status: '',
    CNSS: '',
    date_paiement: new Date(),
    periode: new Date()
  };

  message = '';

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getUser(this.route.snapshot.params['id']);
    }
  }

  getUser(id: string): void {
    this.userService.get(id).subscribe({
      next: (data) => {
        this.currentUser = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }

  updateUser(): void {
    this.message = '';

    this.userService
      .update(this.currentUser.id, this.currentUser)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message
            ? res.message
            : 'This User was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  deleteUser(): void {
    this.userService.delete(this.currentUser.id).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/users']);
      },
      error: (e) => console.error(e)
    });
  }
}
