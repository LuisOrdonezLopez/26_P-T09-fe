import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Supplier } from '../../../core/interfaces/supplier';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-supplier-form',
  templateUrl: './supplier-form.component.html',
  styleUrls: ['./supplier-form.component.scss'],
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true
})
export class SupplierFormComponent {
  @Input() proveedor: Supplier | null = null;
  @Output() guardar = new EventEmitter<Supplier>();
  @Output() cancelar = new EventEmitter<void>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      identifier: [null],
      companyName: ['', [
        Validators.required, 
        Validators.minLength(2),
        Validators.maxLength(100)
      ]],
      ruc: ['', [
        Validators.required, 
        Validators.pattern(/^\d{11}$/),
        Validators.maxLength(11)
      ]],
      phone: ['', [
        Validators.required, 
        Validators.pattern(/^9\d{8}$/),
        Validators.maxLength(9)
      ]],
      address: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100)
      ]],
      email: ['', [
        Validators.required, 
        Validators.email,
        Validators.maxLength(50)
      ]],
      state: ['A'],
      registerDate: [new Date().toISOString()]
    });
  }

  ngOnChanges() {
    if (this.proveedor) {
      this.form.patchValue({
        ...this.proveedor,
        registerDate: this.formatDateForInput(this.proveedor.registerDate)
      });
    }
  }

 // En el método onSubmit
onSubmit() {
  if (this.form.valid) {
    const formData = this.form.value;
    const supplierData: Supplier = {
      identifier: this.proveedor?.identifier || 0, // Asigna 0 si es nuevo
      companyName: formData.companyName,
      ruc: formData.ruc,
      phone: formData.phone,
      address: formData.address,
      email: formData.email,
      state: 'A',
      registerDate: new Date().toISOString()
    };
    this.guardar.emit(supplierData);
  }
}

  private formatDateForInput(dateString: string): string {
    return dateString ? new Date(dateString).toISOString().slice(0, 16) : new Date().toISOString().slice(0, 16);
  }

  esInvalido(campo: string): boolean {
    const control = this.form.get(campo);
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  onCancel() {
    this.cancelar.emit();
  }
}