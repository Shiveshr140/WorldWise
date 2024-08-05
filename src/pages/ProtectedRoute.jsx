import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"



function ProtectedRoute({children}) {
    const {isAuthenticated} = useAuth()
    const navigate = useNavigate()
    
    //// Never use the navigate at toplevel so use the effect
    
    useEffect(function(){
        if(!isAuthenticated) navigate("/")
    },[isAuthenticated, navigate])

  return isAuthenticated? children : null
}

export default ProtectedRoute


// The problem is. And so we are still apparently trying to read something out of avatar here in the user component, which means that the user component
// is somehow still trying to be rendered. So let's use our understanding of the use effect hook in order to solve this bug.
// So remember how our effect is actually only executed after the component has already been rendered. And so that is actually the key
// to understanding why this happens. So our component will actually initially render the children, which does of course include the user.
// And so then of course everything that the user is trying to read, from the user object does not exist. So that's why we get this error.
// So right after that is when the navigation happens. But in that split second, we are still trying to attempt, so we are still rendering the user component.
// And so again, that then gives us that error because again, this effect is only executed after the render has already happened.
// And so here we should now return conditionally. So we can say if is authenticated, we can actually return the children, but if not, then let's just return null. And so this should then solve it.
// So basically in case that we are not authenticated, then here in place of the app layout, null will be rendered. Which is not a problem,

//// now reload to test