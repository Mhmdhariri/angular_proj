import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { DataService } from '../data.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  data: User[] = [];
  filteredData: User[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  isLoading: boolean = true;
  searchTerm: string = ''; // Use string for searchTerm
  noUsersFound: boolean = false;

  constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (typeof window !== 'undefined') {

    // Check if there's a saved page in localStorage
    const savedPage = localStorage.getItem('currentPage');
    if (savedPage) {
      this.currentPage = +savedPage; // Convert string to number
    }
  }
    // Capture the page number from the route params (if any)
    this.route.paramMap.subscribe(params => {
      const page = params.get('page');
      if (page) {
        this.currentPage = +page; // Convert string to number
      }
      this.loadData();
    });
  }

  // Method to load data based on the current page
  loadData(): void {
    this.isLoading = true;
    this.dataService.getData(this.currentPage).subscribe({
      next: (response) => {
        this.data = response.data;
        this.filteredData = this.data; // Initially show all data
        this.totalPages = response.total_pages;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading data', error);
        this.isLoading = false;
      }
    });
  }

  onSearchChange(): void {
    this.isLoading = true;
    this.filteredData = [];

    if (this.searchTerm.trim()) {
      this.filteredData = this.data.filter(user =>
        user.id.toString().includes(this.searchTerm.trim())
      );

      this.noUsersFound = this.filteredData.length === 0;
    } else {
      this.filteredData = this.data;
      this.noUsersFound = false;
    }

    this.isLoading = false;
  }

  // Method to handle page change (pagination)
  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) return; // Prevent invalid pages
    this.isLoading = true;
    this.currentPage = page;
    this.loadData();

    // Store the current page in localStorage
    localStorage.setItem('currentPage', this.currentPage.toString());
    // Update the URL with the new page number
  }

  // Programmatic navigation to the user detail page
  onViewClick(userId: number): void {
    // Store the current page in localStorage before navigating
    localStorage.setItem('currentPage', this.currentPage.toString());
    
    // Navigate to the user page with the current page
    this.router.navigate(['/user', userId]);
  }
}
