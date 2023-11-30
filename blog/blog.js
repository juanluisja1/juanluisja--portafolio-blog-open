
document.addEventListener("DOMContentLoaded", function () {

 // Fetch and display posts with their comments on page load
 fetchPostsAndComments()
});

/**
 * 
 * @param {event} eventTarget 
 * @target element to be handle
 * @id propertie has two parts, id.splits(':') = [prefix, number]
 * number is what matter the most to indentify element 
 */

// API /post route client

async function comment__post(eventTarget){

  console.log('comment__post'+eventTarget.target.id);

  let id = eventTarget.target.id.split(":")[1];
  let container__comment_form = document.getElementById(id)
  let comment__txt = document.getElementById("button_id:"+id);

  let comment_user = document.getElementById("username-input+"+id);
  let comment_textarea = document.getElementById("comment-input:"+id);

  let comment_data = {
    "status": true,
    "comment": comment_textarea.value,
    "post_id": id,
    "username": comment_user.value,
    "author_id": 3
  }
  // api/resource?param1=value1&param2=value2
  // Make a GET request to the /get_user_id route
  let validadatedUser = await fetch(`https://blog.juanluisja.live/get_user_id?username=${comment_user.value}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",

    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message === "User found successfully") {
        const userId = data.data.user_id;
        comment_data.author_id = userId;
        console.log(`User found with ID: ${userId}`);
        return comment_data;
      } else if (data.message === "User not found, jhon_doe") {
        console.log(" 57 User not found, jhon_doe");
      }
      else{
        comment_data.status = false;
      }
    })
    .catch(() => {
      console.error("user john_doe");
      comment_data.author_id = 3;
      comment_data.username = "john_doe";
      console.log(comment_data);
    });

    // id INTEGER PRIMARY KEY,
    // comment TEXT NOT NULL,
    // post_id INTEGER,
    // author_id INTEGER,
  
  console.log(`this is the validated user:${validadatedUser}` );

  post_comment_post(comment_data);

  //update post comment if success comment_data.status == true

  if(comment_data.status) {
    let comment_list = document.getElementById("comment-list:"+id);

    //creating all things control the comment

  //   let comment_data: {
  //     status: boolean;
  //     comment: any;
  //     post_id: any;
  //     username: any;
  //     author_id: number;
  // }

  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

    const commentItem = document.createElement('div');
    commentItem.classList.add('comment');
    commentItem.id = comment_data.username+':'+comment_data.post_id;
    commentItem.textContent = comment_data.comment;
    
    const comment_author= document.createElement('div');
    comment_author.classList.add('comment_author');
    comment_author.textContent =` by ${comment_data.username} @ ${year}-${month}-${day}`;

    //action to reply
    const div_reply_button= document.createElement('div');
    const button = document.createElement('button');
    button.classList.add('button_comment_reply');
    button.addEventListener('click', function (event) {
      reply_comment(event);
    });
    button.innerText = `Reply to ${comment_data.username}`;
    button.id = `${comment_data.username}:${comment_data.post_id}`
    div_reply_button.appendChild(button);

    //add all elements to 
    comment_author.appendChild(div_reply_button);
    commentItem.appendChild(comment_author);
    comment_list.appendChild(commentItem);

  }

  console.log(comment_textarea.value);
  comment_textarea.value = "";
  // comment_textarea.textContent ='';

  container__comment_form.classList.add("hide");

  comment__txt.classList.remove('hide');

  console.log(eventTarget.target.id);




}

/**
 * 
 * @param {comment,post_id, author_id} postData 
 */

function post_comment_post(postData){

  fetch('https://blog.juanluisja.live/post_comment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      //body: JSON.stringify(postData),
      body: JSON.stringify( {"comment": postData.comment, "post_id": postData.post_id, "author_id": postData.author_id})
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the server
        console.log(data.message); // You can display a success message to the user
       // postForm.reset(); // Clear the form
      })
      .catch((error) => {
        console.error('Error posting data: ', error);
        // Handle the error, e.g., display an error message to the user
      });
  }
// in certificate: /etc/ssl/certs/nginx.crt;
// out certificate: /etc/ssl/private/nginx.key;


function cancel__comment (eventTarget){
  let id = eventTarget.target.id.split(":")[1];
  let container__comment_form = document.getElementById(id)
  let comment__txt = document.getElementById("button_id:"+id);
  let comment_textarea = document.getElementById("comment-input:"+id);

  console.log(comment_textarea.value);
  comment_textarea.value = "";
  // comment_textarea.textContent ='';

  container__comment_form.classList.add("hide");

  comment__txt.classList.remove('hide');

  console.log(eventTarget.target.id);

}


function reply_comment(eventTarget){

  let id = eventTarget.target.id.split(":")[1];
  let container__comment_form = document.getElementById(id)
  let comment__txt = document.getElementById("button_id:"+id);
  let comment_textarea = document.getElementById("comment-input:"+id);


  console.log(comment_textarea.value);
  comment_textarea.value = '@'+eventTarget.target.id.split(":")[0];
  // comment_textarea.textContent ='';

  container__comment_form.classList.remove("hide");

  comment__txt.classList.add('hide');

  console.log(eventTarget.target.id);

  console.log('reply_comment '+eventTarget.target.id)

}
 
function actionReply (eventTarget){


  let form_reply
  let uni_id
  if(eventTarget.target.id.split(':').length > 1) {

    form_reply = document.getElementById(eventTarget.target.id.split(':')[1]);
    console.log(eventTarget)
    console.log(eventTarget.target.innerHTML)
    console.log(eventTarget.target.id)
    // console.log("test "+(eventTarget.target.id.split(':'))[0])
    form_reply.title = eventTarget.target.id
    uni_id = eventTarget.target.id;
    console.log("ID for button "+uni_id)
  }
  else {

    form_reply= document.getElementById(eventTarget.target.title)
    console.log(eventTarget)
    console.log(eventTarget.target.innerHTML)
    console.log(eventTarget.target.title)
    form_reply.title = eventTarget.target.title
    uni_id = eventTarget.target.title
    console.log("tton "+uni_id)
  }
  
  let button_comment = document.getElementById(uni_id);
  console.log(button_comment);

  form_reply.classList.contains('hide')? form_reply.classList.remove('hide') : form_reply.classList.add('hide') 
  button_comment.classList.contains('hide') ? button_comment.classList.remove('hide') : button_comment.classList.add("hide");
  
}




//  document.querySelectorAll('button_comment_reply').addEventListener( 'click', function ( event ) {
 
//   let form_id = event.target.id;
//   let form_comment = document.getElementById(form_id);
//   form_comment.classList.remove('hide')
  
// } );

function fetchPostsAndComments() {
  fetch('https://blog.juanluisja.live/posts', {
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
          <h2 class="post__title">${post.post_title}</h2>
          <p class="post__content">${post.post_content}</p>
          ${( (post.comments && post.comments.length > 0) ? `<h3 style="margin: 0; padding: 0">Comments:</h3>` : ``  )}
        `;

        const commentList = document.createElement('ul');
        commentList.className = 'comment-list';
        commentList.id = "comment-list:"+post.post_id;

        if (post.comments && post.comments.length > 0) {

         

          post.comments.forEach((comment) => {
            const commentItem = document.createElement('div');
            commentItem.classList.add('comment');
            commentItem.id = comment.comment_author+':'+post.post_id;
            commentItem.textContent = comment.comment_text;
            
            const comment_author= document.createElement('div');
            comment_author.classList.add('comment_author');
            comment_author.textContent =` by ${comment.comment_author} @ ${comment.comment_timestamp}`;

            //action to reply
            const div_reply_button= document.createElement('div');
            const button = document.createElement('button');
            button.classList.add('button_comment_reply');
            button.addEventListener('click', function (event) {
              reply_comment(event);
            });
            button.innerText = `Reply to ${comment.comment_author.split(":")[0]}`;
            button.id = `${comment.comment_author}:${post.post_id}`
            div_reply_button.appendChild(button);
      
            //add all elements to 
            comment_author.appendChild(div_reply_button);
            commentItem.appendChild(comment_author);
            commentList.appendChild(commentItem);
          });
          // postDiv.appendChild(commentList);
        }

        postDiv.appendChild(commentList);

        const div__comment_post = document.createElement('div');
        div__comment_post.classList.add('comment_post');
        div__comment_post.classList.add('comment_add');
        const button1 = document.createElement('button');
        button1.classList.add('button_comment_reply');
        button1.classList.add('comment_post');
        button1.addEventListener('click', function (event) {
          actionReply(event);
        });
        button1.id = `button_id:${post.post_id}`
        button1.innerText = `Comment`;
        // button.innerText = `Reply to ${post.author_username}`;
        div__comment_post.appendChild(button1);


        postDiv.appendChild(div__comment_post);

        const div_comment_form = document.createElement('div');
        div_comment_form.classList.add('container__comment_form');
        div_comment_form.classList.add("hide");
        div_comment_form.id = post.post_id;
        
        
        const commentForm = document.createElement('form');
        // commentForm.classList.add('hide'); // CSS class for hiding
        commentForm.classList.add('comment-form');
        // commentForm.id = post.post_id
        commentForm.innerHTML = `
          <input type="email" id="username-input+${post.post_id}" name="username" rows="4" cols="2" placeholder="email/username" required>
          <textarea id="comment-input:${post.post_id}" class="comment_input" name="${post.post_id}" placeholder="Comments" rows="4" cols="2" required></textarea>
        `;
        
       const container_submit_button =document.createElement('div');
       container_submit_button.classList.add('comment-form-buttons-container');

       //submit button for comment
       const button_submit = document.createElement('button');
       button_submit.type = "button";
       button_submit.textContent = "Comment";
       button_submit.id = `submit_comment__post:${post.post_id}`
       button_submit.classList.add("post_submit_button")
       button_submit.addEventListener('click', function (event) {
        comment__post(event);
      });
       //cancel button comment

       const button_cancel = document.createElement('button');
       button_cancel.type = "button";
       button_cancel.textContent = "Cancel";
       button_cancel.id = `cancel_comment:${post.post_id}`
       button_cancel.classList.add('post_cancel_button')
       button_cancel.addEventListener('click', function (event) {
        cancel__comment(event);
      });
       container_submit_button.appendChild(button_submit);
       container_submit_button.appendChild(button_cancel);

       //add container with buttons
       commentForm.appendChild(container_submit_button);

        // const cancel_button = document.createElement('button');

        div_comment_form.appendChild(commentForm);
        postDiv.appendChild(div_comment_form);

        postsContainer.appendChild(postDiv);
      }
    })
    .catch((error) => {
      console.error('Error fetching data: ', error);
    });

    
    // for (let index = 0; index < buttons.length; index++) {
    //   const button = buttons[index];
    //   button.addEventListener("click", (event) => {
    //         console.log(event.target.innerText)
    //       })
    // }
   
}
// https.createServer({
//   key: fs.readFileSync("/etc/ssl/certs/nginx.crt");
//   cert: fs.readFileSync("/etc/ssl/private/nginx.key");
// },app).listen
