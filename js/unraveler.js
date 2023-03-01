/*              .-~~~~~~~~~-._       _.-~~~~~~~~~-.
				__.'              ~.   .~              `.__
			 .'//   UnraveleR II   \./        v 0.8     \\`.
		  .'//                     |                     \\`.
		.'// .-~"""""""~~~~-._     |     _,-~~~~"""""""~-. \\`.    
	 .'//.-"                 `-.  |  .-'                 "-.\\`.
  .'//______.============-..   \ | /   ..-============.______\\`.
.'______________________________\|/______________________________`. */
//	random boredom circa 2016
// - subVoid


var SPEED = 0.8;

// array cleaner
Array.prototype.clean = function (deleteValue) {
	for (var i = 0; i < this.length; i++) {
		if (this[i] == deleteValue || this[i].length <= 0) {
			this.splice(i, 1);
			i--;
		}
	}
	return this;
};

// clears the text area
function clearText() {
	document.getElementById("textBox").value = "";
	document.getElementById("outputArea").textContent = "<cleared>"
	setTimeout(function () { document.getElementById("outputArea").textContent = "UnraveleR II" }, 1000);
}

function toggleGlow() {
	// if has x
	let ele = document.getElementById("reader");
	if (document.getElementById("glowToggle").checked) {
		ele.classList.add("glows");
	} else {
		ele.classList.remove("glows");
	}
}

function togglePlasmaText() {
	// if has x
	let ele = document.getElementById("outputArea");
	if (document.getElementById("plasmaToggle").checked) {
		ele.classList.remove("plasmaOverride");
	} else {
		ele.classList.add("plasmaOverride");
	}
}

function letsGo() {
	$('html, body').animate({ scrollTop: 0 }, 'fast');
	// declaring variables
	var output = document.getElementById("outputArea");
	// gets the content of the text area after removing returns and new lines
	var content = document.getElementById("textBox").value.replace(/[\n\r]/g, " ");
	var startButton = document.getElementById("startButton");
	var stopButton = document.getElementById("stopButton");
	var clearButton = document.getElementById("clearButton");
	// replace all returns with spaces for split function

	// Check if input is empty
	if (content.length < 3 || !(/\S/.test(content))) {
		output.textContent = "<input is empty>";
		setTimeout(function () { output.textContent = "UnraveleR II" }, 1000);
	} else { // input not empty
		var words = content.split(" ");
		// clean up the words array	
		//--- spaces
		var idx = words.indexOf(" ");
		while (idx != -1) {
			words.splice(idx, 1);
			var idx = words.indexOf(" ");
		}
		//--- blank entries
		words.clean(undefined);
		if (words[words.length - 1] == " " || words[words.length - 1].length == 0) {
			words.pop();
		}
		// checks for too few words after cleaning
		if (words.length < 3) {
			SPEED = document.getElementById("speed").value;
			output.textContent = "<input is empty>"
			setTimeout(function () { output.textContent = "UnraveleR II" }, 1000);
		} else {
			// reading loop
			// initialize variables
			var i = 0;
			var dDefault = (100 * SPEED);
			var delay = dDefault;
			var stop = false;
			var displayWord = "placeholder";
			var lastChar = 'Q';
			var wLen = 64;
			// disabling start button and clear buttons
			startButton.disabled = true; startButton.className = "inactive";
			clearButton.disabled = true; clearButton.className = "inactive";
			// enabling the stop button
			stopButton.onclick = function () { stop = true; };
			stopButton.disabled = false;
			stopButton.className = "active";
			// loop
			function f() {
				// update speed vars
				SPEED = document.getElementById("speed").value;
				dDefault = (100 * SPEED);
				// check for Stop
				if (stop == true) {
					output.textContent = "<stopped>";
					i = 9999;
				} else {
					// update word vars
					displayWord = words[i];
					wLen = displayWord.length;
					lastChar = displayWord.charAt(wLen - 1);
					// update the display
					output.textContent = displayWord;
					// add delay based on the length of the word
					delay = dDefault + (wLen * 16);
					// check for commas or periods and add delay
					if (lastChar == ',' || lastChar == '!') {
						delay += (100 * SPEED);
					} else if (lastChar == '.' || lastChar == '?') {
						delay += (300 * SPEED);
					}
				}
				i++;
				if (i < words.length) {
					setTimeout(f, delay);
				} else { // end of loop functions
					setTimeout(function () {
						// replace the output after a delay
						output.textContent = "--";
						// turn the start and clear buttons back on
						startButton.className = "active"; startButton.disabled = false;
						clearButton.className = "active"; clearButton.disabled = false;
						// turn the stop button back off
						stopButton.setAttribute("onclick", null);
						stopButton.className = "inactive"; stopButton.disabled = true;
					}, 1000);
				}
			}
			f();
		}
	}
}