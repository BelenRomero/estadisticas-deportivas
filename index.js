const { resolveObjectURL } = require('buffer')
const fs = require('fs')


const archivo = (nombre, delimitador) => {
    const contenido = fs.readFileSync(nombre).toString()
    return contenido.split(delimitador)
}   // La función lee un archivo, lo convierte a String y lo separa en una Array (por delimitador)


const equipoA = archivo('basket/equipo-A.txt', '\n')    //checkpoint    console.log(equipoA)
const equipoB = archivo('basket/equipo-B.txt', '\n')    //checkpoint    console.log(equipoB)
const partido = archivo('basket/partido.log', '\n')     //checkpoint    console.log(partido)


// Recibe el archivo con las anotaciones de puntos (partido) y el equipo, para calcular el total de puntos
const puntosPorEquipo = (registro, equipo) => {
    const registroEquipo = registro.filter(anotacion => {
    // "APELLIDO,TIPO"
        let apellido = anotacion.split(',')[0]
        let apellidos = equipo.map(nombreCompleto => nombreCompleto.split(" ")[1])
        return apellidos.includes(apellido)
    })
    const puntos = {}
    let totalPuntos = 0
    registroEquipo.forEach(anotacion => {
        const apellido = anotacion.split(",")[0] 
        let puntoAnotado = anotacion.split(",")[1]
        puntoAnotado = (puntoAnotado === 'DOBLE') ? 2 : 3
        puntos[apellido] = puntos[apellido] || 0
        puntos[apellido] += puntoAnotado
        totalPuntos += puntoAnotado
    })
    return {
        totalPuntos,
        puntos
    }
}

// Se llama a la función de "puntosPorEquipo" para traer los resultados de los puntos por equipos y se procede a mostrarlo por consola:
const puntosEquipoA = puntosPorEquipo(partido, equipoA)
const puntosEquipoB = puntosPorEquipo(partido, equipoB)
console.log("Equipo A: \n" + JSON.stringify(puntosEquipoA))
console.log("Equipo B: \n" + JSON.stringify(puntosEquipoB))

const resultadoFinal = () => {
  const ganador = (puntosEquipoA.totalPuntos > puntosEquipoB.totalPuntos) ? "el GANADOR es el EQUIPO A."  : "el GANADOR es el EQUIPO B."
  return ganador
}
console.log('\nEl resultado de la estadística realizada indica que ' + resultadoFinal())




// La función obtiene el goleador cuando es llamada, recibiendo los puntos de cada equipo
const jugadorMayorPuntajePorEquipo = (equipo) => {
    const array = Object.values(equipo);
    const objeto = {} = array[1];
 
    let jugador = null
    let puntaje = 0;
    let jugadorMayorPuntaje = null;
    let max = 0;
  
    for (const property in objeto) {
        jugador = property;
        puntaje = objeto[property];

        if(puntaje > max){
            max = puntaje;
            jugadorMayorPuntaje = jugador
        }
    }
    return [jugadorMayorPuntaje, max];
}
// Se obtienen los jugadores con mayor puntaje por equipo y se muestra por consola:
const mayorPuntajeA = [] = jugadorMayorPuntajePorEquipo(puntosEquipoA)
const mayorPuntajeB = [] = jugadorMayorPuntajePorEquipo(puntosEquipoB)
const jugadorMayorPuntajeDefinitivo = (jugador1, jugador2) => {
    return (jugador1[1] > jugador2[1]) ? "\nEl jugador con mayor puntaje es: " + jugador1[0] :  "\nEl jugador con mayor puntaje es: " + jugador2[0]
}
//console.log(mayorPuntajeA)
//console.log(mayorPuntajeB)
console.log(jugadorMayorPuntajeDefinitivo(mayorPuntajeA,mayorPuntajeB))



// Se calcula la distribución de puntos por tipo de anotación, y se muestra por pantalla (dentro de la misma función, debajo se la llama solamente)
const distribucionDePuntaje = () => {
    const array = [];
    const registroEquipo = partido.filter(anotacion => {
        let puntaje = anotacion.split(',')[1]
        array.push(puntaje);
    })

    let cantidadDobles = 0;
    let cantidadTriples = 0;

    array.forEach(i => {
        if(i == "DOBLE"){
            cantidadDobles++
        }else{
            cantidadTriples++
        } 
  });
    console.log("\nListar distribución de puntaje por tipo anotación: \nSe anotaron "+ cantidadDobles + " DOBLES y "+ cantidadTriples+ " TRIPLES" + '\n')
}
distribucionDePuntaje()