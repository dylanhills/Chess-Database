var selectedSquare = [0,0];
var clickState = "select";
var letterArray = ["a","b","c","d","e","f","g","h"];
var easyConvert = new Array(8);
var board = new Array(8);
var castlingAvailability;
var enPassantSquare;
var halfMoveCounter;
var fullMoveNumber;
var whiteToMove;
var legalMoves = new Object();


for(var i = 0; i<8; i++){
	board[i] = new Array(8);
	easyConvert[i] = new Array(8);
	for(var j = 0; j<8; j++){
		board[i][j] = "";
		easyConvert[i][j] = letterArray[j]+""+(8-i);
	}
}
setSquare = function(row,col,piece){
	board[row][col] = piece;
	document.getElementById(easyConvert[row][col]).innerHTML = piece;
}
setUpStandardGame = function(){
	whiteToMove = true;
	halfMoveCounter = 0;
	fullMoveNumber = 1;
	enPassantSquare = "-";
	castlingAvailability = "KQkq";

	setSquare(0,0,"r");
	setSquare(0,1,"n");
	setSquare(0,2,"b");
	setSquare(0,3,"q");
	setSquare(0,4,"k");
	setSquare(0,5,"b");
	setSquare(0,6,"n");
	setSquare(0,7,"r");
	setSquare(1,0,"p");
	setSquare(1,1,"p");
	setSquare(1,2,"p");
	setSquare(1,3,"p");
	setSquare(1,4,"p");
	setSquare(1,5,"p");
	setSquare(1,6,"p");
	setSquare(1,7,"p");

	setSquare(7,0,"R");
	setSquare(7,1,"N");
	setSquare(7,2,"B");
	setSquare(7,3,"Q");
	setSquare(7,4,"K");
	setSquare(7,5,"B");
	setSquare(7,6,"N");
	setSquare(7,7,"R");
	setSquare(6,0,"P");
	setSquare(6,1,"P");
	setSquare(6,2,"P");
	setSquare(6,3,"P");
	setSquare(6,4,"P");
	setSquare(6,5,"P");
	setSquare(6,6,"P");
	setSquare(6,7,"P");
}
setUpHordeGame1 = function(){
	whiteToMove = true;
	halfMoveCounter = 0;
	fullMoveNumber = 1;
	enPassantSquare = "-";
	castlingAvailability = "KQ";
	setSquare(0,0,"r");
	setSquare(0,1,"n");
	setSquare(0,2,"b");
	setSquare(0,3,"q");
	setSquare(0,4,"k");
	setSquare(0,5,"b");
	setSquare(0,6,"n");
	setSquare(0,7,"r");
	setSquare(1,0,"p");
	setSquare(1,1,"p");
	setSquare(1,2,"p");
	setSquare(1,3,"p");
	setSquare(1,4,"p");
	setSquare(1,5,"p");
	setSquare(1,6,"p");
	setSquare(1,7,"p");
	for(var i = 7; i>3; i--){
		for(var j = 0; j<8; j++){
			setSquare(i,j,"P");
		}
	}
	setSquare(3,1,"P");
	setSquare(3,2,"P");
	setSquare(3,5,"P");
	setSquare(3,6,"P");
}
setUpHordeGame2 = function(){
	whiteToMove = true;
	halfMoveCounter = 0;
	fullMoveNumber = 1;
	enPassantSquare = "-";
	castlingAvailability = "KQ";

	setSquare(0,0,"r");
	setSquare(0,1,"n");
	setSquare(0,2,"b");
	setSquare(0,3,"q");
	setSquare(0,4,"k");
	setSquare(0,5,"b");
	setSquare(0,6,"n");
	setSquare(0,7,"r");
	setSquare(1,0,"p");
	setSquare(1,1,"p");
	setSquare(1,2,"p");
	setSquare(1,3,"p");
	setSquare(1,4,"p");
	setSquare(1,5,"p");
	setSquare(1,6,"p");
	setSquare(1,7,"p");
	for(var i = 7; i>3; i--){
		for(var j = 0; j<8; j++){
			setSquare(i,j,"P");
		}
	}
}
selectSquare = function(rank,file){
	selectedSquare = [rank,file];
	document.getElementById(easyConvert[rank][file]).classList.add("selected");
}
delelectSquare = function(rank,file){
	document.getElementById(easyConvert[selectedSquare[0]][selectedSquare[1]]).classList.remove("selected");
	selectedSquare = [-1,-1];
}
movePiece = function(rank,file){
	//castling doesnt work!!!!!
	//if(selectedSquare[0] == 7 && selectedSquare[1] == 5){whiteQueensideCastle = false; whiteKingsideCastle = false;}
	//if(selectedSquare[0] == 7 && selectedSquare[1] == 0){whiteQueensideCastle = false;}
	//if(selectedSquare[0] == 7 && selectedSquare[1] == 7){whiteKingsideCastle = false;}
	//if(rank == 7)
	setSquare(rank,file,board[selectedSquare[0]][selectedSquare[1]]);
	setSquare(selectedSquare[0],selectedSquare[1],"");
}
generateLegalMoves = function(){
	myLegalMoves = new Object();
	whiteToMove = false;
	for(var i = 0; i<8; i++){
		for(var j = 0; j<8; j++){
			if(board[i][j] != ""){
				if(whiteToMove){
					if(board[i][j].charAt(0).toUpperCase() == board[i][j]){
						legalMoves[easyConvert[i][j]] = generateMoveHelper(i,j,board[i][j]);
					}
				}
				else{//black to move
					if(board[i][j].charAt(0).toLowerCase() == board[i][j]){
						legalMoves[easyConvert[i][j]] = generateMoveHelper(i,j,board[i][j]);
					}
				}
			}
		}
	}
	console.log(legalMoves);
}
isUpperCase = function(char){
	if(char == ""){return false;}
	return char == char.toUpperCase();
}
generateMoveHelper = function(rank,file,piece){
	lM = [];
	switch(piece){
		case "P":
			if(board[rank-1][file] == ""){
				lM.push(easyConvert[rank-1][file]);
				if(rank == 6 && board[rank-2][file] == ""){
					lM.push(easyConvert[rank-2][file]);}}
			if(file>0 && !isUpperCase(board[rank-1][file-1].charAt(0))){
				lM.push(easyConvert[rank-1][file-1]);}
			if(file<7 && !isUpperCase(board[rank-1][file+1].charAt(0))){
				lM.push(easyConvert[rank-1][file+1]);}
			break;
		case "p":
			if(board[rank+1][file] == ""){
				lM.push(easyConvert[rank+1][file]);
				if(rank == 1 && board[rank+2][file] == ""){
					lM.push(easyConvert[rank+2][file]);}}
			if(file>0 && isUpperCase(board[rank+1][file-1].charAt(0))){
				lM.push(easyConvert[rank+1][file-1]);}
			if(file<7 && isUpperCase(board[rank+1][file+1].charAt(0))){
				lM.push(easyConvert[rank+1][file+1]);}
			break;
		case "r":
			for(var i = rank+1; i<8; i++){
				if(board[i][file] == ""){
					lM.push(easyConvert[i][file]);
				}else if(isUpperCase(board[i][file].charAt(0))){
					lM.push(easyConvert[i][file]);
					i = 8;
				}else{
					i = 8;
				}
			}
			for(var i = rank-1; i>-1; i--){
				if(board[i][file] == ""){
					lM.push(easyConvert[i][file]);
				}else if(isUpperCase(board[i][file].charAt(0))){
					lM.push(easyConvert[i][file]);
					i = -1;
				}else{
					i = -1;
				}
			}
			for(var i = file+1; i<8; i++){
				if(board[rank][i] == ""){
					lM.push(easyConvert[rank][i]);
				}else if(isUpperCase(board[rank][i].charAt(0))){
					lM.push(easyConvert[rank][i]);
					i = 8;
				}else{
					i = 8;
				}
			}
			for(var i = file-1; i>-1; i--){
				if(board[rank][i] == ""){
					lM.push(easyConvert[rank][i]);
				}else if(isUpperCase(board[rank][i].charAt(0))){
					lM.push(easyConvert[rank][i]);
					i = -1;
				}else{
					i = -1;
				}
			}
			break;
			/*
		case "R":
			for(var i = rank+1; i<8; i++){
				if(board[i][file] == ""){
					lM.push([i,file]);
				}else if(board[i][file].charAt(0) == "b"){
					lM.push([i,file]);
					i = 8;
				}else{
					i = 8;
				}
			}
			for(var i = rank-1; i>-1; i--){
				if(board[i][file] == ""){
					lM.push([i,file]);
				}else if(board[i][file].charAt(0) == "b"){
					lM.push([i,file]);
					i = -1;
				}else{
					i = -1;
				}
			}
			for(var i = file+1; i<8; i++){
				if(board[rank][i] == ""){
					lM.push([rank,i]);
				}else if(board[rank][i].charAt(0) == "b"){
					lM.push([rank,i]);
					i = 8;
				}else{
					i = 8;
				}
			}
			for(var i = file-1; i>-1; i--){
				if(board[rank][i] == ""){
					lM.push([rank,i]);
				}else if(board[rank][i].charAt(0) == "b"){
					lM.push([rank,i]);
					i = -1;
				}else{
					i = -1;
				}
			}
			break;
		case "n":
			if(rank-1>-1 && file-2 >-1 && board[rank-1][file-2].charAt(0) != "b"){
				lM.push([rank-1,file-2]);
			}
			if(rank-1>-1 && file+2 <8 && board[rank-1][file+2].charAt(0) != "b"){
				lM.push([rank-1,file+2]);
			}
			if(rank-2>-1 && file-1 >-1 && board[rank-2][file-1].charAt(0) != "b"){
				lM.push([rank-2,file-1]);
			}
			if(rank-2>-1 && file+1 <8 && board[rank-2][file+1].charAt(0) != "b"){
				lM.push([rank-2,file+1]);
			}
			if(rank+1<8 && file-2 >-1 && board[rank+1][file-2].charAt(0) != "b"){
				lM.push([rank+1,file-2]);
			}
			if(rank+1<8 && file+2 <8 && board[rank+1][file+2].charAt(0) != "b"){
				lM.push([rank+1,file+2]);
			}
			if(rank+2<8 && file-1 >-1 && board[rank+2][file-1].charAt(0) != "b"){
				lM.push([rank+2,file-1]);
			}
			if(rank+2<8 && file+1 <8 && board[rank+2][file+1].charAt(0) != "b"){
				lM.push([rank+2,file+1]);
			}
			break;
		case "N":
			if(rank-1>-1 && file-2 >-1 && board[rank-1][file-2].charAt(0) != "w"){
				lM.push([rank-1,file-2]);
			}
			if(rank-1>-1 && file+2 <8 && board[rank-1][file+2].charAt(0) != "w"){
				lM.push([rank-1,file+2]);
			}
			if(rank-2>-1 && file-1 >-1 && board[rank-2][file-1].charAt(0) != "w"){
				lM.push([rank-2,file-1]);
			}
			if(rank-2>-1 && file+1 <8 && board[rank-2][file+1].charAt(0) != "w"){
				lM.push([rank-2,file+1]);
			}
			if(rank+1<8 && file-2 >-1 && board[rank+1][file-2].charAt(0) != "w"){
				lM.push([rank+1,file-2]);
			}
			if(rank+1<8 && file+2 <8 && board[rank+1][file+2].charAt(0) != "w"){
				lM.push([rank+1,file+2]);
			}
			if(rank+2<8 && file-1 >-1 && board[rank+2][file-1].charAt(0) != "w"){
				lM.push([rank+2,file-1]);
			}
			if(rank+2<8 && file+1 <8 && board[rank+2][file+1].charAt(0) != "w"){
				lM.push([rank+2,file+1]);
			}
			break;
		case "b":
			height = 1;
			width = 1;
			while(rank-height>-1 && file-width>-1){
				if(board[rank-height][file-width] == ""){
					lM.push([rank-height,file-width]);
				}else if(board[rank-height][file-width].charAt(0) == "w"){
					lM.push([rank-height,file-width]);
					height = 100;
				}else{
					height = 100;
				}
				height++;
				width++;
			}
			height = 1;
			width = 1;
			while(rank+height<8 && file-width>-1){
				if(board[rank+height][file-width] == ""){
					lM.push([rank+height,file-width]);
				}else if(board[rank+height][file-width].charAt(0) == "w"){
					lM.push([rank+height,file-width]);
					height = 100;
				}else{
					height = 100;
				}
				height++;
				width++;
			}
			height = 1;
			width = 1;
			while(rank-height>-1 && file+width<8){
				if(board[rank-height][file+width] == ""){
					lM.push([rank-height,file+width]);
				}else if(board[rank-height][file+width].charAt(0) == "w"){
					lM.push([rank-height,file+width]);
					height = 100;
				}else{
					height = 100;
				}
				height++;
				width++;
			}
			height = 1;
			width = 1;
			while(rank+height<8 && file+width<8){
				if(board[rank+height][file+width] == ""){
					lM.push([rank+height,file+width]);
				}else if(board[rank+height][file+width].charAt(0) == "w"){
					lM.push([rank+height,file+width]);
					height = 100;
				}else{
					height = 100;
				}
				height++;
				width++;
			}
			break;
		case "B":
			height = 1;
			width = 1;
			while(rank-height>-1 && file-width>-1){
				if(board[rank-height][file-width] == ""){
					lM.push([rank-height,file-width]);
				}else if(board[rank-height][file-width].charAt(0) == "b"){
					lM.push([rank-height,file-width]);
					height = 100;
				}else{
					height = 100;
				}
				height++;
				width++;
			}
			height = 1;
			width = 1;
			while(rank+height<8 && file-width>-1){
				if(board[rank+height][file-width] == ""){
					lM.push([rank+height,file-width]);
				}else if(board[rank+height][file-width].charAt(0) == "b"){
					lM.push([rank+height,file-width]);
					height = 100;
				}else{
					height = 100;
				}
				height++;
				width++;
			}
			height = 1;
			width = 1;
			while(rank-height>-1 && file+width<8){
				if(board[rank-height][file+width] == ""){
					lM.push([rank-height,file+width]);
				}else if(board[rank-height][file+width].charAt(0) == "b"){
					lM.push([rank-height,file+width]);
					height = 100;
				}else{
					height = 100;
				}
				height++;
				width++;
			}
			height = 1;
			width = 1;
			while(rank+height<8 && file+width<8){
				if(board[rank+height][file+width] == ""){
					lM.push([rank+height,file+width]);
				}else if(board[rank+height][file+width].charAt(0) == "b"){
					lM.push([rank+height,file+width]);
					height = 100;
				}else{
					height = 100;
				}
				height++;
				width++;
			}
			break;
		case "q":
			for(var i = rank+1; i<8; i++){
				if(board[i][file] == ""){
					lM.push([i,file]);
				}else if(board[i][file].charAt(0) == "w"){
					lM.push([i,file]);
					i = 8;
				}else{
					i = 8;
				}
			}
			for(var i = rank-1; i>-1; i--){
				if(board[i][file] == ""){
					lM.push([i,file]);
				}else if(board[i][file].charAt(0) == "w"){
					lM.push([i,file]);
					i = -1;
				}else{
					i = -1;
				}
			}
			for(var i = file+1; i<8; i++){
				if(board[rank][i] == ""){
					lM.push([rank,i]);
				}else if(board[rank][i].charAt(0) == "w"){
					lM.push([rank,i]);
					i = 8;
				}else{
					i = 8;
				}
			}
			for(var i = file-1; i>-1; i--){
				if(board[rank][i] == ""){
					lM.push([rank,i]);
				}else if(board[rank][i].charAt(0) == "w"){
					lM.push([rank,i]);
					i = -1;
				}else{
					i = -1;
				}
			}
			height = 1;
			width = 1;
			while(rank-height>-1 && file-width>-1){
				if(board[rank-height][file-width] == ""){
					lM.push([rank-height,file-width]);
				}else if(board[rank-height][file-width].charAt(0) == "w"){
					lM.push([rank-height,file-width]);
					height = 100;
				}else{
					height = 100;
				}
				height++;
				width++;
			}
			height = 1;
			width = 1;
			while(rank+height<8 && file-width>-1){
				if(board[rank+height][file-width] == ""){
					lM.push([rank+height,file-width]);
				}else if(board[rank+height][file-width].charAt(0) == "w"){
					lM.push([rank+height,file-width]);
					height = 100;
				}else{
					height = 100;
				}
				height++;
				width++;
			}
			height = 1;
			width = 1;
			while(rank-height>-1 && file+width<8){
				if(board[rank-height][file+width] == ""){
					lM.push([rank-height,file+width]);
				}else if(board[rank-height][file+width].charAt(0) == "w"){
					lM.push([rank-height,file+width]);
					height = 100;
				}else{
					height = 100;
				}
				height++;
				width++;
			}
			height = 1;
			width = 1;
			while(rank+height<8 && file+width<8){
				if(board[rank+height][file+width] == ""){
					lM.push([rank+height,file+width]);
				}else if(board[rank+height][file+width].charAt(0) == "w"){
					lM.push([rank+height,file+width]);
					height = 100;
				}else{
					height = 100;
				}
				height++;
				width++;
			}
			break;
		case "Q":
			for(var i = rank+1; i<8; i++){
				if(board[i][file] == ""){
					lM.push([i,file]);
				}else if(board[i][file].charAt(0) == "b"){
					lM.push([i,file]);
					i = 8;
				}else{
					i = 8;
				}
			}
			for(var i = rank-1; i>-1; i--){
				if(board[i][file] == ""){
					lM.push([i,file]);
				}else if(board[i][file].charAt(0) == "b"){
					lM.push([i,file]);
					i = -1;
				}else{
					i = -1;
				}
			}
			for(var i = file+1; i<8; i++){
				if(board[rank][i] == ""){
					lM.push([rank,i]);
				}else if(board[rank][i].charAt(0) == "b"){
					lM.push([rank,i]);
					i = 8;
				}else{
					i = 8;
				}
			}
			for(var i = file-1; i>-1; i--){
				if(board[rank][i] == ""){
					lM.push([rank,i]);
				}else if(board[rank][i].charAt(0) == "b"){
					lM.push([rank,i]);
					i = -1;
				}else{
					i = -1;
				}
			}
			height = 1;
			width = 1;
			while(rank-height>-1 && file-width>-1){
				if(board[rank-height][file-width] == ""){
					lM.push([rank-height,file-width]);
				}else if(board[rank-height][file-width].charAt(0) == "b"){
					lM.push([rank-height,file-width]);
					height = 100;
				}else{
					height = 100;
				}
				height++;
				width++;
			}
			height = 1;
			width = 1;
			while(rank+height<8 && file-width>-1){
				if(board[rank+height][file-width] == ""){
					lM.push([rank+height,file-width]);
				}else if(board[rank+height][file-width].charAt(0) == "b"){
					lM.push([rank+height,file-width]);
					height = 100;
				}else{
					height = 100;
				}
				height++;
				width++;
			}
			height = 1;
			width = 1;
			while(rank-height>-1 && file+width<8){
				if(board[rank-height][file+width] == ""){
					lM.push([rank-height,file+width]);
				}else if(board[rank-height][file+width].charAt(0) == "b"){
					lM.push([rank-height,file+width]);
					height = 100;
				}else{
					height = 100;
				}
				height++;
				width++;
			}
			height = 1;
			width = 1;
			while(rank+height<8 && file+width<8){
				if(board[rank+height][file+width] == ""){
					lM.push([rank+height,file+width]);
				}else if(board[rank+height][file+width].charAt(0) == "b"){
					lM.push([rank+height,file+width]);
					height = 100;
				}else{
					height = 100;
				}
				height++;
				width++;
			}
			break;
		case "k":
			if(rank-1>-1){
				if(file-1>-1 && board[rank-1][file-1].charAt(0) != "b"){
					lM.push([rank-1,file-1]);
				}
				if(board[rank-1][file].charAt(0) != "b"){
					lM.push([rank-1,file]);
				}
				if(file+1<8 && board[rank-1][file+1].charAt(0) != "b"){
					lM.push([rank-1,file+1]);
				}
			}
			if(rank+1<8){
				if(file-1>-1 && board[rank+1][file-1].charAt(0) != "b"){
					lM.push([rank+1,file-1]);
				}
				if(board[rank+1][file].charAt(0) != "b"){
					lM.push([rank+1,file]);
				}
				if(file+1<8 && board[rank+1][file+1].charAt(0) != "b"){
					lM.push([rank+1,file+1]);
				}
			}
			if(file-1>-1 && board[rank][file-1].charAt(0) != "b"){
				lM.push([rank,file-1]);
			}
			if(file+1<8 && board[rank][file+1].charAt(0) != "b"){
				lM.push([rank,file+1]);
			}
			if(blackKingsideCastle && board[0][5] == "" && board[0][6] == ""){
				lM.push([0,6]);
			}
			if(whiteQueensideCastle && board[0][1] == "" && board[0][2] == "" && board[0][3] == ""){
				lM.push([0,2]);
			}
			break;
		case "K":
			if(rank-1>-1){
				if(file-1>-1 && board[rank-1][file-1].charAt(0) != "w"){
					lM.push([rank-1,file-1]);
				}
				if(board[rank-1][file].charAt(0) != "w"){
					lM.push([rank-1,file]);
				}
				if(file+1<8 && board[rank-1][file+1].charAt(0) != "w"){
					lM.push([rank-1,file+1]);
				}
			}
			if(rank+1<8){
				if(file-1>-1 && board[rank+1][file-1].charAt(0) != "w"){
					lM.push([rank+1,file-1]);
				}
				if(board[rank+1][file].charAt(0) != "w"){
					lM.push([rank+1,file]);
				}
				if(file+1<8 && board[rank+1][file+1].charAt(0) != "w"){
					lM.push([rank+1,file+1]);
				}
			}
			if(file-1>-1 && board[rank][file-1].charAt(0) != "w"){
				lM.push([rank,file-1]);
			}
			if(file+1<8 && board[rank][file+1].charAt(0) != "w"){
				lM.push([rank,file+1]);
			}
			if(whiteKingsideCastle && board[7][5] == "" && board[7][6] == ""){
				lM.push([7,6]);
			}
			if(whiteQueensideCastle && board[7][1] == "" && board[7][2] == "" && board[7][3] == ""){
				lM.push([7,2]);
			}
			break;
			*/
		default:
			break;
	}
	return lM;
}
selectLegalMoves = function(lM){
	for(var i = 0; i<lM.length; i++){
		document.getElementById(easyConvert[lM[i][0]][lM[i][1]]).classList.add("legalMove");
	}
}
deselectLegalMoves = function(lM){
	for(var i = 0; i<lM.length; i++){
		document.getElementById(easyConvert[lM[i][0]][lM[i][1]]).classList.remove("legalMove");
	}	
}
generateFEN = function(){
	var counter;
	var output = "";
	for(var i = 0; i<board.length; i++){
		counter = 0;
		for(var j = 0; j<board[0].length; j++){
			if(board[i][j] != ""){
				if(counter !=0){output+=""+counter;}
				counter = 0;
				output+=board[i][j].charAt(0);
			}
			else{
				counter++;
			}
		}
		if(counter!=0){
			output+=""+counter;
		}
		output+="/";
	}

	if(whiteToMove){output+=" w";}
	else{output+=" b";}
	output+=" "+castlingAvailability+" "+enPassantSquare+" "+halfMoveCounter+" "+fullMoveNumber;
	console.log(output);
}
inputFENHelper = function(){
	document.getElementById("FENOutput").innerHTML = inputFEN();
}
inputFEN = function(){
	for(var i =0; i<8; i++){
		for(var j = 0; j<8; j++){
			board[i][j] = "";
		}
	}
	FEN = document.getElementById("FENInput").value;
	var counter = 0;
	var currentChar;
	for(var i = 0; i<8; i++){
		for(var j = 0; j<8; j++){
			console.log(i+"  "+j);
			currentChar = FEN.charAt(counter);
			if(isNaN(currentChar)){
				board[i][j] = currentChar;
			}
			else{
				j+=parseInt(currentChar)-1;
			}
			counter++;
		}
		if(FEN.charAt(counter)!= "/" && i!=7){
			return "pieces invalid";
		}
		counter++;
	}
		console.log("hello");

	counter--;
	if(FEN.charAt(counter)!= " "){
	console.log(counter+"  "+FEN.charAt(counter-2)+" "+FEN.charAt(counter));
	return "too many pieces";}
	counter++;

	if(FEN.charAt(counter)=="w"){whiteToMove = true;}
	else if(FEN.charAt(counter)=="b"){whiteToMove = false;}
	else{return "white or black to move";}
	counter+=2;

	castlingAvailability = "";
	while(FEN.charAt(counter)!=" "){
		castlingAvailability+=FEN.charAt(counter);
		counter++;
	}
	counter++;

	if(FEN.charAt(counter)!="-"){enPassantSquare = "-";}
	else{
		enPassantSquare = FEN.charAt(counter)+FEN.charAt(counter+1);
		counter++;
	}
	if(FEN.charAt(counter)!= " "){return "space after enPassantSquare";}
	counter++;
	
	if(isNaN(parseInt(FEN.charAt(counter)))){return "invalid half move counter";}
	else{halfMoveCounter = parseInt(FEN.charAt(counter));}
	counter++;

	if(FEN.charAt(counter)!=" "){return "space after half move counter";}
	counter++;

	if(isNaN(parseInt(FEN.charAt(counter)))){return "invalid full move number";}
	else{fullMoveNumber = parseInt(FEN.charAt(counter));}
	populateBoard();
	console.log(board);
	console.log(whiteToMove);
	console.log(enPassantSquare);
	console.log(castlingAvailability);
	console.log(halfMoveCounter);
	console.log(fullMoveNumber);
	return "hurrah!";
}
squareClicked = function(rank,file){
	switch(clickState){
		case "select":
			if(board[rank][file] != ""){
				selectSquare(rank,file);
				legalMoves = generateLegalMoves(rank,file);
				selectLegalMoves(legalMoves);
				clickState = "movePiece";
			}
			break;
		case "movePiece":
			for(var i = 0; i<legalMoves.length; i++){
				if(legalMoves[i][0] == rank && legalMoves[i][1] == file){//legal move for that piece
					movePiece(rank,file);
					i = legalMoves.length;
				}
			}
			delelectSquare(rank,file);
			deselectLegalMoves(legalMoves);
			clickState = "select";
			break;
	}
}
populateBoard = function(){
	for(var i =0; i<8; i++){
		for(var j = 0; j<8; j++){
			document.getElementById(easyConvert[i][j]).innerHTML = board[i][j];		
		}
	}
}
console.log(isUpperCase("h"));
console.log(isUpperCase("S"));
console.log(isUpperCase(""));

setUpStandardGame();

$(function() {
    $(".tabs").click(function() {
        var tab = $(this).attr("data-tab");
        $(".tabContent").hide();
        $('.tabs').removeClass('active');
        $(this).addClass('active');
        $("#" + tab).show();
    });    
});