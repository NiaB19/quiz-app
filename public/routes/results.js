// this file shows your quiz score and saves it to your profile

// get the score from the URL
// example: results.html?score=7&total=10
const urlParams = new URLSearchParams(window.location.search);
const score = parseInt(urlParams.get('score'));  // the number you got right
const total = parseInt(urlParams.get('total'));  // total number of questions

// show the score on the page
document.getElementById('score').textContent = `You scored ${score} out of ${total}!`;

// function to save the score
async function saveScore() {
    try {
        // first, check if user is logged in
        const sessionResponse = await fetch('/api/session');
        const sessionData = await sessionResponse.json();
        
        // if NOT logged in
        if (!sessionData.loggedIn) {
            // tell them to sign in
            document.getElementById('save-status').textContent = 'Sign in to save your score';
            return; // stop here
        }
        
        // user IS logged in, so save the score
        const response = await fetch('/api/save-score', {
            method: 'POST',  // POST means we're sending data
            headers: { 'Content-Type': 'application/json' },  // we're sending JSON
            body: JSON.stringify({ score, total })  // send the score and total
        });

        const result = await response.json();

        // show success or error message
        document.getElementById('save-status').textContent = 
            result.success ? 'Score saved!' : result.message;
    } 
    // if something goes wrong
    catch (err) {
        console.error('Save error:', err);
        document.getElementById('save-status').textContent = 'Error saving score';
    }
}

// if we have a score, try to save it automatically
if (score && total) {
    saveScore();
}