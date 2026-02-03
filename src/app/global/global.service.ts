import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class GlobalService { 

    setToken(token: string) {
        localStorage.setItem('auth_token', token);
    }

    getToken(): string | null {
        return localStorage.getItem('auth_token');
    }

    setStorageItem(key: string, value: string) {
        localStorage.setItem(key, value);
    }
    getStorageItem(key: string): string | null {
        return localStorage.getItem(key);
    }

}