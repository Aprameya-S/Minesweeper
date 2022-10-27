import React from 'react';
import { useEffect } from 'react';



function Beginner() {
    const newdifficulty = 9;
    const grid = new Array(newdifficulty).fill(0).map(row => new Array(newdifficulty).fill(0))
    useEffect(() => {
        const grid = document.querySelector('.grid');
        grid.style.gridTemplateColumns = `repeat(${newdifficulty}, 1fr)`
        
    })
    const n=newdifficulty;
    const bombCount = 10;
    //Place bombs
    for(let i=0; i<bombCount; i++){ 
        let random1 = Math.floor(Math.random() * n);
        let random2 = Math.floor(Math.random() * n);
        if(grid[random1][random2] === '💣'){
            i--;
            continue;
        }
        else{
            grid[random1][random2] = '💣';
        }
    }  
    //Place count cells
    for(let i=0; i<n; i++){
        for(let j=0; j<n; j++){
            if(grid[i][j]==='💣'){
                validCountBlock(i-1, j, n);
                validCountBlock(i-1, j+1, n);
                validCountBlock(i, j+1, n);
                validCountBlock(i+1, j+1, n);
                validCountBlock(i+1, j, n);
                validCountBlock(i+1, j-1, n);
                validCountBlock(i, j-1, n);
                validCountBlock(i-1, j-1, n);
            }
        }
    }
    //Assigns count only in the cell is valid
    function validCountBlock(p, q, n){ 
        if(p>=0 && p<n && q>=0 && q<n && grid[p][q]!=='💣')
		grid[p][q]+=1;
        return;
    }
    
    const baseButtonColor = "#d0d0d7";
    const flagColor = "rgb(219, 1, 31)";
    useEffect(() => {
        for(let i=0; i<n; i++){
            for(let j=0; j<n; j++){
                if(grid[i][j]==='💣'){
                    document.querySelector(`.cell-${i}-${j} .cell-text`).style.display = "none";
                }
                var cellButton = document.querySelector(`.cell-${i}-${j} .cell-btn`);
                //Flagging
                cellButton.addEventListener("contextmenu", function(e){
                    e.preventDefault();
                    if(document.querySelector(`.cell-${i}-${j} .cell-btn`).style.backgroundColor == flagColor){
                        document.querySelector(`.cell-${i}-${j} .cell-btn`).style.backgroundColor = "rgb(0, 0, 0)";
                        document.querySelector(`.cell-${i}-${j} .cell-btn`).addEventListener("mouseover", function(){
                            document.querySelector(`.cell-${i}-${j} .cell-btn`).style.backgroundColor = baseButtonColor;
                        })
                        document.querySelector(`.cell-${i}-${j} .cell-btn`).addEventListener("mouseout", function(){
                            document.querySelector(`.cell-${i}-${j} .cell-btn`).style.backgroundColor = "rgb(0, 0, 0)";
                        })
                    }
                    else {
                        console.log("righty");
                        document.querySelector(`.cell-${i}-${j} .cell-btn`).style.backgroundColor = flagColor;
                    }
                });
                //Revealing
                cellButton.addEventListener("click", function(){
                    if(document.querySelector(`.cell-${i}-${j} .cell-btn`).style.backgroundColor != flagColor){
                        ifBomb(i, j);
                        ifBlank(i, j);
                        onWin();
                        //console.log("clickety");
                        document.querySelector(`.cell-${i}-${j} .cell-btn`).style.display = "none";    
                        
                        if(grid[i][j] != 0){
                            document.querySelector(`.cell-${i}-${j} .cell-text`).innerText = grid[i][j];
                        }
                    }
                });
                
            }
        }

    })

    //Set grey color to blank tiles
    useEffect(() => {
        function blankTiles(){
            for(let i=0; i<n; i++){
                for(let j=0; j<n; j++){
                    if(grid[i][j] == 0){
                        document.querySelector(`.cell-${i}-${j} .cell-text`).style.backgroundColor = "#b4b4b8";
                    }
                }
            }
        }
        blankTiles();
    })
    
    //If Bomb cell is clicked
    function ifBomb(i, j){
        if(grid[i][j] === '💣'){
            const allCellButtons = document.querySelectorAll('.cell-btn');
            allCellButtons.forEach((cellButton) => {
                cellButton.style.display = "none";
                document.querySelector('.grid').style.pointerEvents = "none";
                document.querySelector('.game-over').style.display = "grid";
                document.querySelector(`.cell-${i}-${j} .cell-text`).style.display = "none";

            });
            for(let i=0; i<n; i++){
                for(let j=0; j<n; j++){
                    if(grid[i][j] != 0){
                       document.querySelector(`.cell-${i}-${j} .cell-text`).innerText = grid[i][j]; 
                    }
                }
            }
        }
        return;
    }
    
    //Recursively reveal surrounding cells if blank cell is clicked
    function revealIfNotBlank(i, j){
        if(grid[i][j]!=0){
            document.querySelector(`.cell-${i}-${j} .cell-text`).innerText = grid[i][j];
        }
    }
    function ifValid(i, j){
        if(i>=0 && i<n && j>=0 && j<n && document.querySelector(`.cell-${i}-${j} .cell-btn`).style.display != "none"){
            document.querySelector(`.cell-${i}-${j} .cell-btn`).style.display = "none";
            revealIfNotBlank(i, j);
            ifBlank(i, j);
        }
    }
    function ifBlank(i, j){
        if(grid[i][j]==0){
            ifValid(i-1, j);
            ifValid(i-1, j+1);
            ifValid(i, j+1);
            ifValid(i+1, j+1);
            ifValid(i+1, j);
            ifValid(i+1, j-1);
            ifValid(i, j-1);
            ifValid(i-1, j-1);
        }
    }
    //ON winning
    function onWin(){
        let count = 0;
        for(let i=0; i<n; i++){
            for(let j=0; j<n; j++){
                if(document.querySelector(`.cell-${i}-${j} .cell-btn`).style.display != "none"){
                    count++;
                }
            }
        }
        if(count == bombCount){
            const allCellButtons = document.querySelectorAll('.cell-btn');
            allCellButtons.forEach((cellButton) => {
                cellButton.style.display = "none";
                document.querySelector('.grid').style.pointerEvents = "none";
                document.querySelector('.winner').style.display = "grid";

            });
        }
    }

    return (
        <>
            <div className='grid'>
                {grid.map((row, rowId) => (
                    <div key={rowId} className='row'>
                        {row.map((cell, cellId) => (
                            <div key={cellId} className={`cell cell-${rowId}-${cellId}`}>
                                <div className='cell-text'></div>
                                <button className='cell-btn'></button>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <div className='winner'><span>You Win!</span></div>
            <div className='game-over'><span>Game Over</span></div>
        </>
    )
}

export default Beginner;