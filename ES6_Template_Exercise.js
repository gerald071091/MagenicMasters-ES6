function consonantCounter(result) {
	var count, consonants = 0;
	for(count = 0; count < result.length; count++) {
		var consonantChar = result.charAt(count);
		
		if(consonantChar.match(/[bcdfghjklmnpqrstvwxyz]/i)) {
			consonants++
		}
	}
	
	return consonants;
}

function vowelCounter(result) {
	return Array.from(result).filter(vowel => 'aeiouAEIOU'.includes(vowel)).length;
}

function wordCounter(result) {
	return result.split(' ').length;
}


function showTemplateResult(results, wordCount, vowelCount, consonantCount) {
	console.info(`Input: ${results}
		Number of word(s) found: ${wordCount}
		Number of vowel(s) found: ${vowelCount}
		Number of consonant(s) found: ${consonantCount}`);
}

// dummy data

var dummyData = "The quick brown QA jumps over the lazy Dev.";

function wordProcessor(dataString) {
	var wordCount = wordCounter(dataString);
	var vowelCount = vowelCounter(dataString);
	var consonantCount = consonantCounter(dataString);
	
	return showTemplateResult(dataString, wordCount, vowelCount, consonantCount);
}

// execute

wordProcessor(dummyData);