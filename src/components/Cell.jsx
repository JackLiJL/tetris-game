const Cell = ({ color }) => {
    return (
        <div className="cell" style={{ backgroundColor: color || 'transparent' }} />
    );
};

export default Cell;
