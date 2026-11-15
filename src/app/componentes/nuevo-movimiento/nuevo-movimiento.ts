import { Component, input, output } from '@angular/core';

import { Movimiento, TipoMovimiento } from '../../modelos/movimiento';

@Component({
  selector: 'app-nuevo-movimiento',
  standalone: true,
  templateUrl: './nuevo-movimiento.html'
})
export class NuevoMovimientoComponent {

  saldo = input.required<number>();

  movimientoRegistrado = output<Movimiento>();

  tipo: TipoMovimiento = 'Recarga';
  monto: number | null = null;

  cambiarTipo(event: Event): void {
    const valor = (event.target as HTMLSelectElement).value;

    this.tipo = valor as TipoMovimiento;
  }

  cambiarMonto(event: Event): void {
    const valor = (event.target as HTMLInputElement).value;

    this.monto = valor.trim() === '' ? null : Number(valor);
  }

  montoValido(): boolean {
    return (
      this.monto !== null &&
      Number.isFinite(this.monto) &&
      this.monto > 0
    );
  }

  saldoInsuficiente(): boolean {
    return (
      this.tipo === 'Gasto' &&
      this.montoValido() &&
      this.monto! > this.saldo()
    );
  }

  puedeRegistrar(): boolean {
    return this.montoValido() && !this.saldoInsuficiente();
  }

  registrarMovimiento(event: Event): void {

    event.preventDefault();

    if (!this.puedeRegistrar()) {
      return;
    }

    this.movimientoRegistrado.emit({
      tipo: this.tipo,
      monto: this.monto!
    });

    this.monto = null;
    this.tipo = 'Recarga';
  }
}