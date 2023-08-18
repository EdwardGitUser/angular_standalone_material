import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { NgFor, NgIf } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Router } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgFor,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class AdminPageComponent implements OnInit, OnDestroy {
  userList: any;
  dataSource: any;
  form: FormGroup = new FormGroup({});
  inputId: string = '';

  private userSubscription: Subscription | undefined;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['id', 'username', 'email', 'role', 'isActive'];

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.loadUsers();
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      inputId: ['', Validators.required],
    });
  }

  loadUsers() {
    this.userSubscription = this.authService.getAllUsers().subscribe((res) => {
      this.userList = res;
      this.dataSource = new MatTableDataSource(this.userList);
      console.log(this.dataSource);
      this.dataSource.paginator = this.paginator;
    });
  }

  //global filter
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  submitForm() {
    if (this.form.valid) {
      const inputId = this.form.get('inputId')!.value;
      this.router.navigate(['/admin-page', inputId]);
    }
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
