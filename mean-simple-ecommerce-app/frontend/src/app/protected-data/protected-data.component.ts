import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-protected-data',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './protected-data.component.html',
  styleUrl: './protected-data.component.css',
})
export class ProtectedDataComponent {
  data: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('http://localhost:3000/api/data').subscribe(
      (response) => this.data = response,
      (error) => console.error('Error fetching data:', error)
    );
  }
}
