import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private baseUrl: string = 'https://reqres.in/api/users';  // ReqRes API URL

  constructor(private http: HttpClient) {}
   // In-memory cache objects
   private usersCache: { [key: number]: { data: User[], total_pages: number } } = {}; 
   private userDetailsCache: { [key: string]: User } = {};
 

  // Method to fetch data with pagination (without search query)
  getData(page: number): Observable<any> {
     // Check if the data is already cached
     if (this.usersCache[page]) {
      // If cached, return it directly
      return of(this.usersCache[page]);
    } else {
      // If not cached, fetch from the API
      const params = new HttpParams().set('page', page.toString());
      return this.http.get<{ data: User[], total_pages: number }>(this.baseUrl, { params }).pipe(
        // Cache the response after fetching
        tap((response) => {
          this.usersCache[page] = response;  // Store in the cache
        })
      );
    }
  }

  // Method to fetch user details by ID
   getUserDetails(userId: string): Observable<any> {
    // Construct the URL with the userId as part of the endpoint
    const params = new HttpParams().set('id', userId);
    return this.http.get<any>(this.baseUrl, { params });
  }
}
