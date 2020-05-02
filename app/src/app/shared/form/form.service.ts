import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() { }

  handleMsgInputInvalid(input: any): string {
    const err = input.errors;

    if (err.required) {
      return 'Este campo é obrigatório';
    } else if (err.minlength) {
      const min = err.minlength;
      return `Este campo deve possuir no mínimo ${min.requiredLength} caractéres`;
    } else if (err.maxlength) {
      return `Você ultrapassou o limite de ${err.maxlength.requiredLength} caractéres`;
    } else if (err.email) {
      return 'Formato de e-mail inválido';
    } else if (err.MatchPassword) {
      return `Os campos de senha estão diferentes`;
    } else if (err.completeNamePattern) {
      return 'Preencher o nome completo. Ex: João da Silva';
    } else {
      return '';
    }
  }

  hasError(input: any): boolean {
    return input.invalid && input.dirty;
  }

  submitForm(form: FormGroup) {
    for (const i in form.controls) {
      form.controls[i].markAsDirty();
      form.controls[i].updateValueAndValidity();
    }
  }

}
