import { combineReducers } from "redux"

import tweets from "./tweetReducer"
import users from "./usersReducer"
import articles from "./articleReducer"

export default combineReducers({
    tweets,
    users,
    articles
    
    
})