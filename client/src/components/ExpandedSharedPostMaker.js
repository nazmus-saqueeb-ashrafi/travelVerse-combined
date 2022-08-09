import React from 'react'
import { useDimensions } from "../dimentions/Dimentions"
import { useRef, useState, useEffect } from "react";

import Modal from "../components/Modal";
import ModalHeader from "../components/ModalHeader";

import Map, {Marker} from 'react-map-gl';
import "mapbox-gl/dist/mapbox-gl.css"
import RoomRoundedIcon from '@mui/icons-material/RoomRounded';

import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost, reset, getTimeLinePosts } from '../features/post/postSlice'
import Spinner from './Spinner';

import InsertPhotoRoundedIcon from '@mui/icons-material/InsertPhotoRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';

import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../firebase";

import Post from './Post';

const ExpandedSharedPostMaker = ({showModal,setShowModal,sharedPost, socket}) => {

   

    // const desc = useRef();

    const initialState = {
        title: "",
        description: "",
    
    };

    const [data, setData] = useState(initialState);

    // Handle change in input
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };


    const [progressFull,setProgressFull]= useState(false)

    // redux
    const dispatch = useDispatch()
    const { user } = useSelector(
        (state) => state.auth
    )



    // handle post upload
    const handleUpload = async (e) => {
        e.preventDefault();

        // post data
        if(data.description){
            const newPost = {
                userId: user.user._id,
                
                description: data.description,
                
    

                isSharedPost: true,
                sharedPostId: sharedPost._id,

                // details needed for share notifications
                originalPostId: sharedPost.userId,
                sharedPostTitle: sharedPost.title,
                //
                latitude: sharedPost.latitude,
                longitude: sharedPost.longitude,
                
                
            };
            // console.log(newPost)

            
            // notify 
            // handleNotifiication() was not working
            try {
                socket.emit("sendNotification", {
                senderId: user.user._id,
                receiverId: sharedPost.userId,
                
                });
                // console.log(sharedPost.userId)
                // console.log(user.user._id)
            } catch (error) {
                console.log(error)
            }
            //
            


            // create post 
            dispatch(createPost(newPost,user))

    

            // dispatch(getTimeLinePosts(user.user._id));
            

            setShowModal(false)

            resetShare()


            

            window.location.reload() // timeline sorting bug

        




        }
        

    

    }

    // Reset Post Share
    const resetShare = () => {
        
        // reset description and title
        setData(initialState)

        

      
    };



    const [viewState,setViewState]= useState({
    
        longitude: sharedPost.longitude,
        latitude: sharedPost.latitude,
        zoom: 6
                    
    })

    const [viewport, setViewport] = useState({
        zoom: 8
    });

   
    
    

  return (
      
    <>
        
        <Modal size="" id="defaultModal" active={showModal} toggler={() => setShowModal(false)} aria-hidden="true" >

            {/* class="bg-base-100 shadow-xl z-50 xl:w-1/2 w-11/12 rounded-xl pt-2 pb-2 xl:pr-10 xl:pl-10 pr-5 pl-5 absolute" */}

            <div class="grid place-items-center bg-base-100"> 
             {/* form */}

                <ModalHeader toggler={() => setShowModal(false)}/>
                    

                <div class="flex justify-start items-center pt-3 pb-4">
                    <div class="avatar pr-5">
                        <div class="md:w-16 w-14 mask mask-squircle">
                            <img src="https://api.lorem.space/image/face?hash=92048"/>

                            {/* <img
                                src={
                                user.profilePicture
                                    ? serverPublic + user.profilePicture
                                    : serverPublic + "defaultProfile.png"
                                }
                                alt="Profile"
                            /> */}

                        </div>
                    </div>

                    <div class="avatar pr-5">
                        <div class="md:w-16 w-14 mask mask-squircle">
                            <img src="https://api.lorem.space/image/face?hash=92048"/>

                            {/* <img
                                src={
                                user.profilePicture
                                    ? serverPublic + user.profilePicture
                                    : serverPublic + "defaultProfile.png"
                                }
                                alt="Profile"
                            /> */}

                        </div>
                    </div>
                    

                    {/* <input type="text" name='title' placeholder="Mini title for your trip" class="input w-full h-full text-lg pr-2 pt-2 pb-2 rounded-xl resize-none border-solid border-2 border-base-200" maxlength="20" onChange={handleChange} value={data.title}></input> */}
                </div>

            

                <textarea id="description" name='description' type="text" rows="5" placeholder="Write something about the post you are sharing...." class="input w-full h-full text-lg pr-2 pt-2 pb-2 rounded-xl resize-none border-solid border-2 border-base-200 " onChange={handleChange} value={data.description} required></textarea>

                <div class="card w-96 glass mt-5">

                    
                        <div class="col-span-1 row-span-3 text-center p-3 card rounded-none h-60">
                            <Map
                                    {...viewState}
                                    onMove={evt => setViewState(evt.viewState)}
                                    onRender={evt => setViewState(viewState)}

                                    // style={{width: "w-full", height: 250}}
                                    attributionControl="none"
                                    mapStyle="mapbox://styles/mapbox/streets-v9"
                                    mapboxAccessToken={process.env.REACT_APP_MAPBOX}
                                    
                                    style={{flex: 1, height: '100%', width: '100%', borderRadius: 10, }}
                                    

                                >
                                    <Marker longitude={sharedPost.longitude} latitude={sharedPost.latitude} anchor="bottom" >

                                     <RoomRoundedIcon style={{color:"slategrey",fontSize:viewport.zoom * 5}}/>
                                     
                                    </Marker>
                            </Map>
              
                         </div>
                    

                    <div class="card-body">
                        <h2 class="card-title">{sharedPost.title}</h2>
                        <p>{sharedPost.description}</p>
                        <div class="card-actions justify-end">
                        {/* <button class="btn btn-primary">Learn now!</button> */}
                        </div>
                    </div>
                </div>

                

                {
                    (data.description)?(
                        (progressFull)?(<button data-modal-toggle="defaultModal" class="btn loading mt-4 mb-2 w-full">Post</button>) :
                        

                        <button data-modal-toggle="defaultModal" type="button" class="btn bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 text-white mt-4 mb-2 w-full" onClick={handleUpload}>Share</button>
                    ):(
                        <button data-modal-toggle="defaultModal" type="button" class="btn no-animation mt-4 mb-2 w-full pointer-events-none opacity-20" >Share</button>
                        
                    )

                }

                {/* {sharedPost.likes?<Post key={sharedPost._id} data={sharedPost}  hidden={true} socket={socket} />:null} */}

                
                

            </div>

        </Modal>
        
    </>
  )
}


export default ExpandedSharedPostMaker