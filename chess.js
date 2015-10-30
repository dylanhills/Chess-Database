var selectedSquare = [0,0];
var clickState = "select";
var letterArray = ["a","b","c","d","e","f","g","h"];
var easyConvert = new Array(8);
var board = new Array(8);
var legalMoves = [[]];
var whiteQueensideCastle = true;
var whiteKingsideCastle = true;
var blackQueensideCastle = true;
var blackKingsideCastle = true;
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
	setSquare(0,0,"bRook");
	setSquare(0,1,"bKnight");
	setSquare(0,2,"bBishop");
	setSquare(0,3,"bQueen");
	setSquare(0,4,"bKing");
	setSquare(0,5,"bBishop");
	setSquare(0,6,"bKnight");
	setSquare(0,7,"bRook");
	setSquare(1,0,"bPawn");
	setSquare(1,1,"bPawn");
	setSquare(1,2,"bPawn");
	setSquare(1,3,"bPawn");
	setSquare(1,4,"bPawn");
	setSquare(1,5,"bPawn");
	setSquare(1,6,"bPawn");
	setSquare(1,7,"bPawn");

	setSquare(7,0,"wRook");
	setSquare(7,1,"wKnight");
	setSquare(7,2,"wBishop");
	setSquare(7,3,"wQueen");
	setSquare(7,4,"wKing");
	setSquare(7,5,"wBishop");
	setSquare(7,6,"wKnight");
	setSquare(7,7,"wRook");
	setSquare(6,0,"wPawn");
	setSquare(6,1,"wPawn");
	setSquare(6,2,"wPawn");
	setSquare(6,3,"wPawn");
	setSquare(6,4,"wPawn");
	setSquare(6,5,"wPawn");
	setSquare(6,6,"wPawn");
	setSquare(6,7,"wPawn");
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
generateLegalMoves = function(rank,file){
	var piece = board[rank][file];
	lM = [];
	switch(piece){
		case "wPawn":
			if(board[rank-1][file] == ""){
				lM.push([rank-1,file]);
				if(rank == 6 && board[rank-2][file] == ""){
					lM.push([rank-2,file]);}}
			if(file>0 && board[rank-1][file-1].charAt(0) == "b"){
				lM.push([rank-1,file-1]);}
			if(file<7 && board[rank-1][file+1].charAt(0) == "b"){
				lM.push([rank-1,file+1]);}
			break;
		case "bPawn":
			if(board[rank+1][file] == ""){
				lM.push([rank+1,file]);
				if(rank == 1 && board[rank+2][file] == ""){
					lM.push([rank+2,file]);}}
			if(file>0 && board[rank+1][file-1].charAt(0) == "w"){
				lM.push([rank+1,file-1]);}
			if(file<7 && board[rank+1][file+1].charAt(0) == "w"){
				lM.push([rank+1,file+1]);}
			break;
		case "bRook":
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
			break;
		case "wRook":
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
		case "bKnight":
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
		case "wKnight":
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
		case "bBishop":
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
		case "wBishop":
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
		case "bQueen":
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
		case "wQueen":
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
		case "bKing":
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
		case "wKing":
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
	var counter = 0;
	var output = "";
	for(var i = 0; i<board.length; i++){
		console.log("hello "+i);
		for(var j = 0; j<8; i++){
			if(board[i][j] != ""){
				if(counter !=0){output+=""+counter;}
				counter = 0;
				output+=board[i][j].charAt(1);
			}
			else{
				counter++;
			}
		}
		output+="/";
	}
	return output;
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
setUpStandardGame();
console.log(generateFEN());