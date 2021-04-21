import axios from "axios";

const deleteIcons = document.querySelectorAll("i.far.fa-times-circle");
const commentNumber = document.getElementById("jsCommentNumber");
const oneComment = document.getElementById("jsOneComment");
const moreComments = '<span id="jsMoreComments">  comments</span>';

const decreaseNumber = () => {
  const realtimeNumber = parseInt(commentNumber.innerHTML, 10);
  if (realtimeNumber <= 2) {
    commentNumber.innerHTML = realtimeNumber - 1;
    commentNumber.appendChild(oneComment);
  } else {
    commentNumber.innerHTML = realtimeNumber - 1 + moreComments;
  }
};

const deleteComment = (event) => {
  const li = event.target.parentNode;
  li.parentNode.removeChild(li);
  decreaseNumber();
};

const removeComment = async (comment) => {
  const videoId = window.location.href.split("/videos/")[1]; // video id 가져옴
  const response = await axios({
    url: `/api/${videoId}/delete-comment`,
    method: "POST",
    data: {
      comment,
    },
  });
  if (response.status === 200) {
    console.log("deleted");
  }
};

const handleDelete = (event) => {
  const commentContent = event.target.parentNode.firstChild.innerHTML;
  removeComment(commentContent);
  deleteComment(event);
};

const init = () => {
  for (let i = 0; i < deleteIcons.length; i++) {
    const deleteIcon = deleteIcons[i];
    deleteIcon.addEventListener("click", handleDelete);
  }
};

if (deleteIcons) {
  init();
}
