import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {
  registerForm!: FormGroup;
  hide = true;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private userService: UserService, private formBuilder: FormBuilder, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
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

      var name: string = this.registerForm.get('name')?.value;
      var email: string = this.registerForm.get('email')?.value;
      var password: string = this.registerForm.get('password')?.value;
      this.userService.register(name, email, password).pipe(takeUntil(this.destroy$)).subscribe({
        next:  () => {
          console.log('congrats, taking you to login page...');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          if(err.error === 'User with same email already exits.')
            this.snackBar.open('email exist, try to log in', 'roger that', { duration: 3000, direction: 'rtl' });
          console.log(err.error);
        }
      });
    }
}
