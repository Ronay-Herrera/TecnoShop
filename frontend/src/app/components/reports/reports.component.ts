import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/services/report.service'; // Ensure this service exists and is correctly implemented
import { CommonModule } from '@angular/common';
import { Report } from 'src/app/models/report.model';


@Component({
  selector: 'app-report',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class ReportComponent implements OnInit {
  reports: Report[] = [];
  reportForm: FormGroup;

  constructor(private reportService: ReportService, private fb: FormBuilder) {
    this.reportForm = this.fb.group({
      id: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadReports();
  }

  loadReports(): void {
    this.reportService.getReports().subscribe(
      (reports: Report[]) => {
        this.reports = reports;
      },
      (error: any) => {
        console.error('Error fetching reports:', error);
      }
    );
  }

  createReport(): void {
    if (this.reportForm.valid) {
      const newReport: Report = this.reportForm.value;
      this.reportService.createReport(newReport).subscribe(
        (report: Report) => {
          this.reports.push(report);
          this.reportForm.reset();
        },
        (error: any) => {
          console.error('Error creating report:', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }

  deleteReport(_id: string|undefined): void {
    this.reportService.deleteReport(_id).subscribe(
      () => {
        this.reports = this.reports.filter((report) => report._id !== _id);
      },
      (error: any) => {
        console.error('Error deleting report:', error);
      }
    );
  }
}
