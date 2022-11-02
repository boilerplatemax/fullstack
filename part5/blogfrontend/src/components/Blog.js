import React,{useState} from "react"
const Blog = ({ blog, deleteBlog, likeBlog, user,likedBlogs }) => {
const [blogContentVisible,setBlogContentVisible]=useState(false)
const [liked,setLiked]=useState(!likedBlogs.includes(blog.id))
const likeHandler = ()=>{
  setLiked(l=>!l)
  likeBlog(blog,liked)
}
    return (
      <>
      <div className="blog">
        <div className='blog__header'>
          <div>{blog.title}
          <div>{blog.author}</div>
        </div>
        <button
        id='blog-toggle-button'
        onClick={()=>setBlogContentVisible(visible=>!visible)}>
        {blogContentVisible?'hide':'show'}
        </button>
        </div>
        {blogContentVisible&&<div className='blog__body'>
          <div>{blog.url}</div>

          <div>{blog.likes}</div>
          <button
          id='blog-like-button'
          className='btn-like'
          //pass a bool state of whether it is liked
          onClick={likeHandler}>
            {liked?'Unlike':'Like'}
            </button>
            
          {blog.user.id===user.id
          ?
          <button
          id='blog-delete-button'
          onClick={()=>deleteBlog(blog)}>
            Delete
          </button>
          :
          null}


        </div>}
      </div></>
    )
  }
  
  export default Blog