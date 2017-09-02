// ClozeCard constructor will be exposed (methods within)
// Text parameter corresponds to the full text of the question/flashcard
// Cloze parameter corresponds to the 'cloze-deleted' portion of the full text (usually just a single word).
// If the portion that we are saying corresponds to the cloze portion is not found in the full text, then an error will be thrown
module.exports.ClozeCard = function(text, cloze) {
	// Convert the incoming strings to lower case
	var textToLower = text.toLowerCase();
	var clozeToLower = cloze.toLowerCase();

	// Constructor should throw or log an error when the cloze deletion does not appear in the input text.
	if (!textToLower.includes(clozeToLower)) {
		console.log('ERROR: Cloze-deletion portion not found in input text.  Check punctuation and the full text again. -- <' + cloze + '>');
		return;
	}

	this.full = text;
	this.cloze = cloze;
	this.partial = text.replace(cloze, '...');
}
