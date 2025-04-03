function Square({value, region, regionTop, regionLeft, regionRight, regionBottom, onSquareClick, idkey}) {
    let borderClasses = "";
    if (region !== regionTop) {
      borderClasses += " borderTop "
    }
    if (region !== regionLeft) {
      borderClasses += " borderLeft "
    }
    if (region !== regionRight) {
      borderClasses += " borderRight "
    }
    if (region !== regionBottom) {
      borderClasses += " borderBottom "
    }
    return (
      <button 
        key={`id${idkey}`}
        className={`square region${region} ${borderClasses}`} 
        onClick={onSquareClick}>
          {value} 
      </button>
    );
  }
  
export default Square;