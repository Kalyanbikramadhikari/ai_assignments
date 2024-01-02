import React from 'react';
import { useState, useEffect } from 'react';
import { ArcherContainer, ArcherElement } from 'react-archer';

const Missionaries = () => {
  const initialState = {
    M: 3,
    C: 3,
    boat: false,
    currentLevel: 0,
    id: '1', // root node is 1
    parentId: '',
    isDead: false,
    isRecursive: false,
    action: '',
  };

  const [currentLevel, setCurrentLevel] = useState(0);
  const [stateArray, setStateArray] = useState([[initialState]]);

  const [isGoalState, setIsGoalState] = useState(false);

  const isRecursive = (stateToCheck, currentArray) => {
    //stateToCheck checks whether the given state already exits in state tree
    // currentArray represents the current level


    //check for recursion in previous state levels
    for (const state of stateArray) {
      for (const item of state) {
        if (
          item.M === stateToCheck.M &&
          item.C === stateToCheck.C &&
          item.boat === stateToCheck.boat
        ) {
          return true;
        }
      }
    }

    // Check for recursion in the current state level
    for (const item of currentArray) {
      if (
        item.M === stateToCheck.M &&
        item.C === stateToCheck.C &&
        item.boat === stateToCheck.boat
      ) {
        return true;
      }
    }

    return false;
  };

  const isGoalStateReached = (state) => {
    return state.M === 0 && state.C === 0;
  };

  const generatePossibleState = () => {
    //if goal state already reached just return
    if (isGoalState) return;

    // increment current level
    const tempLevel = currentLevel + 1;
    
    //this filters out the states from previous level which is not dead and not recursive
    const previousLevelStates =
      [...stateArray[currentLevel]]?.filter(
        (state) => !state.isDead && !state.isRecursive
      ) || [];

    
    const newStateArray = [];

    const performAction = (state, action, MChange, CChange) => {
      const newState = { ...state };
      newState.M += MChange;
      newState.C += CChange;
      newState.currentLevel = newState.currentLevel + 1;
      newState.boat = !newState.boat;

      // check if the state exceeds the limit of missionaries and cannibals
      if (
        newState.M < 0 ||
        newState.M > 3 ||
        newState.C < 0 ||
        newState.C > 3
      ) {
        return;
      }

      // check if the state is valid or not
      if (
        newState.M >= 0 &&
        newState.M <= 3 &&
        newState.C >= 0 &&
        newState.C <= 3 &&
        (newState.M === 0 ||
          3 - newState.M === 0 ||
          (newState.M >= newState.C && 3 - newState.M >= 3 - newState.C))
      ) {
        const result = isRecursive(newState, newStateArray);
        if (result) newState.isRecursive = true;
      } else {
        newState.isDead = true;
      }

      newState.action = action;
      newState.id = `${state.id}${newStateArray.length}`;
      newState.parentId = `${state.id}`;
      newStateArray.push(newState);

      if (isGoalStateReached(newState)) {
        setIsGoalState(true);
      }
    };

    previousLevelStates.forEach((state) => {
      if (!state.boat) {
        performAction(state, '[1,0]', -1, 0);
        performAction(state, '[2,0]', -2, 0);
        performAction(state, '[0,1]', 0, -1);
        performAction(state, '[0,2]', 0, -2);
        performAction(state, '[1,1]', -1, -1);
      } else {
        performAction(state, '[1,0]', 1, 0);
        performAction(state, '[2,0]', 2, 0);
        performAction(state, '[0,1]', 0, 1);
        performAction(state, '[0,2]', 0, 2);
        performAction(state, '[1,1]', 1, 1);
      }
    });

    setStateArray((prevState) => {
      prevState[tempLevel] = newStateArray;
      return [...prevState];
    });

    setCurrentLevel(tempLevel);
  };

  const getColor = (state) => {
    if (state.currentLevel === 0) return 'blue';
    if (state.isRecursive) return 'grey';
    if (state.isDead) return 'red';
    if (state.M === 0 && state.C === 0 && state.boat) return 'green';
    return 'green';
  };

  // useEffect(() => {
  //   if (!isGoalState) {
      
  //     generatePossibleState();
  //   }
  // }, [currentLevel]);
  useEffect(() => {
    if (!isGoalState) {
      setTimeout(()=>{
        
      })
      
    }
  }, [currentLevel]);

  const [showNextState, setShowNextState] = useState(false);

  useEffect(() => {
    if (!isGoalState) {
      const timeoutId = setTimeout(() => {
        generatePossibleState();
        setShowNextState(true);
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [currentLevel, isGoalState]);

  return (
    <div>
      <h1 className="text-2xl text-center text-white bg-violet-700 p-4 font-extrabold ">
        Missionaries and Cannibals State Space Tree
      </h1>

      <ArcherContainer
        strokeColor="black"
        // noCurves={false}
        startMarker={true}
        endMarker={false}
      >
        <div className="flex flex-col justify-center items-center bg-slate-300">
          {stateArray.map((items, parentIndex) => (
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
                    
                    <div
                      className={`p-3 flex justify-center items-center  border-2 w-20 h-20 text-white font-bold`}
                      style={{ backgroundColor: getColor(item) }}
                    >
                      {`[${item.M},${item.C},${!item.boat ? 'R' : 'L'}]`}
                    </div>
                  </ArcherElement>
                </div>
              ))}
            </div>
          ))}
        </div>
      </ArcherContainer>
    </div>
  );
};

export default Missionaries;
