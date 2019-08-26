class PokerGame {
	
	constructor() {
		this.cardDeck = this.createCardDeck();
		this.royalFlashCardCombination = this.cardDeck[3].slice(-5);
		this.cardCombination = { result: ["High card"] };
	}

	createCardDeck() {
		let cardSuits = new Set(["H", "C", "S", "D"]);
		let cardNumberValues = new Set(["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"]);
		let cardDeckPerSuit = [];
		let cardDeck = [];
		
		cardSuits.forEach((suit) => {
			cardNumberValues.forEach((cardNumber) => {
				let card = cardNumber + suit;
				cardDeckPerSuit.push(card);
			});
			
			cardDeck.push(cardDeckPerSuit);
			cardDeckPerSuit = [];
		});
		
		return cardDeck;
	}

	getCardCombination(cardsOnHand) {
		this.pairComparator(cardsOnHand);
		this.flushOrStraightComparator(cardsOnHand);
		
		return this.cardCombination;
	}

	flushOrStraightComparator(cardOnHand) {
		if(this.isCombinationalCardOnHand(cardOnHand, this.royalFlashCardCombination)) {
			// check if card on hand is royal flush
			this.cardCombination.result.push("Royal Flush");
		} else if(this.isOnTheSameSuit(cardOnHand) && this.isInSequence(cardOnHand)) {
			// check if card on hand is straight flush
			this.cardCombination.result.push("Straight Flush");
		} else if(this.isOnTheSameSuit(cardOnHand) && !this.isInSequence(cardOnHand)) {
			// check if card on hand is flush
			this.cardCombination.result.push("Flush");
		} else if (!this.isOnTheSameSuit(cardOnHand) && this.isInSequence(cardOnHand)) {
			// check if card on hand is straight
			this.cardCombination.result.push("Straight");
		}
	}
	
	pairComparator(cardOnHand) {
		let pairCardCount = [];

		let hasThreeCardsOnSameRank = false;
		let hasTwoCardsOnSameRank = false;
		
		let rankCardsValue = cardOnHand.map((card) => { return card.replace(card.slice(-1), ""); });
		
		rankCardsValue.forEach((rankCard) => {
			if(isNaN(rankCard)) {
				let equivalentRankCard = this.convertHighRankToValue(rankCard);
				pairCardCount[equivalentRankCard] = (pairCardCount[equivalentRankCard] || 0)+1;
			} else {
				pairCardCount[rankCard] = (pairCardCount[rankCard] || 0)+1; 
			}
		});
		
		if(pairCardCount.some((count) => { return count === 4; })) {
			// check if card on hand has four of a kind
			this.cardCombination.result.push("Four of a kind");
		} 
		
		if (pairCardCount.some((count) => { return count === 3; })) {
			// check if card on hand has three of a kind
			hasThreeCardsOnSameRank = true;
			this.cardCombination.result.push("Three of a kind");
		} 
		
		if (pairCardCount.some((count) => { return count === 2; })) {
			// check if card on hand has pair
			hasTwoCardsOnSameRank = true;
			this.cardCombination.result.push("Pair");
		}  
		
		if(hasTwoCardsOnSameRank) {
			if (pairCardCount.filter((value) => { return value === 2; }).length > 1) {
				// check if card on hand has two pair
				this.cardCombination.result.push("Two pair");
			}
		}
		
		if (hasThreeCardsOnSameRank && hasTwoCardsOnSameRank) {
			// check if card on hand has full house
			this.cardCombination.result.push("Full house");
		}
	}

	isOnTheSameSuit(cardOnHand) { 
		let cardOnHandSuits = [];
		cardOnHand.forEach((card) => {
			cardOnHandSuits.push(card.charAt(1));	
		});
		
		let result = cardOnHandSuits.filter((value, index) => { return cardOnHandSuits.indexOf(value) === index; }); 
		return result.length === 1;
	}

	isInSequence(cardOnHand) { 
		let cardOnHandValues = [];
		cardOnHand.forEach((card) => {
			let cardValue = card.charAt(0);
			if(isNaN(cardValue)) {
				let equivalentValue = this.convertHighRankToValue(cardValue);
				cardOnHandValues.push(equivalentValue);
			}
			
			cardOnHandValues.push(cardValue);	
		});
		
		let sortedValues = cardOnHandValues.concat().sort();
		return sortedValues.every((value, i) => !Number.isNaN(value) && (i === 0 || (sortedValues[i - 1] < value && (value - sortedValues[i - 1] === 1)))); 
	}

	convertHighRankToValue(value) {
		switch(value) {
			case "J":
				return "11";
			case "Q":
				return "12";
			case "K":
				return "13";
			case "A":
				return "14";
			default:
				return value;
		}
	}

	isCombinationalCardOnHand(cardOnHand, combination) {
		if (!Array.isArray(cardOnHand) || ! Array.isArray(combination) || cardOnHand.length !== combination.length) {
			return false;
		}
		
		let inputSort = cardOnHand.concat().sort();
		let combinationSort = combination.concat().sort();
		
		for(let index = 0; index < inputSort.length; index++) {
			if(inputSort[index] !== combinationSort[index]) {
				return false;
			}
		}
		 
		return true;
	}
}

exports.getCardCombination = function(cardOnHand) {
	const poker = new PokerGame();
	let result = poker.getCardCombination(cardOnHand);

	return result;
};


