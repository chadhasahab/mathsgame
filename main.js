var playing = false;
var score;
var action;
var timeremaining;
var correctAnswer;

document.getElementById("startreset").onclick = function(){
        
    if(playing == true){
        //reload the current page
        location.reload();
    }else{
       score = 0;
       playing = true;
       show("timeremaining");
       timeremaining = 60;
       document.getElementById("scorevalue").innerHTML = score;
       document.getElementById("timeremainingvalue").innerHTML = timeremaining;
       //hide game over box
       hide("gameover");
       document.getElementById("startreset").innerHTML = "Reset Game";

       startCounter();

       generateQA();

    }

}

//click on the answer box
for(var i = 1; i < 5; i++){
document.getElementById("box"+i).onclick = function(){
    if(playing == true){
        if(this.innerHTML == correctAnswer){
            score++;

            document.getElementById("scorevalue").innerHTML = score;
            hide("wrong");
            show("correct");
            setTimeout(function(){
                hide("correct");
            },1000);

            generateQA();

           // startCounter();
            
        }else{
            hide("correct");
            show("wrong");
            setTimeout(function(){
                hide("wrong");
            },1000);

            generateQA();

        }
    }
}
}


function startCounter(){
    timeremaining = 60;
    action = setInterval(function(){
        timeremaining -= 1;
            document.getElementById("timeremainingvalue").innerHTML = timeremaining;   
        if(timeremaining == 0){ //gameover
            stopCounter();
             show("gameover");
            document.getElementById("gameover").innerHTML = "<p>Game Over!</p><p>Your Score is "+score+"</p>";
            hide("timeremaining");
            hide("correct");
            hide("wrong");
            playing = false;

            document.getElementById("startreset").innerHTML = "Start Game";
        } 
        
    },1050);
}

function stopCounter(){
    clearInterval(action);
}

function hide(Id){
    document.getElementById(Id).style.display = "none";
}

function show(Id){
    document.getElementById(Id).style.display = "block";
}

function generateQA(){
    var x = 1 + Math.round(9*Math.random());
    var y = 1 + Math.round(Math.random()*9);
    correctAnswer = x*y;

    document.getElementById("question").innerHTML = x+"x"+y;

    var correctposition = 1 + Math.round(3*Math.random());

    document.getElementById("box"+correctposition).innerHTML = correctAnswer;
    var answer = [correctAnswer];
    for(var i = 1; i<5; i++){
        if(i !== correctposition){
            var wrongAnswer;
            do{
                wrongAnswer = (1 + Math.round(9*Math.random())) * (1 + Math.round(9*Math.random()));
                
            }while(answer.indexOf(wrongAnswer) > -1)
            document.getElementById("box"+i).innerHTML = wrongAnswer;
            answer.push(wrongAnswer);
    
        }
    }
    // startCounter();
}