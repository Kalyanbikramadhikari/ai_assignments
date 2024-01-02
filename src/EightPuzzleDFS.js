import React, { useEffect } from 'react';
import PuzzleBox from './component/PuzzleBox';
import { useState, useRef } from 'react';
import { ArcherContainer, ArcherElement } from 'react-archer';
import { FaLongArrowAltRight } from 'react-icons/fa';

let nodeCount = 1;

const EightPuzzleDFS = () => {
  const myRef = useRef(null);

  const goalState = [
    [1,2,3],
    [4,5,6],
    [7,0,8],
  ];

  const initialState = {
    // data: [
    //   [1,2,3],
    //   [4,5,6],
    //   [7,8,0],
    // ],
    data: [
        [1,2,3],
        [5,4,6],
        [7,8,0],
      ],
    isRecursive: false,
    isGoal: false,
    depth: 0,
    id: '1',
    parentId: '',
    action: '',
    misplacedTiles: 0,
    manhattanDistance: 0,
  };

  const queue = []; // empty array to store new states for new depth level
  const [currentLevel, setCurrentLevel] = useState(0);
  const [currentState, setCurrentState] = useState([[initialState]]);
  const [isGoalState, setIsGoalState] = useState(false);

  // Find the position of zero in the array and return the index
  const findZero = (data) => {
    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      for (let j = 0; j < row.length; j++) {
        const col = row[j];
        if (col === 0) {
          return { i, j };
        }
      }
    }
  };

  const checkRecursive = (newData, currentArray) => {
    // check if new data is in previous states
    for (const state of currentState) {
      for (const item of state) {
        if (JSON.stringify(item.data) === JSON.stringify(newData)) {
          return true;
        }
      }
    }

    // check if new data is in new formed states
    for (const item of currentArray) {
      if (JSON.stringify(item.data) === JSON.stringify(newData)) {
        return true;
      }
    }
    return false;
  };

  const checkGoalState = (data) => {
    return JSON.stringify(data) === JSON.stringify(goalState);
  };

  const calculateMisplacedTiles = (data) => {
    let misplacedTiles = 0;
    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      for (let j = 0; j < row.length; j++) {
        const col = row[j];
        if (col !== goalState[i][j]) {
          misplacedTiles++;
        }
      }
    }
    return misplacedTiles;
  };

  const performAction = (state, i, j, action) => {
    const newState = { ...state }; // copy the state to prevent mutation
    const newData = JSON.parse(JSON.stringify(newState.data));

    // swapping the zero with the number in the direction
    switch (action) {
      case 'u':
        if (i > 0) {
          [newData[i][j], newData[i - 1][j]] = [newData[i - 1][j], 0];
        }
        break;
      case 'l':
        if (j > 0) {
          [newData[i][j], newData[i][j - 1]] = [newData[i][j - 1], 0];
        }
        break;
      case 'd':
        if (i < 2) {
          [newData[i][j], newData[i + 1][j]] = [newData[i + 1][j], 0];
        }
        break;
      case 'r':
        if (j < 2) {
          [newData[i][j], newData[i][j + 1]] = [newData[i][j + 1], 0];
        }
        break;
      default:
        break;
    }

    if (checkRecursive(newData, queue)) {
      newState.isRecursive = true;
      return false;
    }
    newState.data = newData;
    newState.action = action;
    newState.id = `${++nodeCount}`;
    newState.parentId = `${state.id}`;
    newState.depth = currentLevel + 1;
    newState.misplacedTiles = calculateMisplacedTiles(newState.data);
    newState.manhattanDistance = newState.depth + newState.misplacedTiles;
    queue.push(newState);

    if (checkGoalState(newData)) {
      newState.isGoal = true;
      console.log(`Goal State Reached at id ${newState.id}`);
      setIsGoalState(true);
      return true;
    }
    return false;
  };

  const performStateSpaceSearch = () => {
    const newLevel = currentLevel + 1;

    // Ensure there are active states in the previous level
    let prevActiveStates =
      currentState[currentLevel]?.filter((state) => !state.isRecursive) || [];

    if (prevActiveStates.length > 0) {
      // Sort the active states based on the heuristic
      prevActiveStates.sort((a, b) => a.manhattanDistance - b.manhattanDistance);

      // Destructure the data property only if there are active states
      const { data } = prevActiveStates[prevActiveStates.length - 1];
      const { i, j } = findZero(data);
      const actions = ['u', 'l', 'd', 'r'];

      for (const action of actions) {
        const goal = performAction(prevActiveStates[prevActiveStates.length - 1], i, j, action);
        if (goal) {
          break;
        }
      }
    }

    setCurrentState((prevState) => {
      const newState = [...prevState];
      newState[newLevel] = [...queue];
      return newState;
    });
    setCurrentLevel(newLevel);
    console.log(queue);
  };

  useEffect(() => {
    if (!isGoalState) {
      // setTimeout(() => {
        performStateSpaceSearch();
      // }, 1000);
    }
  }, [currentLevel, isGoalState]);

  return (
    <>
      <div className="flex flex-col bg-slate-300">
        <h1 className="text-2xl text-center text-white bg-violet-700 p-4 font-extrabold ">
          DFS Eight Puzzle Problem State Space Tree(Heuristic)
        </h1>
        <hr></hr>
        <div>
          <ArcherContainer
            strokeColor="black"
            noCurves={false}
            startMarker={true}
            endMarker={false}
          >
            <div className="flex flex-col justify-center items-center">
              {currentState.map((items, parentIndex) => (
                <div key={parentIndex} className="flex gap-4">
                  {items.map((item, childIndex) => (
                    <div
                      className="flex items-center mx-[20px] my-[50px] gap-2"
                      key={childIndex}
                    >
                      <ArcherElement
                        id={item.id}
                        relations={[
                          {
                            targetId: item.parentId,
                            sourceAnchor: 'top',
                            targetAnchor: 'bottom',
                            label: item.action,
                            style: { strokeWidth: 2 },
                            startMarker: true,
                          },
                        ]}
                      >
                        <div className="flex flex-col justify-center items-center">
                          <PuzzleBox state={item} ref={myRef} />

                          <div className="flex flex-col py-1 px-2 m-1 rounded-lg bg-blue-300">
                            <span className="text-sm font-semibold">{`id=${item.id}`}</span>
                            <span className="text-sm font-semibold">{`f=${item.manhattanDistance}`}</span>
                          </div>
                        </div>
                      </ArcherElement>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </ArcherContainer>
        </div>
      </div>
    </>
  );
};

export default EightPuzzleDFS;
