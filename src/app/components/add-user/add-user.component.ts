import { Component } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
user:User = {
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
}

  submitted = false;
  constructor(private userService: UserService) {}
  saveUser(): void {
    const data = {
      name: this.user.name,
      prenom: this.user.prenom,
      password: this.user.password,
      email: this.user.email,
      adresse: this.user.adresse,
      poste: this.user.poste,
      situation_familiale: this.user.situation_familiale,
      matricule: this.user.matricule,
      status: this.user.status,
      CNSS: this.user.CNSS,
      date_paiement: this.user.date_paiement,
      periode: this.user.periode,

    };

    this.userService.create(data).subscribe({
      next: (res) => {
        console.log(res);
        this.submitted = true;
      },
      error: (e) => console.error()
    });
  }

  newUser(): void {
    this.submitted = false;
    this.user = {
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
  }
}
