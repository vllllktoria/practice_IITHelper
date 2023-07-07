/* import { useEffect } from 'react'

const UseScript = url => {
  useEffect(() => {

    const script = document.createElement('script')
    script.src = url
    script.async = true
    script.setAttribute('data-telegram-login', 'samplebot')
    script.setAttribute('data-size', 'large')
    script.setAttribute('data-onauth', 'onTelegramAuth(user)')
    script.setAttribute('data-request-access', 'write')
    script.type = "text/javascript"

    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [url])
  
};

export default UseScript */