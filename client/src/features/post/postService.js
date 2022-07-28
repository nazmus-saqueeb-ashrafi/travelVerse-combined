import axios from 'axios'

const API_URL = '/post/'

// Get timeline posts for user
// @route   GET /posts/id/timeline
const getTimelinePosts = async (userData) => {

  const token = userData.token
  const id = userData.user._id
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  
  const response = await axios.get(API_URL + `${id}/timeline`, config)
  

//   if (response.data) {
//     localStorage.setItem('user', JSON.stringify(response.data))
//   }

  return response.data
}


// Create post
// @route   POST /api/posts
const createPost = async (postData,token) => {

  // console.log(token)
  
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };


  const response = await axios.post(API_URL , postData, config)
  // console.log(response)

//   if (response.data) {
//     localStorage.setItem('user', JSON.stringify(response.data))
//   }

  return response.data
}


// Update post
// @route   PUT /api/posts/:id
const updatePost = async ( postId, post, token) => {

  console.log(token)
  
  
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  const response = await axios.put(API_URL + postId , post, config)

  return response.data
}


// Delete post
// @route   DELETE /api/posts/:id
const deletePost = async ( postId, token) => {

  console.log(token)
  
  
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  const response = await axios.delete(API_URL + postId , config)

  return response.data
}


// Create comment
// @route   POST /api/posts/:id/comment
const createComment = async ( commentData, postId, token) => {

  console.log(token)
  console.log(commentData)
  
  
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  const response = await axios.post(API_URL +  postId + "/comment" , commentData, config)

  return response.data
}

// Get all comments on post
// @route   GET /api/posts/:id/getcomments
const getCommentsForPost  = async (postId, token) => {

  console.log(postId)  
  
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  const response = await axios.get(API_URL +  postId + "/getcomments" , config)

  return response.data
}

// Delete comment
// @route   DELETE /api/posts/:id/deletecomment
const deleteComment = async ( commentId, token) => {

  console.log(token)
  
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  const response = await axios.delete(API_URL + commentId + "/deletecomment" , config)

  return response.data
}


// Like/Unlike post
// @route   PUT post/:id/like
const likePost = async ( data) => {

  // console.log(data.postId)
  // console.log(data.userId)

  const response = await axios.put(API_URL +  data.postId + "/like", {userId:data.userId} )

  // console.log(response.data)
  return response.data
  
}





const postService = {
  getTimelinePosts, 
  createPost,
  updatePost,
  deletePost,
  createComment,

  getCommentsForPost,
  deleteComment,

  likePost,
 
  
}

export default postService