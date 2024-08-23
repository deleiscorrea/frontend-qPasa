import { mensajes } from "./mensajes";

export const obtenerMensajes = () => {
    const mensajes_guardados = localStorage.getItem("mensajes")
    if(mensajes_guardados && mensajes_guardados !== "undefined"){
        return JSON.parse(mensajes_guardados)
    }
    else{
        const mensajes_JSON = JSON.stringify(mensajes)
        localStorage.setItem("mensajes", mensajes_JSON)
        return mensajes
    }
}

export const guardarMensajes = (mensajes_actualizados) => {
    localStorage.setItem("mensajes", JSON.stringify(mensajes_actualizados))
}