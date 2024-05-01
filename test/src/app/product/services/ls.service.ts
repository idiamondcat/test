import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LSService {

  constructor() { }

  getItem(key: string): any {
    return JSON.parse(localStorage.getItem(key)!);
  }

  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
