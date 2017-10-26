$(document).ready(function(){
  var you=0;
  var computer=0;
  var draws=0;
  
  var rounds=0;
  var board= [0,1,2,3,4,5,6,7,8];
  var gameIds=["sqBtn1","sqBtn2","sqBtn3","sqBtn4","sqBtn5","sqBtn6","sqBtn7","sqBtn8","sqBtn9"];
  var turns =0;
  var userIcon;
  var aiIcon;
  
  $("#btnX").click(function() {
    $("#frontPage,#coverSmall,#coverBig").fadeOut();
    userIcon = "X";
    aiIcon = "O";
  });
  $("#btnO").click(function() {
    $("#frontPage,#coverSmall,#coverBig").fadeOut();
    userIcon = "O";
    aiIcon = "X";
  });

function winCheck(board,player) {
    if (
    (board[0] == player && board[1] == player && board[2] == player) ||
    (board[3] == player && board[4] == player && board[5] == player) ||
    (board[6] == player && board[7] == player && board[8] == player) ||
    (board[0] == player && board[3] == player && board[6] == player) ||
    (board[1] == player && board[4] == player && board[7] == player) ||
    (board[2] == player && board[5] == player && board[8] == player) ||
    (board[0] == player && board[4] == player && board[8] == player) ||
    (board[2] == player && board[4] == player && board[6] == player)
  ) {
    return true;
  } else{
    return false;
  }
  }
  
  function emptyCheck(wadeva) {
  return wadeva.filter(function(s){return s!="O" && s!="X";});
}
  
  function minimax(btnGroup, icon) {
    let stillEmpty = emptyCheck(btnGroup);
    if (winCheck(btnGroup,aiIcon) === true) {
      return { score: 10 };
    } else if (winCheck(btnGroup,userIcon) === true) {
      return { score: -10 };
    } else if (stillEmpty.length === 0) {
      return { score: 0 };
    }
    var allMoves = [];
    for (var i = 0; i < stillEmpty.length; i++) {
      var move = {};
      move.index = btnGroup[stillEmpty[i]];
      btnGroup[stillEmpty[i]]=icon;
      
   if (icon == userIcon) {
        var final = minimax(btnGroup, aiIcon);
        move.score = final.score;
  } else if (icon == aiIcon) {
        var final = minimax(btnGroup, userIcon);
        move.score = final.score;
      }
     btnGroup[stillEmpty[i]]=move.index;
     allMoves.push(move);
    }
    var bestIndex;
    if (icon == aiIcon) {
      var treshold = -10000;
      for (var j = 0; j < allMoves.length; j++) {
        if (allMoves[j].score > treshold) {
          treshold = allMoves[j].score;
          bestIndex=j;
        }
      }
    }else{
      var treshold = 10000;
      for (var j = 0; j < allMoves.length; j++) {
        if (allMoves[j].score < treshold) {
          treshold = allMoves[j].score;
          bestIndex=j;
        }
      }
    }
 return allMoves[bestIndex];
   }

  function reset(){
    rounds = 0;
    turns=0;
  board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  $(".squareBtn").text("");
  };
  
function act(element,icon){
if (board[gameIds.indexOf(element.id)] != "X" && board[gameIds.indexOf(element.id)] != "O"){
  rounds++;
  $(element).text(icon);
  board[gameIds.indexOf(element.id)]=icon;
  console.log(board);
   if (winCheck(board, userIcon)) {
     turns=0;
      setTimeout(function() {
        alert("YOU WIN");
        you++;
  $("#youNum").text(you);
  
        reset();
      }, 500);
      return;
    } else if (rounds > 8) {
      setTimeout(function() {
        alert("TIE");
        draws++;
        $("#drawsNum").text(draws);  
        reset();
      }, 500);
      return;
    } else {
      rounds++;
      var index = minimax(board, aiIcon).index;
      var selector="#" + gameIds[index];
     $(selector).text(aiIcon);
      board[index] = aiIcon;
      console.log(board);
      console.log(index);
      if (winCheck(board, aiIcon)) {
        turns=1;
        setTimeout(function() {
          alert("YOU LOSE");
          computer++;
   $("#computerNum").text(computer);        
        reset();
        }, 500);
        return;
      } else if (rounds === 0) {
        setTimeout(function() {
          alert("tie");
          reset();
        }, 500);
        return;
      }
    }
  }
}
  
 $(".squareBtn").click(function(){
   if(turns===0){
    act(this,userIcon);
     }
  });

$("#resetBtn").click(function(){
    you=0;
    draws=0;
    computer=0;
  reset();
  $("#computerNum,#drawsNum,#youNum").text(0);
  $("#frontPage,#coverSmall,#coverBig").fadeIn();
  });

  
  
});
