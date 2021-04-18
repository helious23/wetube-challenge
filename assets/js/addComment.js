import axios from "axios";

const addCommentForm = document.getElementById("jsAddComment");
const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");
const oneComment = document.getElementById("jsOneComment");
const moreComments = '<span id="jsMoreComments">  comments</span>';

const increaseNumber = () => {
  const realtimeNumber = parseInt(commentNumber.innerHTML, 10);
  if (realtimeNumber === 0) {
    commentNumber.innerHTML = realtimeNumber + 1;
    commentNumber.appendChild(oneComment);
  } else {
    commentNumber.innerHTML = realtimeNumber + 1 + moreComments;
  }
};

const addComment = (comment) => {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const i = document.createElement("i");
  span.innerHTML = comment; // user 확인 후 comment user 인 경우만 deleteIcon 추가
  i.className = "far fa-times-circle";
  li.appendChild(span);
  li.appendChild(i);
  commentList.prepend(li);
  increaseNumber();
};

const sendComment = async (comment) => {
  const videoId = window.location.href.split("/videos/")[1]; // video id 가져옴
  const response = await axios({
    url: `/api/${videoId}/comment`,
    method: "POST",
    data: {
      comment,
    },
  });
  if (response.status === 200) {
    addComment(comment);
  }
};

const handleSubmit = (event) => {
  event.preventDefault();
  const commentInput = addCommentForm.querySelector("input");
  const comment = commentInput.value;
  sendComment(comment);
  commentInput.value = "";
};

const init = () => {
  addCommentForm.addEventListener("submit", handleSubmit);
};

if (addCommentForm) {
  init();
}
