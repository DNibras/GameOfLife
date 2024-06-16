import { useState, useEffect } from "react";
import Cell from "../Cell";
import "./style.css";

interface CellsField {
  array: boolean[][];
}

let intervalId: NodeJS.Timeout;

const Field = () => {
  const [cells, setCells] = useState<CellsField>({array: Array(50).fill(0).map(() => Array(50).fill(false))});

  // useEffect(() => {
  //   setCells();
  // }, []);

  const toggleCell = (i: number, j: number) => {
    setCells({array: cells.array.map((row, index) => {
      if (index === i) {
        return row.map((cell, index) => {
          if (index === j) {
            return !cell;
          }
          return cell;
        })
      }
      return row;
    })})
  }

  const checkup = (oldCells: CellsField,i: number, j: number) => {
    let activeCells = 0;

    for (let x = Math.max(0, i - 1); x <= Math.min(oldCells.array.length - 1, i + 1); x++) {
      for (let y = Math.max(0, j - 1); y <= Math.min(oldCells.array[x].length - 1, j + 1); y++) {
        if (x !== i || y !== j) {
          if (oldCells.array[x][y]) {
            activeCells++;
          }
        }
      }
    }

    return (activeCells === 3 || (activeCells === 2 && oldCells.array[i][j]));
  
  }

  const startGame = () => {
    intervalId = setInterval(() => {
      setCells((oldCells) => ({
        array: oldCells.array.map((row, i) => {
          return row.map((_, j) => {
            return checkup(oldCells,i, j);
          })
        })
      }
      ))
    }, 1000);
  }

  const stopGame = () => {
    clearInterval(intervalId);
  }

  return (
    <div className="Field">
      <table>
        <tbody>
          {cells.array.map((row, i) => (
            <tr key={i}>
              {row.map((_, j) => (
                <Cell key={j} onClick={() => toggleCell(i, j)} value={cells.array[i][j]} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button className="Start" onClick={startGame}>старт</button>
      <button className="Stop" onClick={stopGame}>стоп</button>
      <button className="random" onClick={() => setCells({array: Array(50).fill(0).map(() => Array(50).fill(0).map(() => Math.random() > 0.9))})}>рандом</button>
    </div>
  )
}

export default Field

