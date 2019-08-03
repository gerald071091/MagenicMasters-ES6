// dummy data

const dummyData = [
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
	let result = { isTied: false, tiedScoreCount: 0 };
	
	for(const [index, details] of contestantsDetails.entries()) {
		if(details.score === contestant.score) {
			result.tiedScoreCount++;
		}
	}
	
	if(result.tiedScoreCount > 1) {
		result.isTied = true;
	}
	
	return result;
}

function processRankingContestants(contestantsDetails) {
	
	const sortedDetails = contestantsDetails.sort((a, b) => parseFloat(b.score) - parseFloat(a.score));

	let finalizeContestantsDetails = [];
	
	for(const [index, contestant] of sortedDetails.entries()) {
		let contestantResultDetails = contestantOverallDetails(contestant, sortedDetails);
		
		if(!finalizeContestantsDetails.some(function(details) { return details.score === contestant.score; })) {
			if(contestantResultDetails.isTied) {
				finalizeContestantsDetails.push({ 
					name: contestantResultDetails.tiedScoreCount.toString(), 
					score: contestant.score 
				});
			} else {
				finalizeContestantsDetails.push(contestant);
			}
		}
	}
	
	return finalizeContestantsDetails;
}

function showTemplateResults(contestantsDetails) {
	if(contestantsDetails.length > 3) {
		const [first, second, third] = processRankingContestants(contestantsDetails);
		let result = `The winners are:\n`;
		
		result += `\n(1st) ${first.name} scored ${first.score} out of 10`;
		result += `\n(2nd) ${second.name} scored ${second.score} out of 10`;
		result += `\n(3rd) ${third.name} scored ${third.score} out of 10`;
	
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