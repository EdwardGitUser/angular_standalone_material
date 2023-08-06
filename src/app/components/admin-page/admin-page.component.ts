import { Component, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { NgFor, NgIf } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css'],
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class AdminPageComponent {
  userList: any;
  dataSource: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['id', 'username', 'email', 'role', 'isActive'];

  constructor(private authService: AuthService) {
    this.loadUsers();
  }

  loadUsers() {
    this.authService.getAllUsers().subscribe((res) => {
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
  updateUser(id: any) {}
}
