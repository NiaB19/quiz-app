// this file handles the signin form

// find the signin form on the page
const form = document.getElementById('signin-form');

// listen for when user submits the form
form.addEventListener('submit', async (e) => {
    e.preventDefault();  // stop form from refreshing page
    clearErrors();  // remove any red error borders

    // get what user typed in the form
    const email = document.getElementById('email-input').value.trim();
    const password = document.getElementById('password-input').value;

    // check if fields are empty
    if (!email) markIncorrect('email-input');  // make border red
    if (!password) markIncorrect('password-input');  // make border red
    if (!email || !password) return;  // stop if any field is empty

    try {
        // send login info to server
        const response = await fetch('/api/signin', {
            method: 'POST',  // POST means we're sending data
            headers: { 'Content-Type': 'application/json' },  // we're sending JSON
            body: JSON.stringify({ email, password })  // send email and password
        });

        const result = await response.json();

        // if login worked
        if (result.success) {
            // take them to the home page
            window.location.href = 'index.html';
        } 
        // if login failed
        else {
            // show error popup
            alert(result.message);
            // make both fields red
            markIncorrect('email-input');
            markIncorrect('password-input');
        }
    } 
    // if something goes wrong with the request
    catch (err) {
        console.error('Signin error:', err);
        alert('Failed to sign in');
    }
});

// function to make an input field red (shows error)
function markIncorrect(id) {
    // find the input and add 'incorrect' class to its parent
    document.getElementById(id).parentElement.classList.add('incorrect');
}

// function to remove all red error borders
function clearErrors() {
    // find all elements with 'incorrect' class and remove it
    document.querySelectorAll('.incorrect').forEach(el => 
        el.classList.remove('incorrect')
    );
}