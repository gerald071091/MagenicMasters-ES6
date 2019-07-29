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


function showTemplateResult(dataString, dummyData, wordCount, vowelCount, consonantCount) {
	var result = `${dataString[0]}${dummyData}${dataString[1]}${wordCount}`;
	
	if(wordCount > 0) {
		result += `${dataString[2]}${vowelCount}`;
	}
	
	if(consonantCount > 0) {
		result += `${dataString[3]}${consonantCount}`;
	}
	
	return console.info(result);
}

// dummy data

var dummyData = "The quick brown QA jumps over the lazy Dev. The quick brown QA jumps over the lazy Dev.";

function wordProcessor(dataString) {
	if(dataString.length < 50) {
		return console.info(`ERROR: The minimum length of the input string should be at least 
			50 characters for it to proceed`);
	}
	
	var wordCount = wordCounter(dataString);
	var vowelCount = vowelCounter(dataString);
	var consonantCount = consonantCounter(dataString);
	
	return showTemplateResult `Input: ${dummyData}\n \nNumber of word(s) found: ${wordCount} \nNumber of vowel(s) found: ${vowelCount} \nNumber of consonant(s) found: ${consonantCount}`; 
}

// execute

wordProcessor(dummyData);