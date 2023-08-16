/* import { useEffect } from 'react'

const UseScript = url => {
  useEffect(() => {

    const script = document.createElement('script')
    script.src = url
    script.async = true
    script.setAttribute('data-telegram-login', 'hhhhhh_hhhh_rrrr_bot')
    script.setAttribute('data-size', 'large')
    script.setAttribute('data-auth-url', 'http://45.9.42.26:22000/auth')
    script.type = "text/javascript"

    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [url])
  
};

export default UseScript */