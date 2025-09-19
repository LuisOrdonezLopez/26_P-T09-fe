import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Garment } from '../../../core/interfaces/garment';

import { GarmentService } from '../../../core/services/garment.service';
import { inject } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-garment-list',
  templateUrl: './garment-list.component.html',
  styleUrls: ['./garment-list.component.scss'],
  imports: [CommonModule, FormsModule, MatIconModule],
  standalone: true
})

export class GarmentListComponent {
  @Input() prendas: Garment[] = [];
  @Output() editarPrenda = new EventEmitter<Garment | null>();
  @Output() eliminarPrenda = new EventEmitter<number>();
  @Output() restaurarPrenda = new EventEmitter<number>();
  @Output() recargarDatos = new EventEmitter<void>();
  garmentService = inject(GarmentService);

  busquedaNombre: string = '';
  filtroEstado: string = 'A'; // T = Todos

  get prendasFiltradas(): Garment[] {
    return this.prendas.filter(p => {
      const coincideNombre = p.name.toLowerCase().includes(this.busquedaNombre.toLowerCase());
      const coincideEstado = this.filtroEstado === 'T' || p.state === this.filtroEstado;
      return coincideNombre && coincideEstado;
    });
  }

  reiniciar() {
    this.recargarDatos.emit();
  }

  agregarPrenda() {
    this.editarPrenda.emit(null);
  }

  editar(prenda: Garment) {
    this.editarPrenda.emit(prenda);
  }

  eliminar(id: number) {
    this.eliminarPrenda.emit(id);
  }

  restaurar(id: number) {
    this.restaurarPrenda.emit(id);
  }

  // Para generación de reportes
  reportPdf() {
    this.garmentService.reportPdf().subscribe(blob => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'reporte.pdf'; // nombre temporal
      link.click();
      URL.revokeObjectURL(url);
    });
  }

  // === Datos provisionales para pruebas sin backend ===
  /*
  ngOnInit() {
    this.prendas = [
      {
        identifier: 1, name: 'Polo Negro',
        size: 'M', color: 'Negro',
        unitPrice: 25.00, stock: 10,
        state: 'A', registerDate: '2025-05-01T10:00:00'
      },
      {
        identifier: 2, name: 'Camisa Blanca',
        size: 'L', color: 'Blanco',
        unitPrice: 35.50, stock: 5,
        state: 'I', registerDate: '2025-05-03T14:30:00'
      },
      {
        identifier: 3, name: 'Casaca Denim',
        size: 'S', color: 'Azul',
        unitPrice: 60.00, stock: 3,
        state: 'A', registerDate: '2025-05-10T09:15:00'
      },
      {
        identifier: 4, name: 'Short Deportivo',
        size: 'M', color: 'Gris',
        unitPrice: 20.00, stock: 8,
        state: 'A', registerDate: '2025-05-11T11:00:00'
      },
      {
        identifier: 5, name: 'Pantalón Jean',
        size: 'L', color: 'Azul Oscuro',
        unitPrice: 45.99, stock: 7,
        state: 'A', registerDate: '2025-05-12T13:20:00'
      },
      {
        identifier: 6, name: 'Falda Casual',
        size: 'S', color: 'Rojo',
        unitPrice: 30.50, stock: 4,
        state: 'I', registerDate: '2025-05-13T15:30:00'
      },
      {
        identifier: 7, name: 'Vestido Floral',
        size: 'M', color: 'Multicolor',
        unitPrice: 50.00, stock: 6,
        state: 'A', registerDate: '2025-05-14T10:10:00'
      },
      {
        identifier: 8, name: 'Camisa a Cuadros',
        size: 'XL', color: 'Verde',
        unitPrice: 38.75, stock: 5,
        state: 'A', registerDate: '2025-05-15T12:45:00'
      },
      {
        identifier: 9, name: 'Chaleco Acolchado',
        size: 'L', color: 'Negro',
        unitPrice: 42.00, stock: 2,
        state: 'I', registerDate: '2025-05-16T16:00:00'
      },
      {
        identifier: 10, name: 'Blusa Manga Corta',
        size: 'M', color: 'Rosado',
        unitPrice: 28.90, stock: 9,
        state: 'A', registerDate: '2025-05-17T09:30:00'
      },
      {
        identifier: 11, name: 'Polo Estampado',
        size: 'S', color: 'Blanco',
        unitPrice: 22.00, stock: 12,
        state: 'A', registerDate: '2025-05-18T10:45:00'
      },
      {
        identifier: 12, name: 'Chaqueta Impermeable',
        size: 'XL', color: 'Azul Marino',
        unitPrice: 55.00, stock: 3,
        state: 'A', registerDate: '2025-05-19T14:15:00'
      },
      {
        identifier: 13, name: 'Sudadera',
        size: 'L', color: 'Gris Claro',
        unitPrice: 33.30, stock: 6,
        state: 'I', registerDate: '2025-05-20T11:10:00'
      },
      {
        identifier: 14, name: 'Jogger Unisex',
        size: 'M', color: 'Beige',
        unitPrice: 40.00, stock: 7,
        state: 'A', registerDate: '2025-05-21T13:25:00'
      },
      {
        identifier: 15, name: 'Top Deportivo',
        size: 'S', color: 'Negro',
        unitPrice: 27.90, stock: 4,
        state: 'A', registerDate: '2025-05-22T15:50:00'
      },
      {
        identifier: 16, name: 'Pantalón Cargo',
        size: 'L', color: 'Verde Militar',
        unitPrice: 48.60, stock: 5,
        state: 'I', registerDate: '2025-05-23T08:55:00'
      },
      {
        identifier: 17, name: 'Camiseta Básica',
        size: 'M', color: 'Celeste',
        unitPrice: 19.99, stock: 10,
        state: 'A', registerDate: '2025-05-24T10:20:00'
      },
      {
        identifier: 18, name: 'Chompa de Lana',
        size: 'XL', color: 'Marrón',
        unitPrice: 52.40, stock: 3,
        state: 'A', registerDate: '2025-05-25T09:00:00'
      },
      {
        identifier: 19, name: 'Camisa Formal',
        size: 'L', color: 'Celeste',
        unitPrice: 36.80, stock: 6,
        state: 'I', registerDate: '2025-05-26T12:35:00'
      },
      {
        identifier: 20, name: 'Chalina Tejida',
        size: 'M', color: 'Fucsia',
        unitPrice: 18.00, stock: 11,
        state: 'A', registerDate: '2025-05-27T16:40:00'
      }
    ];
  }
  */
}
