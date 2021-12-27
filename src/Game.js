import React from 'react';

import Board from './Board';

class Game extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state =
        {
            //Historial de movimientos. Al inicio, vacía.
            history:
            [{ 
                squares: Array(9).fill(null),
            }],
            stepNumber: 0, //Usado para poder volver a un paso anterior.
            xIsNext: true, //Es el turno de 'X' al iniciar.
        };
    }

    handleClick(i)
    {
        const history = this.state.history.slice(0, this.state.stepNumber + 1); //Copia arreglo de pasos hasta el último alcanzado.
        const current = history[history.length - 1]; //Paso actual
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i])
        { //Si alguien ganó o si la casilla está ocupada, no se agregan más elementos.
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O'; //Completamos la casilla con X o O según corresponda.
        this.setState (
            {
            history: history.concat(
                [{ //Se agrega el nuevo paso al historial.
                    squares: squares
                }]
            ),
            stepNumber: history.length, //Lo cargamos con el siguiente paso.
            xIsNext: !this.state.xIsNext, //Cambia el turno para que el otro símbolo juegue.
            }
        );
    }

    jumpTo(step)
    { //Nos movemos a alguno de todos los pasos alcanzados durante el juego.
        this.setState(
            {
                stepNumber: step, //Cambia el valor del paso al seleccionado.
                xIsNext: (step % 2) === 0, //Determina de quien es el turno.
            }
        );
    }

    render()
    {
        const history = this.state.history; //Obtenemos el historial del juego actual.
        const current = history[this.state.stepNumber]; //Obtenemos el paso actual del historial.
        const winner = calculateWinner(current.squares); //Verificamos si hay un ganador en el paso actual.

        const moves = history.map((step, move) => { //Se crea una lista de botones donde cada uno nos permite ir al paso indicado.
            const desc = move ? //Descripción del botón que indica el paso correspondiente.
                'Go to move #' + move :
                'Go to game start'; //Paso inicial.

            /*
                Se le asigna una clave al elemento de la lista para identificarlo facilmente.
            */
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });

        let status; //Muestra el estado de la partida (si alguien ganó o de quien es el turno).
        if (winner)
        {
            status = 'Winner: ' + winner;
        } else
        {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
        /*
            Se muestra el tablero con su paso actual y un evento el cual luego el tablero luego le dara al juego 
            los valores necesarios para determinar el estado del juego.

        */
        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

function calculateWinner(squares)
{
    const lines =
    [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++)
    {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
        {
            return squares[a];
        }
    }
    return null;
}

export default Game;