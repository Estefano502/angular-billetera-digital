import { Component, signal } from '@angular/core';

import {
  NuevoMovimientoComponent
} from '../nuevo-movimiento/nuevo-movimiento';

import {
  Movimiento
} from '../../modelos/movimiento';

@Component({
  selector: 'app-billetera',
  standalone: true,
  imports: [NuevoMovimientoComponent],
  templateUrl: './billetera.html'
})
export class BilleteraComponent {

  saldo = signal<number>(250.00);

  movimientos = signal<Movimiento[]>([]);

  procesarMovimiento(movimiento: Movimiento): void {

    if (
      !Number.isFinite(movimiento.monto) ||
      movimiento.monto <= 0
    ) {
      return;
    }

    if (movimiento.tipo === 'Recarga') {

      this.saldo.update(
        saldoActual => saldoActual + movimiento.monto
      );

    }

    else if (movimiento.tipo === 'Gasto') {

      if (movimiento.monto > this.saldo()) {
        return;
      }

      this.saldo.update(
        saldoActual => saldoActual - movimiento.monto
      );

    } else {
      return;
    }

    this.movimientos.update(
      historial => [movimiento, ...historial]
    );

  }

}