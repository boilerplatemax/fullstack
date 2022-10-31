import React,{useState} from "react"
const Blog = ({ blog, deleteBlog, likeBlog, user,likedBlogs }) => {
const [blogContentVisible,setBlogContentVisible]=useState(false)
    return (
      <>
      <div className="blog">
        <div className='blog__header'>
          <div>{blog.title}
          <div>{blog.author}</div>
        </div>
        <button
        onClick={()=>setBlogContentVisible(visible=>!visible)}>
        {blogContentVisible?'hide':'show'}
        </button>
        </div>
        {blogContentVisible&&<div className='blog__body'>
          <div>{blog.url}</div>

          <div>{blog.likes}</div>
          <button
          className='btn-like'
          onClick={()=>likeBlog(blog)}>
            {likedBlogs.includes(blog.id)?'Unlike':'Like'}
            </button>
            
          {blog.user.id===user.id?<button onClick={()=>deleteBlog(blog)}>Delete</button>:null}
          {console.log('blog.user',blog.user)}

        </div>}
      </div></>
    )
  }
  
  export default Blog