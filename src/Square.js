import React from 'react';

function Square(props)
{
    /*
        Cada casilla mostrara el valor que le da el tablero y luego avisará a este último para que luego el 
        juego determine el estado de la partida.
    */
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

export default Square;