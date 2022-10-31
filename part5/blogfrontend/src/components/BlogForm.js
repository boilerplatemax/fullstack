const blogForm=({handleBlogChange, addBlog})=>{
    return(
    <form onSubmit={addBlog} className='blogform__form'>
      <label>Title</label>
    <input
      onChange={
        (e)=>handleBlogChange({title:e.target.value})
        }
        className='blogform__input-title'
    />
    <label>Url</label>
      <input
      onChange={(e)=>handleBlogChange({url:e.target.value})}
    />
    <button type="submit">save</button>
  </form>
  )
  }
export default blogForm