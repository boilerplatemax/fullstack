const PersonForm=({submitHandler,inputInfoHandler})=>{
    return(
      <form onSubmit={e=>submitHandler(e)}  id='myForm' className='personform__form'>

        <div className='personform__row-item'>
          <input
          placeholder='name'
          onChange={e=>inputInfoHandler({name:e.target.value})}
          className='personform__input'/>
        </div>
        <div className='personform__row-item'>
          <input
          placeholder='number'
          onChange={e=>inputInfoHandler({number:e.target.value})}
          className='personform__input'/>
        </div>
        <div>
          <button
            type="submit"
            className='personform__btn-submit'>
            add
            </button>
        </div>
      </form>
    )
  }

export default PersonForm