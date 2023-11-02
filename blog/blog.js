

document.addEventListener("DOMContentLoaded", function () {

 // Fetch and display posts with their comments on page load
 fetchPostsAndComments()
});



document.querySelectorAll('.button_comment_reply').forEach(function (button) {
  button.addEventListener('click', function (event) {
   actionReply(event)
  });
});


function actionReply (eventTarget){
  console.log(eventTarget)
  console.log(eventTarget.target.innerHTML)
  console.log(eventTarget.target.id)
}


//  document.querySelectorAll('button_comment_reply').addEventListener( 'click', function ( event ) {
 
//   let form_id = event.target.id;
//   let form_comment = document.getElementById(form_id);
//   form_comment.classList.remove('hide')
  
// } );

function fetchPostsAndComments() {
  fetch('http://localhost:3000/posts', {
    method: 'GET',
    headers: { 'Content-type': 'application/json' },
  })
    .then((response) => response.json())
    .then((data) => {
       console.log(`status: ${data.message}`);
      const postsContainer = document.querySelector('.post-container');

      for (const postId in data.data) {
        const post = data.data[postId];

        const postDiv = document.createElement('div');
        postDiv.classList.add('post'); 
        // postDiv.className = 'post';
        postDiv.innerHTML = `
          <h2>${post.post_title}</h2>
          <p>${post.post_content}</p>
          ${( (post.comments && post.comments.length > 0) ? `<h3 style="margin: 0; padding: 0">Comments:</h3>` : ``  )}
        `;

        if (post.comments && post.comments.length > 0) {

          const commentList = document.createElement('ul');
          commentList.className = 'comment-list';

          post.comments.forEach((comment) => {
            const commentItem = document.createElement('div');
            commentItem.classList.add('comment')
            commentItem.textContent = comment.comment_text;
            
            const comment_author= document.createElement('div');
            comment_author.classList.add('comment_author');
            comment_author.textContent =` by ${comment.comment_author} @ ${comment.comment_timestamp}`;

            //action to reply
            const div_reply_button= document.createElement('div');
            const button = document.createElement('button');
            button.classList.add('button_comment_reply');
            button.addEventListener('click', function (event) {
              actionReply(event);
            });
            button.innerText = `Reply to ${comment.comment_author}`;
            button.id = `${post.post_id}_${comment.comment_author}`
            div_reply_button.appendChild(button);
      
            //add all elements to 
            comment_author.appendChild(div_reply_button);
            commentItem.appendChild(comment_author)
            commentList.appendChild(commentItem);
          });

          postDiv.appendChild(commentList);


        }


        const div__comment_post = document.createElement('div');
        div__comment_post.classList.add('comment_author');
        div__comment_post.classList.add('comment_add');

        const button = document.createElement('button');
        button.classList.add('button_comment_reply');
        button.addEventListener('click', function (event) {
          actionReply(event);
        });
        button.id = `post-id:${post.post_id}`
        button.innerText = `Reply to ${post.author_username}`;
        div__comment_post.appendChild(button);


        postDiv.appendChild(div__comment_post);

        const commentForm = document.createElement('form');
        commentForm.classList.add('hide'); // CSS class for hiding
        commentForm.classList.add('comment-form');
        commentForm.id = post.post_id
        commentForm.innerHTML = `
          <input type="email" id="username-input+${post.post_id}" name="username" placeholder="email/username">
          <textarea id="comment-input" name="${post.post_id}" placeholder="Comments" rows="4" cols="50"></textarea>
          <button type="button">Comment</button>
        `;

        postDiv.appendChild(commentForm);

        postsContainer.appendChild(postDiv);
      }
    })
    .catch((error) => {
      console.error('Error fetching data: ', error);
    });

    const buttons = document.querySelectorAll('button')
    console.log(buttons);
    
    // for (let index = 0; index < buttons.length; index++) {
    //   const button = buttons[index];
    //   button.addEventListener("click", (event) => {
    //         console.log(event.target.innerText)
    //       })
    // }
   
}

 