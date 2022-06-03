import { Component, OnInit } from '@angular/core';

/* Socios */
import { Socio } from 'src/app/clases/socios';
/* Validadores */
import { Validators } from '@angular/forms';
/* Formulario */
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MatTabGroup } from '@angular/material/tabs';


@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
})
export class FormularioComponent implements OnInit {
  ListaSocios: FormGroup;

  array: Socio[] = [];
  arrayCheck: Socio | null = null;

  changeIndex(tabgroup: MatTabGroup) {
    tabgroup.selectedIndex = 0;
  }

  constructor() {
    this.ListaSocios = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
      apellidos: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      id: new FormControl('', [
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(9),
      ]),
      telefono: new FormControl('', [
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(9),
      ]),
      genero: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    /* Número Aleatorio */
    /* El número es aleatorio e unico ya que depende del día/hora + un número aleatorio */
    console.log(new Date().getTime() * Math.random() * 100000);
  }

  /* Botón Envio */
  onSubmit(tabgroup: MatTabGroup) {
    if (!this.ListaSocios.valid || this.arrayCheck != null) {
      return;
    }

    let user = new Socio();
    user.nombre = this.ListaSocios.value.nombre;
    user.apellidos = this.ListaSocios.value.apellidos;
    user.miembro = new Date().getTime() * Math.random() * 100000;
    user.id = this.ListaSocios.value.id;
    user.telefono = this.ListaSocios.value.telefono;
    user.genero = this.ListaSocios.value.genero;

    this.array.push(user);
    this.ListaSocios.reset();
    
    tabgroup.selectedIndex = 0;
  }

  /* Eliminar Socio */
  eliminar(event: MouseEvent, user: Socio): void {
    for (let i = this.array.length - 1; i >= 0; i--) {
      if (this.array[i] == user) {
        this.array.splice(i, 1);
      }
    }

    if (this.arrayCheck != null && this.arrayCheck == user) {
      this.ListaSocios.reset();
      this.arrayCheck = null;
    }
  }

  /* Modificar Socios */
  modificar(event: MouseEvent, user: Socio): void {
    this.ListaSocios.controls['name'].setValue(user.nombre);
    this.ListaSocios.controls['surname'].setValue(user.apellidos);
    this.ListaSocios.controls['id'].setValue(user.id);
    this.ListaSocios.controls['phone'].setValue(user.telefono);
    this.ListaSocios.controls['gender'].setValue(user.genero);

    this.arrayCheck = user;

    // @ts-ignore: Object is possibly 'null'.
    document.getElementById('modificacion').className = 'visible';
  }


  terminarModificacion(event: MouseEvent, user: Socio): void {
    for (let p of this.array) {
      if (p == user) {
        p.nombre = this.ListaSocios.value.nombre;
        p.apellidos = this.ListaSocios.value.apellidos;
        p.id = this.ListaSocios.value.id;
        p.telefono = this.ListaSocios.value.telefono;
        p.genero = this.ListaSocios.value.genero;

        this.ListaSocios.reset();
        this.arrayCheck = null;

        break;
      }
    }
    // @ts-ignore: Object is possibly 'null'.
    document.getElementById('modificacion').className = 'hidden';
  }
}