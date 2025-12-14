// this file checks if someone is logged in when they visit the home page

// function to check if user is logged in
async function checkSession() {
    try {
        // ask the server: "is this person logged in?"
        const response = await fetch('/api/session');
        const data = await response.json();

        // if they ARE logged in
        if (data.loggedIn) {
            // show their username on the page
            document.getElementById('username-display').textContent = data.username;
            
            // show the "logged in" section
            document.getElementById('logged-in-section').style.display = 'block';
            
            // hide the "not logged in" section
            document.getElementById('not-logged-in-section').style.display = 'none';
        } 
        // if they are NOT logged in
        else {
            // send them to the signin page
            window.location.href = 'signin.html';
        }
    } 
    // if something goes wrong
    catch (err) {
        console.error('Session check failed:', err);
        // send them to signin page just in case
        window.location.href = 'signin.html';
    }
}

// function to log the user out
async function logout() {
    // tell the server to log them out
    await fetch('/api/logout', { method: 'POST' });
    
    // refresh the page (which will redirect to signin)
    window.location.reload();
}

// run the check when page loads
checkSession();