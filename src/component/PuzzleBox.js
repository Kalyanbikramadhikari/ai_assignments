import React from 'react';

const PuzzleBox = React.forwardRef((props, ref) => {
  const item = props.state;
  const arr = item.data;
  const state = { isRecursive: item.isRecursive, isGoal: item.isGoal };
  return (
    <div ref={ref} className="flex justify-center items-center ">
      <table className={`table-auto`}>
        <tbody>
          {arr.map((row, i) => (
            <tr key={i}>
              {row.map((col, j) => (
                <td
                  key={j}
                  className={`
                    border-4
                    bg-yellow-700
                    px-3
                    p-1
                    text-2xl
                    text-white
                    ${
                      state.isDead
                        ? 'border-red-500'
                        : state.isGoal
                        ? 'border-green-400 text-green-400'
                        : state.isRecursive
                        ? 'border-gray-500'
                        : 'border-white'
                    } 
                    ${col === 0 ? 'bg-gray-300' : ''}`}
                >
                  {col}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

export default PuzzleBox;
