document.getElementById("feedbackForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const data = {
        name: document.getElementById("name").value,
        message: document.getElementById("message").value,
        rating: document.getElementById("rating").value
    };

    fetch("http://localhost:3000/submit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(res => res.text())
    .then(() => {
        loadFeedback(); // refresh list
        document.getElementById("feedbackForm").reset();
    });
});

// function to load feedback
function loadFeedback() {
    fetch("http://localhost:3000/feedbacks")
    .then(res => res.json())
    .then(data => {
        let html = "";

        data.forEach(item => {
            html += `
                <div style="border:1px solid #ccc; margin:10px; padding:10px;">
                    <h4>${item.name} ⭐ ${item.rating}</h4>
                    <p>${item.message}</p>
                </div>
            `;
        });

        document.getElementById("feedbackList").innerHTML = html;
    });
}

// load when page opens
loadFeedback();