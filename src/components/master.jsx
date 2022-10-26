import React from 'react';
import { useEffect } from 'react';
import './master.scss'

function Master() {
    const newdifficulty = 22;
    const grid = new Array(newdifficulty).fill(0).map(row => new Array(newdifficulty).fill(0))
    useEffect(() => {
        const grid = document.querySelector('.grid');
        grid.style.gridTemplateColumns = `repeat(${newdifficulty}, 1fr)`
        
    })
    const n=newdifficulty;
    const bombCount = 26;
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
    function validCountBlock(p, q, n){ //Assigns count only in the cell is valid
        if(p>=0 && p<n && q>=0 && q<n && grid[p][q]!=='💣')
		grid[p][q]+=1;
        return;
    }
    const baseButtonColor = "#d0d0d7";
    const flagColor = "rgb(219, 1, 31)";
    useEffect(() => {
        for(let i=0; i<n; i++){
            for(let j=0; j<n; j++){
                if(grid[i][j]=='💣'){
                    document.querySelector(`.cell-${i}-${j} .cell-text`).style.display = "none";
                }
                var cellButton = document.querySelector(`.cell-${i}-${j} .cell-btn`);
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
                cellButton.addEventListener("click", function(){
                    if(document.querySelector(`.cell-${i}-${j} .cell-btn`).style.backgroundColor != flagColor){
                        ifBomb(i, j);
                        //console.log("clickety");
                        document.querySelector(`.cell-${i}-${j} .cell-btn`).style.display = "none";    
                        
                        document.querySelector(`.cell-${i}-${j} .cell-text`).innerText = grid[i][j];
                    }
                });
                
            }
        }
    })

    function ifBomb(i, j){
        if(grid[i][j] === '💣'){
            const allCellButtons = document.querySelectorAll('.cell-btn');
            allCellButtons.forEach((cellButton) => {
                cellButton.style.display = "none";
                document.querySelector('.grid').style.pointerEvents = "none";
                document.querySelector('.game-over').style.display = "none";
                document.querySelector(`.cell-${i}-${j} .cell-text`).style.display = "none";

            });
            for(let i=0; i<n; i++){
                for(let j=0; j<n; j++){
                    document.querySelector(`.cell-${i}-${j} .cell-text`).innerText = grid[i][j];
                }
            }
        }
        return;
    }

    return (
        <>
            <div className='grid'>
                {grid.map((row, rowId) => (
                    <div key={rowId} className='row'>
                        {row.map((cell, cellId) => (
                            <div key={cellId} className={`cell master-cell cell-${rowId}-${cellId}`}>
                                <div className='cell-text'></div>
                                <button className='cell-btn'></button>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <div className='game-over'><span>Game Over</span></div>
        </>
    )
}

export default Master;