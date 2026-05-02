const BACKEND_URL = import.meta.env.VITE_API_URL ;

document.getElementById("feedbackForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const data = {
        name: document.getElementById("name").value,
          message: document.getElementById("message").value,
      rating: document.getElementById("rating").value
    };

    fetch(`${BACKEND_URL}/submit`, { 
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
})
    .then(res => res.text())
    .then(() => {
        loadFeedback();

        //refresh the list .
        document.getElementById("feedbackForm").reset();
    });
});

// function to load feedback form database
function loadFeedback() {
    fetch(`${BACKEND_URL}/feedbacks`) // Add the correct endpoint path here
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

// loading the page when it open 
loadFeedback();