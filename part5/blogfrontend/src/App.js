import React,{ useState, useEffect, useRef} from 'react'

import Blog from './components/Blog'
import Notification from './components/Notification'
import Footer from './components/Footer'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'

import blogService from './services/blogService'
import loginService from './services/login'
import userService from './services/users'
import './App.css'
const App = () => {
  
  const newBlog = useRef({})
  const [allBlogs, setAllBlogs] = useState([])
  const [likedBlogs, setLikedBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)


  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)

  const blogFormRef = React.createRef()

  useEffect(() => {
    if(user===null)return
    blogService
      .getAll()
      .then(initialBlogs => {
        setAllBlogs(initialBlogs)
      })
      getLikedBlogs(user.id)
      console.log(user)
  }, [user])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      getAllBlogs()
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addBlog = (event) => {
    blogFormRef.current.toggleVisibility()
    event.preventDefault()
    const blogObject = {
      title: newBlog.current.title,
      author: user.username,
      url: newBlog.current.url,
      user:user
    }
    console.log(blogObject)
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setAllBlogs(allBlogs.concat(returnedBlog))
        newBlog.current={}
      })
      
      
  }
  const likeBlog = (blogObj) => {
    
    const likeValue= likedBlogs.includes(blogObj.id)?-1:1
    const newBlog = {
      ...blogObj,
      likes:blogObj.likes+likeValue
    }
    blogService
      .updateBlog(newBlog)
      .then(returnedBlog => {
        let updatedBlogs =allBlogs
        const index = updatedBlogs.findIndex(b=>b.id===returnedBlog.id)
        updatedBlogs[index]=returnedBlog
        setAllBlogs(updatedBlogs)
        getLikedBlogs(user.id)
      })
      
      
      
  }
  const deleteBlog = (blogObj) => {
    if (window.confirm("Delete post?")) {
      blogService
      .deleteBlog(blogObj.id)
      .then(() => {
        setAllBlogs(allBlogs.filter(b=>b.id!==blogObj.id))
      })
    } 

  }
  const handleBlogChange = (change) => {
    newBlog.current={...newBlog.current,...change}
  }

  const getAllBlogs = async () => {
    const blogs = await blogService.getAll()
    setAllBlogs([...blogs])
  }
const getLikedBlogs = async(id)=>{
  const blogs = await userService.getLikedBlogs(id)
  setLikedBlogs(blogs)
}
  const blogForm=()=>{
    return(
    <form onSubmit={addBlog}>
      <label>Title</label>
    <input
      onChange={(e)=>handleBlogChange({title:e.target.value})}
    />
    <label>Url</label>
      <input
      onChange={(e)=>handleBlogChange({url:e.target.value})}
    />
    <button type="submit">save</button>
  </form>
  )
  }
  const logOut=()=>{
    window.localStorage.removeItem('loggedblogappUser')
    setUser(null)
  }
  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={errorMessage} />
      <h2>Login</h2>
      {user === null ?
      <LoginForm
      username={username}
      password={password}
      setUsername={setUsername}
      setPassword={setPassword}
      handleUsernameChange={({ target }) => setUsername(target.value)}
      handlePasswordChange={({ target }) => setPassword(target.value)}
      handleLogin={handleLogin}
    /> :
      <div>
        <p>{user.name} logged in</p>
        <Togglable buttonLabel="Add new blog" ref={blogFormRef}>{blogForm()}</Togglable>
        <button onClick={logOut}>log out</button>
      </div>
      }
      {user&&
      <div>

        {allBlogs.map(blog => 
          <Blog
            key={blog.id}
            blog={blog}
            getAllBlogs={getAllBlogs}
            likeBlog={likeBlog}
            likedBlogs={likedBlogs}
            deleteBlog={deleteBlog}
            user={user}
            
          />
        )}

      <button onClick={getAllBlogs}>reload</button>
      <Footer />
      </div>
      }
      
    </div>
  )
}

export default App