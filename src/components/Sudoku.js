import React from 'react';
import styled from "styled-components"
import ReactPlayer from 'react-player'

class Sudoku extends React.Component {
    constructor(props) {
        super(props);
        this.state = {targetNum: undefined, 
                      start: false, 
                      correct: null, 
                      nums: [[5, 3, 6, 8, 2, 7, 9, 4, 1],
                            [1, 7, 2, 9, 6, 4, 3, 5, 8],                                              
                            [8, 9, 4, 1, 5, 3, 2, 6, 7],                                                                          
                            [7, 1, 5, 3, 4, 9, 8, 2, 6],                                                                          
                            [6, 4, 3, 7, 8, 2, 1, 9, 5],                                                                          
                            [9, 2, 8, 5, 1, 6, 7, 3, 4],                                                                          
                            [4, 8, 1, 2, 9, 5, 6, 7, 3],                                                                          
                            [3, 6, 9, 4, 7, 1, 5, 8, 2],                                                                    
                            [2, 5, 7, 6, 3, 8, 4, 1, 9]],                                                                                                    
                      fixed: [[(new Array(9)).fill(false)],
                             [(new Array(9)).fill(false)],
                             [(new Array(9)).fill(false)],
                             [(new Array(9)).fill(false)],
                             [(new Array(9)).fill(false)],
                             [(new Array(9)).fill(false)],
                             [(new Array(9)).fill(false)],
                             [(new Array(9)).fill(false)],
                             [(new Array(9)).fill(false)]],
                      prevNums: [],
                      prevTargets: [],
                      first: false,
                      undo: false, 
                      confetti: false, 
                      music: null};

    }

    init(empty) {
        const startAudio = new Audio("./music/gameStart.mp3");
        startAudio.play();
        let count = 0;
        let arr = this.state.nums;
        let fixArr = this.state.fixed;
        this.setState({start: true});
        while (count < empty){
            const rand =  Math.floor(Math.random()*80);
            const line = Number(Math.floor(rand / 9));
            const row = Number(rand % 9);
            if (arr[line][row] !== null) { 
                arr[line][row] = null;
                fixArr[line][row] = true;
            }
            else 
                continue;

            count++;
        }
        this.state.prevNums.push(this.state.nums);     

        switch (empty) {

            case 1: 
                //audio = new Audio("easy-music.mp3");
                setTimeout(() => {this.setState({music: <ReactPlayer url="./music/easy-music.mp3" playing loop volume="0.3" height="0px"/>})}, 400);
                break;
            case 40:
                setTimeout(() => {this.setState({music: <ReactPlayer url="./music/normal-music.mp3" playing loop volume="0.3" height="0px"/>})}, 350);
                break;
            case 60:
                setTimeout(() => {this.setState({music: <ReactPlayer url="./music/hard-music.mp3" playing loop volume="0.3" height="0px"/>})}, 100);
                break;
            default:
                break;
        }
    }

    back() {
        this.setState({targetNum: undefined, start: false, prevNums: [], prevTargets: [], first: false, undo: false, correct: null, confetti: false, music: null,
            nums: [[5, 3, 6, 8, 2, 7, 9, 4, 1],
                    [1, 7, 2, 9, 6, 4, 3, 5, 8],                                              
                    [8, 9, 4, 1, 5, 3, 2, 6, 7],                                                                          
                    [7, 1, 5, 3, 4, 9, 8, 2, 6],                                                                          
                    [6, 4, 3, 7, 8, 2, 1, 9, 5],                                                                          
                    [9, 2, 8, 5, 1, 6, 7, 3, 4],                                                                          
                    [4, 8, 1, 2, 9, 5, 6, 7, 3],                                                                          
                    [3, 6, 9, 4, 7, 1, 5, 8, 2],                                                                    
                    [2, 5, 7, 6, 3, 8, 4, 1, 9]], 
            fixed: [[(new Array(9)).fill(false)],
                    [(new Array(9)).fill(false)],
                    [(new Array(9)).fill(false)],
                    [(new Array(9)).fill(false)],
                    [(new Array(9)).fill(false)],
                    [(new Array(9)).fill(false)],
                    [(new Array(9)).fill(false)],
                    [(new Array(9)).fill(false)],
                    [(new Array(9)).fill(false)]]});
    }


    showCells(count) {  /*マス目表示*/
        let cells = [];
        const line = 9*count;
        for (let i = 0; i < 9; i++) {
            if (this.state.nums[count][i] !== null) {  //数字ボタン押下後のマス
                if (line+i === this.state.targetNum) {
                    const str = `cell${this.state.nums[count][i]}-target.png`;
                    if (this.state.first){  //数字入力後 className を初期化
                        cells.push(<img src={str} class="cell" />);
                        setTimeout(() => {this.setState({first: false})}, 10);
                        if (!this.state.undo) { 
                            this.state.prevNums.push(this.state.nums);   
                            this.state.prevTargets.push(this.state.targetNum); 
                        }
                    }
                    else  //10msec後、画像を回転
                        cells.push(<img src={str} class="cell rot" />);
                }
                else {
                    const str = `cell${this.state.nums[count][i]}.png`;
                    cells.push(<img src={str} class="cell" onClick={() => {this.targetCell(line+i)}} />);
                }
            }
            else if (line+i === this.state.targetNum) { //選択したマス
                cells.push(<img src="cell-target2.png" class="cell" />);      
            }
            else 
                cells.push(<img src="cell.png" value="line+i" class="cell" onClick={() => {this.targetCell(line+i)}} />);  //空白マス

        }
        return cells;
    }

    showBoxes() {
        let boxes = [];
        for (let i = 1; i <= 3; i++){
            boxes.push(<img src="box.png" class="box"/>);
        }
        //boxes.push(<br />);
        return boxes;
    }

    showButtons(count) {  /*数字ボタン表示*/
        let buttons = [];
        for (let i = 1; i <= 3; i++) 
            buttons.push(<span class="button" id={3*count+i} onClick={(e) => {this.inputNumber(e)}}>{3*count+i}</span>);      
        return buttons;
    }

    targetCell(num) {  /*マス選択後の処理*/
        if (this.state.correct === null && this.state.fixed[Math.floor(num / 9)][num % 9])  //正解時、数字を変えられないようにする
            this.setState({targetNum: num});
    }

    inputNumber(e) {  /*数字ボタン押下後の処理*/
        const line = Math.floor(this.state.targetNum / 9);
        const row = this.state.targetNum % 9;

        if (this.state.targetNum !== undefined) {  //初期状態にどのマスも選択していない場合、数字を変えられないようにする
            this.setState(prevState => ({  //配列nums を部分的に更新
                nums: prevState.nums.map(
                (obj,i) => ((i === line) ? obj.map( (obj2,j) => ((j === row) ? Number(e.target.id) : obj2))  : obj)
                )
            }));

            if (this.state.prevTargets[this.state.prevTargets.length-1] === this.state.targetNum && this.state.prevNums[this.state.prevNums.length-1][line][row] === Number(e.target.id))
                this.setState({first: false, undo: false});
            else
                this.setState({first: true, undo: false});

            const audio = (Math.floor(Math.random()*2) == 0) ? new Audio("./music/altNum.mp3") : new Audio("./music/altNum2.mp3");
            audio.play();
        }
    }

    checkCell() {
        for (let i = 0; i < 9; i++) {
            if (this.state.nums[i].includes(null))
                return;
        }
        return <span class="answer btn" onClick={() => {this.checkAnswer()}}>ANSWER</span>;
    }

    checkAnswer() {
        let nextH = 0;
        let nextV = 0;
        let arr = this.state.nums;
        let arr2 = (new Array(9)).fill(0);
        let arr3 = (new Array(9)).fill(0);
        for (let i = 0; i < 9; i++) {  
            if (!arr[i].every((v, i2, item) => item.indexOf(v) === i2))  //横列が全て異なる数字ではない場合
                return 0;

            arr2 = arr.map((item) => item[i]);
            if (!arr2.every((v, i2, item) => item.indexOf(v) === i2))   //縦列が全て異なる数字ではない場合
                return 0;
                   
            for (let k = 0; k < 3; k++) {
                for (let l = 0; l < 3; l++){
                    arr3[3*k+l] = arr[k+nextV][l+nextH];
                }
            }
            if (!arr3.every((v, i2, item) => item.indexOf(v) === i2))   //ブロックが全て異なる数字ではない場合
                return 0;

            nextH += 3;
            if (nextH >= 9){
                nextH = 0;
                nextV += 3;
            }                 
        }
        console.log("correct!");
        this.setState({targetNum: null, correct: <p class="correct">Correct!</p>});
        const audio = new Audio("./music/child.wav");
        audio.play();
        this.setState({confetti: true})
    }

    undoCells() {
        if (!this.state.correct) {
            if (this.state.prevNums.length === 1) {  //初期状態なら pop しない
                this.setState({nums: this.state.prevNums[0], targetNum: null, first: true, undo: true});
            }
            else {
                this.state.prevNums.pop();
                this.state.prevTargets.pop();
                this.setState({nums: this.state.prevNums[this.state.prevNums.length-1], targetNum: this.state.prevTargets[this.state.prevTargets.length-1], first: true, undo: true});
            }
        
            const audio = new Audio("./music/undoNum.mp3");
            audio.play();
        }
    }

    setConfetti() {
        let confetties = [];
        if (this.state.confetti) {
            for (let i = 0; i < 78; i++) {
                const color1 = Math.floor(Math.random()*16).toString(16);
                const color2 = Math.floor(Math.random()*16).toString(16);
                const color3 = Math.floor(Math.random()*16).toString(16);
                const CONF = styled.h3`
                padding: 3px 7px;
                margin-left: 10px;
                margin-top: -100px;
                background-color: #${color1}${color2}${color3};
                transition: all 5s;
                display: inline-block;
                animation: confettiRotate 0.5s linear infinite, confettiFall 3s linear infinite;
                animation-delay: ${Math.random()*5}s;
                opacity: 0;
                `
                confetties.push(<CONF class="confetti"></CONF>);
            }
            confetties.push(<br />);   
        }
        else {
                const CONF = styled.h3`
                padding: 3px 7px;
                margin-left: 10px;
                margin-top: -100px;
                transition: all 5s;
                display: none;
                `
                confetties.push(<CONF class="top-brank"></CONF>);
            confetties.push(<br />);   
        }
        
        return confetties;
    }
    

    render() {
        let count = 0;
        let mainGame;
        let startButton;
        let level;
        
        if (this.state.start) {
            mainGame = (
                <div class="sudoku-container">  
                    <div class="sudoku-main">
                    <div class="box-container">
                            {this.showBoxes()}
                        </div>
                        {this.showCells(count)}
                        
                    </div>
                    <span class="count">{count++}</span>
                    <div class="sudoku-main">
                        {this.showCells(count)}
                        <div class="box-container2">
                            {this.showBoxes()}
                        </div>
                    </div>
                    <span class="count">{count++}</span>
                    <div class="sudoku-main">
                        {this.showCells(count)}
                        <div class="box-container3">
                            {this.showBoxes()}
                        </div>
                    </div>
                    <span class="count">{count++}</span>
                    <div class="sudoku-main">
                        {this.showCells(count)}
                    </div>
                    <span class="count">{count++}</span>
                    <div class="sudoku-main">
                        {this.showCells(count)}
                    </div>
                    <span class="count">{count++}</span>
                    <div class="sudoku-main">
                        {this.showCells(count)}
                    </div>
                    <span class="count">{count++}</span>
                    <div class="sudoku-main">
                        {this.showCells(count)}
                    </div>
                    <span class="count">{count++}</span>
                    <div class="sudoku-main">
                        {this.showCells(count)}
                    </div>
                    <span class="count">{count++}</span>
                    <div class="sudoku-main">
                        {this.showCells(count)}
                    </div>
                    <span class="count">{count=0}</span>
                    
                    <div class="buttons">
                        {this.showButtons(count)}
                        <span class="count">{count++}</span>
                    </div>  
                    <div class="buttons">
                        {this.showButtons(count)}
                        <span class="count">{count++}</span>
                    </div>
                    <div class="buttons">
                        {this.showButtons(count)}
                        <span class="count">{count=0}</span>
                    </div> 
                    <div class="sudoku-container2">
                        <span class="undo btn2" onClick={() => {this.undoCells()}}>UNDO</span>;
                        {this.checkCell()}
                        {this.state.correct}
                    </div>
                </div>
                );
                startButton = "";
                level = (
                    <span class="level btn2" onClick={() => {this.back()}}>レベル選択</span>
                );
        }
        else {
            mainGame = "";
            startButton = (
                <div>
                    <span class="easy btn" onClick={() => {this.init(1)}}>EASY</span>
                    <span class="normal btn" onClick={() => {this.init(40)}}>NORMAL</span>
                    <span class="hard btn" onClick={() => {this.init(60)}}>HARD</span>
                </div>
            );
            level ="";
        }

        return(
            <div class="all-container">
                {this.setConfetti()}    
                <div class="sudoku-header">
                        <h1 class="sudoku-title">Sudoku</h1>     
                        <a href="../" class="top btn2">Topに戻る</a>
                </div> 
                <br />
                <br />
                {level}
                {mainGame}
                {startButton}
                {/* {this.state.music} */}
            </div>
        );
    }

}

export default Sudoku;