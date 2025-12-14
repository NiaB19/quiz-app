// this file shows a user's quiz history on their profile page

async function loadProfile() {
    try {
        // ask server for this user's profile data
        const response = await fetch('/api/profile');
        const data = await response.json();

        // if user is not logged in
        if (!data.success) {
            // send them to signin page
            window.location.href = 'signin.html';
            return; // stop here
        }

        // show the username at top of page
        document.getElementById('username').textContent = data.username;

        // find where we'll put the score history
        const container = document.getElementById('history-container');
        
        // if user hasn't taken any quizzes yet
        if (data.scores.length === 0) {
            container.innerHTML = '<p>No quiz history yet.</p>';
            return; // stop here
        }

        // start building an HTML table
        let html = '<table>';
        html += '<tr><th>Date</th><th>Score</th><th>Percentage</th></tr>';
        
        // loop through each quiz they took
        data.scores.forEach(entry => {
            // format the date nicely
            const date = new Date(entry.playedAt).toLocaleDateString();
            
            // calculate percentage (score ÷ total × 100)
            const percentage = Math.round((entry.score / entry.total) * 100);
            
            // add a row for this quiz attempt
            html += `<tr>
                <td>${date}</td>
                <td>${entry.score}/${entry.total}</td>
                <td>${percentage}%</td>
            </tr>`;
        });
        
        // close the table and put it on the page
        html += '</table>';
        container.innerHTML = html;
    } 
    // if something goes wrong
    catch (err) {
        console.error('Profile error:', err);
        document.getElementById('history-container').innerHTML = 
            '<p>Failed to load profile</p>';
    }
}

// load the profile when page opens
loadProfile();