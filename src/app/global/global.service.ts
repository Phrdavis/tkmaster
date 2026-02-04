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

    clearToken() {
        localStorage.removeItem('auth_token');
    }

    setStorageItem(key: string, value: string) {
        localStorage.setItem(key, value);
    }
    getStorageItem(key: string): string | null {
        return localStorage.getItem(key);
    }

    setDarkModePreference(isDarkMode: boolean) {
        this.setStorageItem('dark_mode', isDarkMode ? 'true' : 'false');
        const element = document.querySelector('html');  
        if (isDarkMode) {
            element?.classList.add('my-app-dark');
        } else {
            element?.classList.remove('my-app-dark');
        }
    }

    toggleDarkMode() {
        const element = document.querySelector('html');
        element?.classList.toggle('my-app-dark');
        this.setStorageItem('dark_mode', this.isDarkMode() ? 'true' : 'false');
    }

    isDarkMode(): boolean {
        const element = document.querySelector('html');
        return element?.classList.contains('my-app-dark') || false;
    }

    initAppState() {
        const darkMode = this.getStorageItem('dark_mode') === 'true';
        this.setDarkModePreference(darkMode);
    }

}