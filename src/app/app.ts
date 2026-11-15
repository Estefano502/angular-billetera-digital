import { Component } from '@angular/core';
import { BilleteraComponent } from './componentes/billetera/billetera';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BilleteraComponent],
  templateUrl: './app.html'
})
export class AppComponent {

}