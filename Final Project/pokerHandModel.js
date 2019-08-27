class PokerGame {
	
	constructor() {
		this.cardDeck = this.createCardDeck();
		this.cardCombination = { result : ["High card"] };
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
			
			cardDeck[suit] = cardDeckPerSuit;
			cardDeckPerSuit = [];
		});
		
		return cardDeck;
	}

	getCardCombination(cardsOnHand) {
		let isValid = this.isCardsOnHandValid(cardsOnHand.hand);

		if(isValid) {
			this.pairComparator(cardsOnHand.hand);
			this.flushOrStraightComparator(cardsOnHand.hand);
			
			return this.cardCombination;
		} else {
			return { result: ["Some cards are not valid OR duplicate cards OR did not meet the required input (should provide 5 cards)"] };
		}
	}

	isCardsOnHandValid(cardsOnHand) {
		let hasInvalidCard = [];

		if(cardsOnHand.length > 5 || cardsOnHand.length < 5) {
			return false;
		}

		if(cardsOnHand.filter((item, index) => cardsOnHand.indexOf(item) != index).length > 0) {
			return false;
		}

		cardsOnHand.forEach((card) => {
			card = card.toUpperCase();

			let cardOnHandSuit = card[card.length - 1];
			let cardDeckSuitsToCheck = this.cardDeck[cardOnHandSuit];

			if(cardDeckSuitsToCheck === undefined) {
				hasInvalidCard.push("NotAvailable");
			} else if(!cardDeckSuitsToCheck.includes(card)) {
				hasInvalidCard.push(card);
			}
		});

		return hasInvalidCard.length > 0 ? false : true;
	}

	flushOrStraightComparator(cardOnHand) {
		if(this.isOnTheSameSuit(cardOnHand) && this.isInSequence(cardOnHand) && this.hasAceHighCard(cardOnHand)) {
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
		
		let rankCardsValue = cardOnHand.map((card) => { card = card.toUpperCase(); return card.replace(card.slice(-1), ""); });
		
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
			card = card.toUpperCase();

			cardOnHandSuits.push(card[card.length - 1]);	
		});
		
		let result = cardOnHandSuits.filter((value, index) => { return cardOnHandSuits.indexOf(value) === index; }); 
		return result.length === 1;
	}

	isInSequence(cardOnHand) { 
		let cardOnHandValues = [];
		cardOnHand.forEach((card) => {
			let cardValue = "";
			card = card.toUpperCase();

			if(card.includes("0")) {
				cardValue = card.slice(0, 2);
			} else {
				cardValue = card.slice(0, 1);
			}

			if(isNaN(cardValue)) {
				let equivalentValue = this.convertHighRankToValue(cardValue);
				cardOnHandValues.push(equivalentValue);
			} else {
				cardOnHandValues.push(cardValue);	
			}
		});

		let customSort = function(a, b) {
			return (Number(a) - Number(b));
		}
		
		let sortedValues = cardOnHandValues.sort(customSort);
		return sortedValues.every((value, i) => !Number.isNaN(value) && (i === 0 || (Number(sortedValues[i - 1]) < Number(value) && (Number(value) - Number(sortedValues[i - 1]) === 1)))); 
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

	hasAceHighCard(cardOnHand) {
		if(cardOnHand.some((card) => { card = card.toUpperCase(); return card.includes("A"); })) {
			return true;
		} else {
			return false;
		}
	}
}

exports.getCardCombination = function(cardOnHand) {
	const poker = new PokerGame();
	let result = poker.getCardCombination(cardOnHand);

	return result;
};


