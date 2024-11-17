import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-metric-card',
  templateUrl: './metric-card.component.html',
  styleUrls: ['./metric-card.component.scss'],
})
export class MetricCardComponent {
  @Input() title: string = '';
  @Input() value: number | null = null;
  @Input() unit: string = '';
  @Input() class: string = '';
}
