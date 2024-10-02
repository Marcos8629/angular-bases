import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TemperaturaService } from '../../services/temperatura.service';
import { UtilService } from '../../services/validations/util.service';
import { error } from 'console';

@Component({
  selector: 'app-tiempo',
  templateUrl: './tiempo.component.html',
  styleUrl: './tiempo.component.css'
})
export class TiempoComponent {

  formulario!: FormGroup;
  tiempo : any;
  name : any;
  temperatura: any;
  humedad: any;
  latitud: any;
  longitud: any;
  descripcion: any;
  showError: boolean = false;
  mensajeError: string ="";


constructor(private fb: FormBuilder, private _tiempo: TemperaturaService, 
  private _util: UtilService){
this.iniciaFormulario();
}


//metodo para iniciar un formulario
iniciaFormulario(){
  this.formulario = this.fb.group({
      ciudad: ['', [Validators.required, this._util.noSantiago ]],
      codigo: ['', [Validators.required, Validators.pattern('^[a-zA-Z]*$')]]
  }
  )
}

consultar(){
  console.log("Formulario", this.formulario);
  this._tiempo.getEstadoTiempo(this.formulario.get('ciudad')?.value, this.formulario.get('codigo')?.value )
  .subscribe(respuesta  => {
     this.showError = false;
     this.tiempo = respuesta;
     this.name = this.tiempo.name;
     this.temperatura = this.tiempo.main.temp;
     this.humedad = this.tiempo.main.humidity;
     this.latitud = this.tiempo.coord.lat;
     this.longitud = this.tiempo.coord.lon;
     this.descripcion = this.tiempo.weather[0].description;


    console.log("respuesta",respuesta);
  },
  (error:any) =>
  {
     this.showError = true;
     this.mensajeError = "Error al consultar el estado del tiempo";
  }
)
}



onCheckChange(event :any){
 if(event.target.checked){
    console.log('checked');
 } else{ 
  console.log('checkbox is not checked')
 }

}

data:any={ 
}

fnClick(){
let datos = Object.keys(this.data)
let test: string[]=[]
datos.forEach((k,i)=>
{
    if(this.data[k]){
      test.push(k)
    }
})
  console.log({test:test.join()})
  console.log("si entro")
}



public nombre: string = 'ironman';
public age: number = 45;


changeHero():void{
  this.nombre = 'Spiderman';
}

changeAge(){
  this.age = 25;
}

resetForm()
{
  this.nombre='ironman';
  this.age = 45;

}

 heroNames :string[] = ['Spiderman', 'Hulk', 'Thor'];
 deleteHero?:string; 

 removeLastHero(){
   this.deleteHero = this.heroNames.pop();
 }



}

