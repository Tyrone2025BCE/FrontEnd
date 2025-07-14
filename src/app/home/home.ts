
import { Component, inject, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { forumPost,forumPostUsuario } from '../app';

import { UserService } from '../user.service';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
 
estado: string = '';
  constructor(private userService: UserService) { }

  forumUser: forumPostUsuario = {
    id: 0,
    name: '',
    addres: '',
    phone: ''
  };


  profileForm: FormGroup = new FormGroup({
    codigo: new FormControl(''),
    nombre: new FormControl('', [Validators.required]),
    direcc: new FormControl('', [Validators.required]),
    fono: new FormControl('', [Validators.required])
  })

  forumUsers: forumPostUsuario[] = [];

  ngOnInit() {
this.actualizarLista();
  }

  onSubmit() {
    if (this.profileForm.valid) {
      this.forumUser.name = this.profileForm.value.nombre;
      this.forumUser.addres = this.profileForm.value.direcc;
      this.forumUser.phone = this.profileForm.value.fono;

      if (this.profileForm.value.codigo > 0) {
        console.log("Vamos a actualizar ");
        this.forumUser.id = this.profileForm.value.codigo
        this.forumUser.name = this.profileForm.value.nombre;
        this.forumUser.addres = this.profileForm.value.direcc;
        this.forumUser.phone = this.profileForm.value.fono;
         this.userService.updateUser(this.forumUser).subscribe({
  next: () => {
    console.log("Usuario actualizado correctamente");
    this.actualizarLista();
    this.resetForm();
  },
  error: error => {
    console.error("Error al actualizar:", error);
  }
});


       
                
      } else {


        this.userService.addForumUser(this.forumUser).subscribe(newForm => {
          this.forumUsers.unshift(newForm);
              
          console.log("Se crea nuevo usuario: ", newForm);
          this.actualizarLista();
        
        
        })
      }
      
      this.profileForm.reset();
    }

  }

  

removeUser(forumUser: forumPostUsuario) {
  const confirmado = window.confirm(`¿Estás seguro de que deseas eliminar al usuario "${forumUser.name}"?`);

  if (confirmado) {
    this.userService.deleteForumUser(forumUser).subscribe({
      next: () => {
        console.log('Usuario eliminado correctamente');
        this.actualizarLista();
      },
      error: (error) => {
        console.error('Error al eliminar usuario:', error);
      }
    });
  } else {
    console.log('Eliminación cancelada por el usuario');
  }
}


  updateUser(forumUser: forumPostUsuario) {
    console.log('Update registro id:', forumUser.id);
    this.profileForm.setValue({
      codigo: forumUser.id,
      nombre: forumUser.name,
      direcc: forumUser.addres,
      fono: forumUser.phone,
    });
   

  };


  resetForm() {
  this.profileForm.reset(); // Limpia el formulario

  // Reinicia el objeto si es necesario
  this.forumUser = {
    id: 0,
    name: '',
    addres: '',
    phone: ''
  };

  this.estado = ''; // Limpia el mensaje de estado si lo usas

}

actualizarLista() {
     this.userService.getForumUsers().subscribe(data => {
      this.forumUsers = data;
      console.log("Usuarios cargados: ", data);
    });
}



nuevoUsuario() {
  this.resetForm();
}



}






