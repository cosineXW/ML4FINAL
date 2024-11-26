let commentsDiv = document.getElementById("comments-div");

function updateComments(response) {
    for (let i = 0; i < response.length; i++) {
        let comment = document.createElement("div");
        comment.className = "comment-div";
        commentsDiv.appendChild(comment);

        // div for user profile
        let imgDiv=document.createElement("div");
        imgDiv.className="img-div";
        comment.appendChild(imgDiv);

        let img = document.createElement("img");
        img.className="profile-img";
        img.src = "assets/profile.jpg";
        imgDiv.appendChild(img);

        // div for texts (ID + Comment)
        let txtDiv = document.createElement("div");
        txtDiv.className="txt-div";
        comment.appendChild(txtDiv);

        let ID = document.createElement("p");
        ID.className="id";
        ID.textContent = response[i].id;
        txtDiv.appendChild(ID);
        let Comment = document.createElement("p");
        Comment.className="comment";
        Comment.textContent = response[i].comment;
        txtDiv.appendChild(Comment);
    }
}