import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logOut } from '../actions/user-actions'

class FooterContainer extends PureComponent{
  render() {

    const path = this.props.location.pathname

    const matchButtonClass = (path === '/' || (path.indexOf('matches') >=0)  || (path.indexOf('new-user') >=0) ) 
      ? 'd-none' : 'btn btn-primary'
    const logoutButtonClass = (path === '/' || (path.indexOf('new-user') >=0) ) ? 'd-none' : 'btn btn-primary'
    const selectorButtonClass = (path === '/' || (path.indexOf('selector') >= 0) || (path.indexOf('new-user') >=0) )
    ? 'd-none' : 'btn btn-primary' ;

    const createProfileButtonClass = (path === '/') ? 'btn btn-primary' : 'd-none'

    const editProfileButtonClass = (path === '/' || path.indexOf('edit-user') >=0 || (path.indexOf('new-user') >=0)) ? 'd-none' : 'btn btn-primary'
    
    return (
      <div className="card-footer page-footer"> 
      <Link to={ `/${this.props.currentUser}/matches` }><button className={matchButtonClass}>Matches</button></Link>
      <Link to={`/${this.props.currentUser}/selector`}><button className={selectorButtonClass}>Profiles</button></Link>
      <Link to={ `/new-user` }><button className={createProfileButtonClass}>Sign Up</button></Link>
      <Link to={ `/${this.props.currentUser}/edit-user` }><button className={editProfileButtonClass}>Edit Profile</button></Link>
      <Link to={`/`}><button className={logoutButtonClass} onClick={() => this.props.logOut()}>Logout</button></Link>
      </div>
    )
  }
}

const mapsStateToProps = (state) =>{
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapsStateToProps, {logOut})(FooterContainer)
