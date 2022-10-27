import React from 'react';
import { useState, useEffect } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import './app.scss'
import Beginner from './components/beginner';
import Intermediate from './components/intermediate';
import Master from './components/master';

function App() {
  	const [difficulty, setDifficulty] = useState(() => {
		return "Beginner";
	});
	var order=9;
	var numberOfBombs=9;
	function setOrder(difficulty){
		if(difficulty == "Beginner"){order = 9;}
		else if(difficulty == "Intermediate"){order = 16;}
		else if(difficulty == "Master"){order = 22;}
		return;
	}
	function setBombCount(difficulty){
		if(difficulty == "Beginner"){numberOfBombs=10;}
		else if(difficulty == "Intermediate"){numberOfBombs=19;}
		else if(difficulty == "Master"){numberOfBombs=26;}
		return;
	}
	setOrder(difficulty);
	setBombCount(difficulty);

	
	function refresh(){
		window.location.reload(true);
    }

	return (
		<>
		<main>
			<menu>
				<h1>Minesweeper</h1>
				<span>Choose Difficulty:</span>
				<Link to="/beginner"><button className='beginner-btn' onClick={() => setDifficulty("Beginner")}>Beginner</button></Link>
				<Link to="/intermediate"><button className='intermediate-btn' onClick={() => setDifficulty("Intermediate")}>Intermediate</button></Link>
				<Link to="/master"><button className='master-btn' onClick={() => setDifficulty("Master")}>Master</button></Link>
				<div className='details'>
					<h3>Difficulty:<br/><b>{difficulty}</b></h3>
					<h3>Grid:<br/><b>{order} x {order}</b></h3>
					<h3>Number Of Bombs<br/><b>{numberOfBombs}</b></h3>
					<h3>made by aprameya shankar</h3>
				</div>
				<a  href="javascript:location.reload(true)"><button className='restart'>Start Over</button></a>
				{/*<a><button className='restart' onClick={refresh()}>Start Over</button></a> */}
			</menu>
			<div className='board'>
				<Routes>
					<Route path='/beginner' element={<Beginner />} />
					<Route path='/intermediate' element={<Intermediate />} />
					<Route path='/master' element={<Master />} />
				</Routes>
			</div>
		</main>
		<footer>© 2022 All rights reserved.</footer>
		</>
	)
}


export default App;
