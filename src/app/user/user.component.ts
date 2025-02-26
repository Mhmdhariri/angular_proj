import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DataService } from '../data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user',
  imports: [CommonModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']  // <-- Corrected styleUrls property
})
export class UserComponent implements OnInit {
  user: User | null = null; // Store the user details
  isLoading: boolean = true;
  currentPage: number = 1;  // Store the current page number

  constructor(private route: ActivatedRoute, private dataService: DataService ,private router:Router) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    var page = '1';
    if (typeof window !== 'undefined') {
     page = localStorage.getItem("currentPage")||'1';
    }
    
    if (userId && page) {
      this.currentPage = +page;  // Convert string to number
      this.fetchUserDetails(userId); // Fetch the user details from the API
    }
  }

  // Fetch user details from the API
  fetchUserDetails(userId: string): void {
    this.dataService.getUserDetails(userId).subscribe({
      next: (response) => {
        this.user = response.data; // Set the user data
        this.isLoading = false;  // Set loading to false after data is fetched
      },
      error: (error) => {
        console.error('Error fetching user details', error);
        this.isLoading = false;
      }
    });
  }
   // Programmatic navigation to the user detail page
   redirectToHomePage(): void {
    this.router.navigate(['/']);
  }
}
