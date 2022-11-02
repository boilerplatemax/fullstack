const blogForm=({handleBlogChange, addBlog})=>{
  const submitHandler=e=>{
    addBlog(e)
    document.getElementById('blogForm').reset()
  }
    return(
    <form onSubmit={e=>submitHandler(e)} className='blogform__form' id='blogForm'>
      <label>Title</label>
    <input
      id='blogForm-input-title'
      onChange={
        (e)=>handleBlogChange({title:e.target.value})
        }
        className='blogform__input-title'
    />
    <label>Url</label>
      <input
      id='blogForm-input-url'
      onChange={(e)=>handleBlogChange({url:e.target.value})}
    />
    <button 
    id='blogForm-submit'
    type="submit"
    >save</button>
  </form>
  )
  }
export default blogForm