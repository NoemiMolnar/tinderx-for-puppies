import React from 'react'

export default function HomePresenter(props) {
  return (
    <div className='home-presenter'>
      <div className='home-presenter-login'>
        <form name="submitMe" onSubmit={props.handleEvent}>
              <legend>Login</legend>
        <div className="form-row">
            <div className="form-group col">
              <input placeholder="Email Address" className="form-control" type="email" name="userEmail" id="userEmail" onChange={props.handleChange}/>
            </div>
            <div className="form-group col">
              <input placeholder="Password" className="form-control" type="password" name="userPassword" id="userPassword" onChange={props.handleChange}/>
        </div>
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary" >Login</button>
        </div>
        </form>
      </div>
    </div>
  )
}
