class JankenGame {
	
	constructor() {
		this.playerRecordList = new Set([{player1Score: 0}, {player2Score: 0}]);
		
		this.rock = "rock";
		this.paper = "paper";
		this.scissor = "scissor";
	}
	
	async playersSelection(player1Selection, player2Selection) { 
		let playerRecordListIterator = this.playerRecordList[Symbol.iterator]();
		
		let player1Promise = new Promise((resolve, reject) => {
			resolve(playerRecordListIterator.next().value);
		}); 
		
		let player2Promise = new Promise((resolve, reject) => {
			resolve(playerRecordListIterator.next().value);
		}); 

		if(player1Selection === this.rock && player2Selection  === this.scissor ||
		   player1Selection === this.paper && player2Selection  === this.rock || 
		   player1Selection === this.scissor && player2Selection  === this.paper) {
			player1Promise.then(function(result) {
				result.player1Score++;
				console.info(`Player 1 ${player1Selection} \nPlayer 2 ${player2Selection}`);
				console.info(`Winner Player 1!`);
			});
			
		} else if(player2Selection === this.rock && player1Selection  === this.scissor ||
		   player2Selection === this.paper && player1Selection  === this.rock ||
		   player2Selection === this.scissor && player1Selection  === this.paper) {
			player2Promise.then(function(result) {
				result.player2Score++;
				console.info(`Player 1 ${player1Selection} \nPlayer 2 ${player2Selection}`);
				console.info(`Winner Player 2!`);
			});
		} else {
			console.info(`It's a Tie!`);
		}
		
		await this.bestOf5Result(player1Promise, player2Promise);
	}
	
	async bestOf5Result(player1Promise, player2Promise) {
		let player1PromiseResult = await player1Promise;
		let player2PromiseResult = await player2Promise;
		
		// show the winner of the game
		if(player1PromiseResult.player1Score === 3) {
			console.info(`Player 1 is the winner of Janken Game!`);
			player1PromiseResult.player1Score = 0;
		} else if (player2PromiseResult.player2Score === 3) {
			console.info(`Player 2 is the winner of Janken Game!`);
			player2PromiseResult.player2Score = 0;
		}
	}
}

// call playersSelection(player1, player2)
let jankenGame = new JankenGame();

// 1st round -- player 2 winner
jankenGame.playersSelection("rock","paper");

// 2nd round -- player 1 winner
jankenGame.playersSelection("scissor","paper");

// 3rd round -- player 1 winner
jankenGame.playersSelection("paper","rock");

// 4th round -- player 2 winner
jankenGame.playersSelection("paper","scissor");

// 5th round -- player 1 winner
jankenGame.playersSelection("rock", "scissor");