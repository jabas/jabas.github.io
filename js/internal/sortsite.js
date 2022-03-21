(function ( $ ) {
///

var triggeredRules = $('tr[id^="rule-"]');

function drawNotes(ruleId, clippy) {
	var targetEl = $('tr[id="' + ruleId + '"]').parent(); 
	var note = '<tbody><tr><td></td><td colspan="3">';
	note += '<h5>Josh Says: ' + clippy.status + '</h5>';
	note += '<p>' + clippy.text + '</p>';
	note += '</td></tr></tbody>';
	targetEl.after(note);
}

triggeredRules.each(function(){
	var el = $(this);
	var ruleId = el.attr('id');
	var clippy = {
		status: '',
		text: ''
	};

	switch(ruleId) {
		case 'rule-AccWcag2-F87-1':
			clippy.status = 'Ignore';
			clippy.text = 'While there are a few instances of this, they exist for purely stylistic purposes and are accompanied by other text for screen readers.';
			break;
		case 'rule-AccHtmlImgDecorativeAltMissing':
			clippy.status = 'Undetermined';
			clippy.text = 'I have yet to be able to identify what this is referencing. Presumably it is a tracking pixel.';
			break;
		case 'rule-W3cHtml5Error-errDuplicateId':
			clippy.status = 'Fix';
			clippy.text = 'In addition to breaking associations needed for accessibility, duplicate IDs can cause functional issues on the page for all users.';
			break;
		case 'rule-W3cHtml5Error-RnvErElem-style':
			clippy.status = 'Ignore';
			clippy.text = 'This is caused by our Brightcove Video Component, and we do not have direct control over its code. While the error is technically true by the spec, every browser supports style elements inside the body element.';
			break;
		case 'rule-AccHtmlFrameTitleMissing':
			clippy.status = 'Ignore';
			clippy.text = 'This is caused by some of the third-party tools added via Launch (like Moxie Chat) that do not title their iframes. We do not have any control over these.';
			break;
		case 'rule-AccWcag1-1.1.8':
			clippy.status = 'Ignore';
			clippy.text = 'This is caused by the Facebook tracking pixel, which is missing its alt. We are unable to fix this internally.';
			break;
		case 'rule-AccHtmlControlLabelMissing':
			clippy.status = 'Ignore';
			clippy.text = 'This is caused by third-party javascript (Privy) that creates and deletes an improperly labelled input.';
			break;
		default:
			clippy.status = 'This is New';
			clippy.text = 'This error has not been researched yet.';
			break;
	}

	drawNotes(ruleId, clippy);

});

///
}( jQuery ));