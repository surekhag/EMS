import React from 'react'
import { useSelector } from 'react-redux'

export const UserContext = React.createContext()

const UserContextProvider = props => {
    //const [state, dispatch] = React.useReducer(reducer, initialState.user);
    const currentUser = useSelector(state => state.loginReducer.currentUser)
    return (
        <UserContext.Provider value={{ currentUser: currentUser }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContextProvider
