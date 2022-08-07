function obtenerValor(id){
    return document.getElementById(id);
}

function adicionarFila(datosPersona){
   
        let tabla = document.querySelector("#tabla-datos tbody");
        filas = tabla.childNodes.length + 1;
        let html = "<tr id='datos-" + filas + "'>";
        html +=     "<td>" + datosPersona.nombres + "</td>";
        html +=     "<td>" + datosPersona.apellidos + "</td>";
        html +=     "<td>" + datosPersona.cumpleanio + "</td>";
        html +=     "<td>";
        html +=     "<button type='button' id='editar-" + filas + "' class='editar'><i class='fa-solid fa-pen-to-square'></i></button>";
        html +=     "<button type='button' id='eliminar-" + filas + "' class='eliminar'><i class='fa-solid fa-trash-can'></i></button>";
        html +=     "</tr>";

        tabla.innerHTML += html;

        let botonesEditar = tabla.getElementsByClassName("editar");
        for(let i = 0; i <botonesEditar.length; i++){
            botonesEditar[i].addEventListener("click",editar);
        }

        let botonesEliminar = tabla.getElementsByClassName("eliminar");
        for(let i = 0; i <botonesEliminar.length; i++){
            botonesEliminar[i].addEventListener("click",eliminar);
        }
}

function cargarDatos(event){
    datosStorage = localStorage.getItem("datosPersonas");
    if(datosStorage){
        datosStorage = JSON.parse(datosStorage);
        datosStorage.forEach(datosPersona => {
            adicionarFila(datosPersona);
        })
    }
}

function guardarDatosPersona(event){
    const nombres = obtenerValor("nombres");
    const apellidos = obtenerValor("apellidos");
    const cumpleanio = obtenerValor("cumpleanio");
    const accion = obtenerValor("accion");

    if(accion.value === "guardar"){
        let datosPersona = {
            "nombres": nombres.value,
            "apellidos": apellidos.value,
            "cumpleanio": cumpleanio.value
        }
        adicionarFila(datosPersona);
        let datosStorage = localStorage.getItem("datosPersonas");
        if(!datosStorage){
            datosStorage = [];
        } else {
            datosStorage = JSON.parse(datosStorage)
        }

            datosStorage.push(datosPersona);
            localStorage.setItem("datosPersonas", JSON.stringify(datosStorage));
           
    
    } else {
        let id = obtenerValor("idDatos").value;
        let fila = obtenerValor(id);
        let datos = fila.getElementsByTagName("td");
        datos[0].textContent = nombres.value;
        datos[1].textContent = apellidos.value;
        datos[2].textContent = cumpleanio.value;
        accion.value = "guardar"; 

        let index = fila.rowIndex;
        let datosStorage = JSON.parse(localStorage.getItem("datosPersonas"));
        let datosPersona = {
            "nombres": nombres.value,
            "apellidos": apellidos.value,
            "cumpleanio": cumpleanio.value
        }

        datosStorage[index-1] = datosPersona;
        localStorage.setItem("datosPersonas", JSON.stringify(datosStorage));
    }

    document.getElementById("btnReset").click();
}

function editar(event){
    let fila = event.target.closest("tr");
    let id = fila.id;
    let valores = fila.getElementsByTagName("td");
    let nombres = valores[0].textContent.trim();
    let apellidos = valores[1].textContent.trim();
    let cumpleanio = valores[2].textContent.trim();

    obtenerValor("nombres").value = nombres;
    obtenerValor("apellidos").value = apellidos;
    obtenerValor("cumpleanio").value = cumpleanio;
    obtenerValor("accion").value = "editar";
    obtenerValor("idDatos").value = id;
}

function eliminar(event){
    let fila = event.target.closest("tr");
    let index = fila.rowIndex;
    datosStorage =JSON.parse(localStorage.getItem("datosPersonas"));
    datosStorage.splice(index - 1, 1);
    localStorage.setItem("datosPersonas",JSON.stringify(datosStorage));
    fila.remove();
}
