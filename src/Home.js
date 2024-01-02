import React from 'react';
import Card from './component/Card';
import { useNavigate } from 'react-router-dom';
const Home = () => {
  const navigate = useNavigate();

  const clickCannibelHandler = ()=>{
    navigate('/missionaries-cannibals')
  }

  return (
    <div className="flex justify-center items-center h-screen  bg-slate-300 p-10">
      {/* <div className="flex  gap-10 p-10 bg-blue-400"> */}

        {/* <div className=''>
          <img src="missionaries.jpeg" alt="" />
          <button className='h-20 bg-blue-900 text-white ' type="button" onClick={clickCannibelHandler}>Run Problem</button>
        </div> */}
        <Card
          title="Missionaries and Cannibals Problem"
          image="missionaries.jpeg"
          onClick={() => {
            navigate('/missionaries-cannibals');
          }}
        />
        <Card
          title="BFS Eight Puzzle Problem"
          image="eightpuzzle.png"
          onClick={() => {
            navigate('/eight-puzzle-bfs');
          }}
        />
        <Card
          title="DFS Eight Puzzle Problem"
          image="eightpuzzle.png"
          onClick={() => {
            navigate('/eight-puzzle-dfs');
          }}
        />
        <Card
          title="A Star Eight Puzzle Problem"
          image="eightpuzzle.png"
          onClick={() => {
            navigate('/eight-puzzle-a-star');
          }}
        />
      {/* </div> */}
    </div>
  );
};

export default Home;
