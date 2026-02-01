import { Component, AfterViewInit, OnDestroy, Inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements AfterViewInit, OnDestroy {
  activeSection: string = '';
  private observer: IntersectionObserver | null = null;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private cd: ChangeDetectorRef
  ) { }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const options = {
        root: null,
        rootMargin: '-30% 0px -30% 0px', // Detects when section is in the middle 40% of viewport
        threshold: 0
      };

      this.observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.activeSection = entry.target.id;
            this.cd.detectChanges(); // Force UI update
          }
        });
      }, options);

      const sections = document.querySelectorAll('section[id]');
      sections.forEach((section) => {
        this.observer?.observe(section);
      });
    }
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
