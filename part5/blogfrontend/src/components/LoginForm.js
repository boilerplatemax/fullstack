import React,{useState} from 'react'

export default function LoginForm({setUsername, setPassword,username, password, handleLogin}) {
    const [loginVisible, setLoginVisible] = useState(false)
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }
  return (
    <div>
    <div style={hideWhenVisible}>
      <button onClick={() => setLoginVisible(true)}>log in</button>
    </div>
    <div style={showWhenVisible}>
    <form onSubmit={handleLogin}>
        <div>
          username
            <input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id='login-button' type="submit">login</button>
      </form>
      <button onClick={() => setLoginVisible(false)}>cancel</button>
    </div>
  </div>
  )
}
