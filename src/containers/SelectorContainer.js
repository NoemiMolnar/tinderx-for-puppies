import React from 'react'
import { connect } from 'react-redux'
import Swipeable from 'react-swipeable'
import SelectorPresenter from '../presenters/SelectorPresenter'
import PictureContainer from './PictureContainer'
import ProfileBioContainer from './ProfileBioContainer'
import * as userActions from '../actions/user-actions'
import { showNewProfile } from '../actions/profile-actions'
import createNotifications from './NotificationContainer'
import { setMatches } from '../actions/setMatches'

class SelectorContainer extends React.PureComponent{
  onSwipedLeft = (e, absX) =>{
    this.props.swipeLeft(this.props.currentUser,this.props.shownProfileId)
    this.props.showNewProfile(this.props.currentUser, this.props.shownProfileId, this.props.users)
  }

  onSwipedRight = (e, absX) => {
    this.props.swipeRight(this.props.currentUser,this.props.shownProfileId)
    this.props.showNewProfile(this.props.currentUser, this.props.shownProfileId, this.props.users)
  }

   onClickHandler = (event) => {
    if (event.target.id === 'no') {
      this.props.swipeLeft(this.props.currentUser,this.props.shownProfileId)
      this.props.showNewProfile(this.props.currentUser, this.props.shownProfileId, this.props.users)
    }
    else {
     this.props.swipeRight(this.props.currentUser,this.props.shownProfileId)
     this.props.showNewProfile(this.props.currentUser, this.props.shownProfileId, this.props.users)
    }
  }

  componentWillMount() {
    this.props.currentUser === null && this.props.history.push(`/`)
    this.props.currentUser !== null && this.props.showNewProfile(this.props.currentUser, this.props.shownProfileId, this.props.users)
    if (this.props.currentUser !== null) {
      const userName = this.props.users.filter(user => user.Id === this.props.currentUser)[0].Name
      createNotifications('login', userName)
    }
  }

  render() {
    if (this.props.users.filter(x=>x.Id === this.props.shownProfileId)[0] === undefined) {
      this.props.setMatches(this.props.currentUser, this.props.users)
      return <SelectorPresenter currentUser={this.props.currentUser}/>
    }
    else { 
      this.props.setMatches(this.props.currentUser, this.props.users)
      return (
      <div className="selector-container">
        <div className="row">
          <div className="col-md-2 d-flex align-items-stretch p-0" id="selector-container-left">
            <button className="selector-container-button-no btn-danger btn-block btn-large" onClick={this.onClickHandler} id="no"  >No</button>
          </div>
          <div className="col-md-8 p-0">
            <Swipeable
              onSwipedLeft={this.onSwipedLeft}
              onSwipedRight={this.onSwipedRight}>
              <div className="align-self-stretch m-2">
                <h2>{this.props.users.filter(x=>x.Id === this.props.shownProfileId)[0].Name}</h2>
              </div>
              <PictureContainer 
                user = { this.props.users.filter(x=>x.Id === this.props.shownProfileId).length && 
                this.props.users.filter(x=>x.Id === this.props.shownProfileId)[0]} />
              <ProfileBioContainer 
                user = {this.props.shownProfileId &&
                this.props.users.filter(x=> x.Id === this.props.shownProfileId)[0]} />
            </Swipeable>
          </div>
          <div className="col-md-2 d-flex align-items-stretch p-0" id="selector-container-right">
            <button className="selector-container-button-yes btn-success btn-block btn-large " 
              onClick={this.onClickHandler} id="yes" >
              Yes
            </button>
          </div>
        </div>
      </div>
    )}
  }
}

const mapStateToProps =  (state) =>{
  return {
  users : state.users,
  currentUser : state.currentUser,
  shownProfileId : state.shownProfile
  }
}

const mapDispatchToProps = {
  swipeLeft : userActions.swipeLeft,
  swipeRight : userActions.swipeRight,
  showNewProfile : showNewProfile,
  setMatches : setMatches,

}

export default connect(mapStateToProps, mapDispatchToProps)(SelectorContainer)
