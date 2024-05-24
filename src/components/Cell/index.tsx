import "./style.css"

interface CellProps {
  onClick: () => void;
  value: boolean;
}

const Cell = ({onClick, value}: CellProps) => {

  return (
    <td className={value ? "Cell_active" : "Cell"} onClick={onClick}>
      
    </td>
  )
}

export default Cell