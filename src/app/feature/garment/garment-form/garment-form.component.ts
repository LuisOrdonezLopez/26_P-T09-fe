import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Garment } from '../../../core/interfaces/garment';

import { CommonModule } from '@angular/common';

import { noFutureDateValidator } from '../../../shared/validators/date.validators';

@Component({
  selector: 'app-garment-form',
  templateUrl: './garment-form.component.html',
  styleUrls: ['./garment-form.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, MatIconModule],
  standalone: true
})
export class GarmentFormComponent implements OnChanges {
  @Input() prenda: Garment | null = null;
  @Output() guardar = new EventEmitter<Garment>();

  garmentForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.garmentForm = this.fb.group({
      identifier: [0],
      name: ['', [Validators.required, Validators.minLength(2), Validators.pattern(/^(?!.* {2,})[A-Za-zÁÉÍÓÚÑáéíóúñ0-9\-]+( [A-Za-zÁÉÍÓÚÑáéíóúñ0-9\-]+)*$/)]],
      size: ['', [Validators.required, Validators.maxLength(2), Validators.pattern(/^(S|M|L|XL)$/)]],
      color: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^(?!.* {2,})[A-Za-zÁÉÍÓÚÑáéíóúñ]+( [A-Za-zÁÉÍÓÚÑáéíóúñ]+)*$/)]],
      unitPrice: [0, [Validators.required, Validators.min(30), Validators.pattern(/^\d+(\.\d{1,2})?$/)]], //Verificar precio mínimo
      stock: [0, [Validators.required, Validators.min(1), Validators.pattern(/^\d+$/)]],
      state: ['A', Validators.required],
      registerDate: [this.getCurrentDateTimeLocal(), [Validators.required, noFutureDateValidator]],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['prenda'] && this.prenda) {
      this.garmentForm.patchValue(this.prenda);
    } else if (changes['prenda'] && this.prenda === null) {
      this.clearForm();
    }
  }

  onSubmit() {
    if (this.garmentForm.valid) {
      this.guardar.emit(this.garmentForm.value);
      this.clearForm();
    }
  }

  esInvalido(campo: string): boolean {
    const control = this.garmentForm.get(campo);
    return !!control && control.invalid && control.touched;
  }

  clearForm() {
    this.garmentForm.reset({
      identifier: 0,
      name: '',
      size: '',
      color: '',
      unitPrice: null,
      stock: null,
      state: 'A',
      registerDate: this.getCurrentDateTimeLocal()
    });
  }

  // Función para obtener la fecha y hora actual en formato datetime-local
  private getCurrentDateTimeLocal(): string {
    const now = new Date();
    // Formato que requiere datetime-local ( YYYY-MM-DDTHH:MM )
    const offset = now.getTimezoneOffset();
    const localDate = new Date(now.getTime() - (offset * 60000));
    return localDate.toISOString().slice(0, 16);
  }
}
