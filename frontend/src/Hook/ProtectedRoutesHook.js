import { useEffect, useState } from 'react'

const ProtectedRoutesHook = () => {

    const [token, setToken] = useState(localStorage.getItem("token"));
    const [isUser, setIsUser] = useState()

    useEffect(() => {
        if (token !== null) {
            setIsUser(true)
        } else {
            setIsUser(false)
        }
    }, [token])

    return [isUser]
}

export default ProtectedRoutesHook