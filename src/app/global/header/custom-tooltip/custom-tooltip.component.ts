import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-custom-tooltip',
  templateUrl: './custom-tooltip.component.html',
  styleUrls: ['./custom-tooltip.component.scss']
})
export class CustomTooltipComponent implements OnInit {
  // @ts-ignore
  @Input() tooltipText: string;
  tooltipVisible = false;

  x = 0;

  y = 0;
  private timeoutId: any;

  ngOnInit() {
    this.hideTooltipAfterDelay();
  }

  toggleTooltip(event: MouseEvent) {
    event.preventDefault();
    // @ts-ignore
    this.y = (event.target as HTMLElement).getBoundingClientRect().top + (event.target as HTMLElement).clientHeight || 0;
    this.tooltipVisible = !this.tooltipVisible;
    clearTimeout(this.timeoutId);
    if (this.tooltipVisible) {
      this.hideTooltipAfterDelay();
    }
  }

  private hideTooltipAfterDelay() {
    this.timeoutId = setTimeout(() => {
      this.tooltipVisible = false;
    }, 3000);
  }
}
