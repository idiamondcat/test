import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './product/components/header/header.component';
import { LSService } from './product/services/ls.service';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';

registerLocaleData(localeRu);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title: string = 'app';
  employees: string[] = ['Петр', 'Алексей', 'Анна', 'Дмитрий', 'Кристина'];

  constructor(private lsservice: LSService) {}

  ngOnInit(): void {
    this.lsservice.setItem('employees', this.employees)
  }
}
