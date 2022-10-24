const PersonForm=({submitHandler,inputInfoHandler})=>{
    return(
      <form onSubmit={e=>submitHandler(e)}  id='myForm' className='personform__form'>
        <div className='personform__row-item'>
          <input
          placeholder='Name'
          onChange={e=>inputInfoHandler({name:e.target.value})}
          className='personform__input'/>
        </div>
        <div className='personform__row-item'>
          <input
          placeholder='Number'
          onChange={e=>inputInfoHandler({number:e.target.value})}
          className='personform__input'/>
        </div>
        <div>
          <button
            type="submit"
            className='btn btn-add'>
            add
            </button>
        </div>
      </form>
    )
  }

export default PersonForm