

document.addEventListener("DOMContentLoaded", function () {

 // Fetch and display posts with their comments on page load
 fetchPostsAndComments();
     
});

// Function to fetch and display posts with their comments
function fetchPostsAndComments() {
    fetch('http://146.190.137.89/posts', {
      "method": "GET",
      headers: {'Content-type':'application/json'}
  }) 
      .then((response) => response.json())
      .then((data) => {
        // You can process the data to group posts with their comments
        // and display them in your HTML, for example:
        let postsContainer = document.querySelector('.post-container');
        data.data.map((post) => {
          const postDiv = document.createElement('div');
          postDiv.className = "post"
          postDiv.innerHTML = `
            <h2>${post.title}</h2>
            <p>${post.content}</p>
            <h3>Comments:</h3>
          `;
          

            const commentDiv = document.createElement('div');
            commentDiv.className = 'comment'
            commentDiv.innerHTML = `
              <strong>${post.comment}:</strong> ${post.comment}
            `;
            postDiv.appendChild(commentDiv);

          
          postsContainer.appendChild(postDiv);
        });
      });
  }
  
 