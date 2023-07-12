import {configureStore} from '@reduxjs/toolkit'
import userReducer from './userReducer'
import adminReducer from './adminReducer'
import usersReducer from './usersReducer'


export const store=configureStore({
    reducer:{
       user:userReducer,
       admin:adminReducer,
       users:usersReducer
    }
})

