import { useState, useEffect } from "react";
import Cell from "../Cell";
import "./style.css";

interface CellsField {
  array: boolean[][];
}

const Field = () => {
  const [cells, setCells] = useState<CellsField>({array: []});
  const [begun, setBegun] = useState(false);


  useEffect(() => {
    setCells({array: Array(10).fill(0).map(() => Array(10).fill(false))});
  }, []);

  const toggleCell = (i: number, j: number) => {
    setCells({array: cells.array.map((row, index) => {
      if (index === i) {
        return row.map((cell, index) => {
          if (index === j) {
            return !cell
          }
          return cell
        })
      }
      return row
    })})
  }

  const checkup = (i: number, j: number) => {
    setCells({array: cells.array.map((row, index) => {
      if (index === i) {
        return row.map((cell, index) => {
          if (index === j) {
            let activeCells = 0;
            if (i > 0) {
              if (cells.array[i - 1][j]) {
                activeCells++;
              }
              if (j > 0 && cells.array[i - 1][j - 1]) {
                activeCells++;
              }
              if (j < row.length - 1 && cells.array[i - 1][j + 1]) {
                activeCells++;
              }
            }
            if (i < cells.array.length - 1) {
              if (cells.array[i + 1][j]) {
                activeCells++;
              }
              if (j > 0 && cells.array[i + 1][j - 1]) {
                activeCells++;
              }
              if (j < row.length - 1 && cells.array[i + 1][j + 1]) {
                activeCells++;
              }
            }
            if (j > 0 && cells.array[i][j - 1]) {
              activeCells++;
            }
            if (j < row.length - 1 && cells.array[i][j + 1]) {
              activeCells++;
            }
            if (i > 0 && j > 0 && cells.array[i - 1][j - 1]) {
              activeCells++;
            }
            if (i > 0 && j < row.length - 1 && cells.array[i - 1][j + 1]) {
              activeCells++;
            }
            if (i < cells.array.length - 1 && j > 0 && cells.array[i + 1][j - 1]) {
              activeCells++;
            }
            if (i < cells.array.length - 1 && j < row.length - 1 && cells.array[i + 1][j + 1]) {
              activeCells++;
            }
            return activeCells < 1 || activeCells > 3 ? false : activeCells === 2 ? true : cell;
          }
          return cell;
        })
      }
      return row;
    })});
  }

  const startGame = () => {
    if (begun) {
      setBegun(!begun);
      setInterval(() => {
        cells.array.forEach((row, i) => {
          row.forEach((_, j) => {
            checkup(i, j);
          });
        });
      }, 1000);
    }
}

const stopGame = () => {
  if (!begun) {
    setBegun(true);
  }
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
    </div>
  )
}

export default Field

