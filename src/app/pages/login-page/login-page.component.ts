import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  registerForm!: FormGroup;
  hide = true;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private userService: UserService, private formBuilder: FormBuilder, private router: Router, private snackBar: MatSnackBar) { }


  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$')]],
    });
  }

  onSubmit() {
     //Exits if form fields are not filled
     if (this.registerForm.invalid) {
      this.snackBar.open('fill everything, fool', 'YES SIR!', { duration: 3000, direction: 'rtl' });
        return;
    }

    var email: string = this.registerForm.get('email')?.value;
    var password: string = this.registerForm.get('password')?.value;
    this.userService.login(email, password).pipe(takeUntil(this.destroy$)).subscribe({
      next: (data: any) => {
        localStorage.setItem('token', data.token)
        console.log('I AM INNNNN!!!')
        this.router.navigate(['/']);
      },
      error: (err) => {
        if(err.error === 'Email and Password did not match.')
          this.snackBar.open('Email and Password did not match.', 'roger that', { duration: 3000, direction: 'rtl' });
        console.log(err.error);
      }
    });
  }

}
