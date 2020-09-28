//this is the js that we gonna use


const formularioUi = document.querySelector('#formulario');
const lista = document.querySelector('#lista'); 

const deletebtn = document.querySelector('#delete'); 


let arrayActividades = [];



const CrearItem = (actividad) => {
	let item = {
		actividad: actividad,
		estado: false
	}

     arrayActividades.push(item)
     return item;
     
}


const GuardarDb = () => {
    localStorage.setItem('rutina', JSON.stringify(arrayActividades))
    PintarDatos();

}

const PintarDatos = () => {

    lista.innerHTML = '';
    arrayActividades = JSON.parse(localStorage.getItem('rutina'));
    

     if (arrayActividades === null) {
     	 arrayActividades = [];

     }else {

     

     	 arrayActividades.forEach(item => {

              if (item.estado === true) {


         lista.innerHTML += `		<div class="alert alert-success">
         <button type="button" class="close" id="state">state</button>
        <button type="button" class="close" id="delete">x</button>
        <strong>${item.actividad}</strong> ${item.estado}
        </div>`

              }else {         


            lista.innerHTML += `		<div class="alert alert-danger">
         <button type="button" class="close" id="state">state</button>
        <button type="button" class="close" id="delete">x</button>
        <strong>${item.actividad}</strong> ${item.estado}
        </div>`

         }

     	 });
     }

}

function BorrarDatos (option) {

	let indexArray;

	arrayActividades.forEach((item, index) => {
         if (item.actividad === actividad) {
         	  indexArray = index;
         }

	})

   arrayActividades.splice(indexArray, 1);
   GuardarDb();
   
}



function ChangeState (option) {
   
   
   console.log(option)


	arrayActividades.forEach((item, index) => {
         if (item.actividad === option) {
         	  indexArray = index;
         }

	})

 arrayActividades[indexArray].estado = true;
 GuardarDb();

}




formularioUi.addEventListener('submit', (e)=> {

   e.preventDefault();
   let actividad = document.querySelector('#actividad').value;

   formularioUi.reset();

   CrearItem(actividad);
   GuardarDb();

})

document.addEventListener('DOMContentLoaded', PintarDatos)

lista.addEventListener('click', (e) => {
	e.preventDefault();


    if (e.target.innerHTML === 'x') {
      let option = e.path[1].childNodes[3].innerHTML;
      BorrarDatos(option);

     }else if (e.target.innerHTML === 'state') {
        let option = e.path[1].childNodes[5].innerHTML;

       	ChangeState(option);
    }




  


})
