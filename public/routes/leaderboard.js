// this file loads and displays the top 10 quiz scores

async function loadLeaderboard() {
    try {
        // get leaderboard data from server
        const response = await fetch('/api/leaderboard');
        const data = await response.json();

        // if user is logged in, show their rank
        if (data.userRank) {
            document.getElementById('user-rank').textContent = `Your Rank: #${data.userRank}`;
        }

        // find the container where we'll put the leaderboard
        const container = document.getElementById('leaderboard-container');
        
        // if nobody has played yet
        if (data.leaderboard.length === 0) {
            container.innerHTML = '<p>No scores yet. Be the first to play!</p>';
            return; // stop here
        }

        // start building an HTML table
        let html = '<table>';
        html += '<tr><th>Rank</th><th>Player</th><th>Score</th><th>Date</th></tr>';
        
        // loop through each player in the leaderboard
        data.leaderboard.forEach((entry, index) => {
            // format the date nicely
            const date = new Date(entry.playedAt).toLocaleDateString();
            
            // add a row for this player
            html += `<tr>
                <td>#${index + 1}</td>
                <td>${entry.username}</td>
                <td>${entry.score}/${entry.total}</td>
                <td>${date}</td>
            </tr>`;
        });
        
        // close the table and put it on the page
        html += '</table>';
        container.innerHTML = html;
    } 
    // if something goes wrong
    catch (err) {
        console.error('Leaderboard error:', err);
        document.getElementById('leaderboard-container').innerHTML = 
            '<p>Failed to load leaderboard</p>';
    }
}

// load the leaderboard when page opens
loadLeaderboard();
