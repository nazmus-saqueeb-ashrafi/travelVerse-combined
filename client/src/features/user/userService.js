import axios from 'axios'

const API_URL = '/user/'

// Get user
// @route   GET /user/:id
// Private route
const getUser = async (user) => {

    const id = user.user._id
    const token = user.token

    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    
    const response = await axios.get(API_URL + `${id}`, config)

    
    return response.data
   
  
}

// Dismiss notifications
// @route   PUT /user/:id
const dismissNotifications = async (userData) => {

    const id = userData
    const response = await axios.put(API_URL + `${id}` + "/dismissNotifications")

    console.log(response)
    return response.data
   
  
}



const userService = {
  getUser,
  dismissNotifications
  
}

export default userService