import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonService } from './services/common.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-root',
  template: `<main>
    <header class="brand-name">
      <img class="brand-logo" src="/assets/TecnoShop.png" alt="Logo" aria-hidden="true">
      <span class="brand-text">TecnoShop</span>
    </header>
    <section class="content"> 
      <router-outlet></router-outlet>
    </section>
    <footer class="footer">
      <div class="footer-content">
        <p>&copy; {{ currentYear }} TecnoShop. Todos los derechos reservados.</p>
      </div>
    </footer>
  </main>`,
  styleUrls: ['./app.component.css'],
  imports: [RouterModule],
})
export class AppComponent {
  title = 'TecnoShop';
  id: any;
  userForm: any;

  constructor(private newService: CommonService) {  }
  Repdata: any;
  valbutton = "Save";
  errorMessage!: string;

  currentYear: number = new Date().getFullYear(); 
}