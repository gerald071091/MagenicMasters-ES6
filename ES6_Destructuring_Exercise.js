// dummy data

var dummyData = [
    { name: "RedHorse", score: 10 },
    { name: "SanMigLight", score: 8 },
	{ name: "PalePilsen", score: 9 },
	{ name: "TigerBeer", score: 9 },
	{ name: "hoegaarden", score: 8 },
	{ name: "SanMigSuperDry", score: 7 },
	{ name: "Colt45", score: 6},
	{ name: "Coors", score : 8},
	{ name: "GoldEagle", score: 5 }
];

function contestantOverallDetails(contestant, contestantsDetails) {
	var result = { isTied: false, scoreEqualityCount: 0 };
	
	result.scoreEqualityCount = contestantsDetails.filter(function(contestantDetails) {
		return contestantDetails.score === contestant.score;
	}).length;
	
	if(result.scoreEqualityCount > 1) {
		result.isTied = true;
	}
	
	return result;
}

function processRankingContestants(contestantsDetails) {
	
	var sortedDetails = contestantsDetails.sort((a, b) => parseFloat(b.score) - parseFloat(a.score));

	var finalizeContestantsDetails = [];
	
	sortedDetails.forEach((contestant) => {
		var contestantResultDetails = contestantOverallDetails(contestant, sortedDetails);
		
		if(!finalizeContestantsDetails.some(function(details) { return details.score === contestant.score; })) {
			if(contestantResultDetails.isTied) {
				finalizeContestantsDetails.push({ 
					name: contestantResultDetails.scoreEqualityCount.toString(), 
					score: contestant.score 
				});
			} else {
				finalizeContestantsDetails.push(contestant);
			}
		}
	});
	
	return finalizeContestantsDetails;
}

function showTemplateResults(contestantsDetails) {
	if(contestantsDetails.length > 3) {
		let destructuringTopThreeContestants = [{name, score}, {name, score}, {name, score}] = processRankingContestants(contestantsDetails);
		var result = `The winners are:\n`;
		var topThree = 0;
		
		while(topThree < 3) {
			
			var contestant = destructuringTopThreeContestants[topThree];
			
			if(topThree === 0) {
				result += `\n(1st) ${contestant.name} scored ${contestant.score} out of 10`;
			} else if (topThree === 1) {
				result += `\n(2nd) ${contestant.name} scored ${contestant.score} out of 10`;
			} else {
				result += `\n(3rd) ${contestant.name} scored ${contestant.score} out of 10`;
			}
			
			topThree++;
		}
		
		return console.info(result);
	} else {
		return console.info(`Error: The minimum number of participant should be at least 3 to proceed.`);
	}
	
}

function rankingTool(contestantsDetails) {
	return showTemplateResults(contestantsDetails);
}

// execute

rankingTool(dummyData);