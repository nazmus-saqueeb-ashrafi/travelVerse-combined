import React from 'react'
import Post from './Post';
import Spinner from './Spinner'
import { useRef, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { getTimeLinePosts,createPost } from '../features/post/postSlice';

import { useEffect } from "react";
import { getUser } from '../features/user/userSlice';


const AllPosts = ({socket, userId}) => {

  // redux 
    const dispatch = useDispatch();
    const { user } = useSelector(
          (state) => state.auth
      )



    useEffect(()=>{


      //running the api call on first render/refresh 

      // getTimeLinePosts() = Get logged in user's timeline posts

      dispatch(getTimeLinePosts(userId)) 
      dispatch(getUser(user)) // this populated the user state when the app first loads


    
    },[])

    let { timelinePosts, isLoading } = useSelector((state) => state.post);

  
  

  // const sortedTimelinePosts = arrayForSort.sort(function(a,b){

  //   // console.log(a.updatedAt)
  //   // console.log(b.updatedAt)

  //   return b.createdAt.localeCompare(a.createdAt);  
    

  // })

  //\
  
  


  return (
    <div>
        {timelinePosts ? timelinePosts.map((post, id) => {
            return <Post key={id} data={post}  socket={socket} hidden={false} />;
          }):null}
    </div>
  )
}

export default AllPosts