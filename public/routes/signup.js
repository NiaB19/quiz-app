// this file handles the signup form

// find the signup form on the page
const form = document.getElementById('form');

// listen for when user submits the form
form.addEventListener('submit', async (e) => {
    e.preventDefault();  // stop form from refreshing page
    clearErrors();  // remove any red error borders

    // get what user typed in the form
    const firstname = document.getElementById('firstname-input').value.trim();
    const email = document.getElementById('email-input').value.trim();
    const password = document.getElementById('password-input').value;

    // check if any fields are empty
    if (!firstname) markIncorrect('firstname-input');  // make border red
    if (!email) markIncorrect('email-input');  // make border red
    if (!password) markIncorrect('password-input');  // make border red
    if (!firstname || !email || !password) return;  // stop if any field is empty

    try {
        // send signup info to server
        const response = await fetch('/api/signup', {
            method: 'POST',  // POST means we're sending data
            headers: { 'Content-Type': 'application/json' },  // we're sending JSON
            body: JSON.stringify({ firstname, email, password })  // send all 3 fields
        });

        const result = await response.json();

        // if signup worked
        if (result.success) {
            // take them to home page
            window.location.href = 'index.html';
        } 
        // if signup failed
        else {
            // show error popup (like "email already exists")
            alert(result.message);
        }
    } 
    // if something goes wrong with the request
    catch (err) {
        console.error('Signup error:', err);
        alert('Failed to sign up');
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