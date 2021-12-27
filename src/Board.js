import React from 'react';

import Square from './Square';

class Board extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state =
        {
            squares: Array(9).fill(null), //Almacena los valores de cada casilla.
            xIsNext: true, //Determina el turno.
        };
    }

    renderSquare(i)
    {
        /*
            Llamará a cada casilla con los valores que van a tener y un evento para que,
            al ser pulsadas casilla, se llame a un evento en el tablero.
        */
        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    render()
    {

        /*
            Muestra el tablero completo llamando a la función renderSquare(i). Al inicio estará vacío.
        */
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

export default Board;