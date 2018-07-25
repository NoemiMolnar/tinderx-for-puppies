import * as React from 'react'
import { connect } from 'react-redux';

import PictureContainer from './PictureContainer'
import ProfileBioContainer from './ProfileBioContainer'
import * as userActions from '../actions/user-actions'
import {showNewProfile} from '../actions/profile-actions'

class SelectorContainer extends React.PureComponent{

  componentDidMount(){
    if(this.props.currentUser.Pic === null ){
      }

  }

   onClickHandler = (event) => {
    if(event.target.id === 'no'){
      this.props.swipeLeft(this.props.currentUser,this.props.shownProfileId)
      this.props.showNewProfile(this.props.currentUser, this.props.shownProfileId)

   }else{
     this.props.swipeRight(this.props.currentUser,this.props.shownProfileId)
     this.props.showNewProfile(this.props.currentUser, this.props.shownProfileId)
    }
  }

  render(){
    return (
      <div className="selector-container container-fluid">
        <div className="row">
          <div className="col-md-2 d-flex align-items-stretch p-0" id="selector-container-left">
            <button className="selector-container-button-no btn-danger btn-block btn-large" onClick={this.onClickHandler} id="no"  >No</button>
          </div>
          <div className="col-md-8 p-0 d-flex flex-column">
            <div className="align-self-stretch m-2">
            <h2>{this.props.users.filter(x=>x.Id === this.props.shownProfileId)[0].Name}</h2>
            
            </div>
            
            <PictureContainer 
          user = { this.props.users.filter(x=>x.Id === this.props.shownProfileId).length 
            && 
          this.props.users.filter(x=>x.Id === this.props.shownProfileId)[0]} />
            
            
            <ProfileBioContainer 
                user = {this.props.shownProfileId 
                  &&
                this.props.users.filter(x=> x.Id === this.props.shownProfileId)[0]} />
            
          
          </div>
          <div className="col-md-2 d-flex align-items-stretch p-0" id="selector-container-right">
            <button className="selector-container-button-yes btn-success btn-block btn-large " 
              onClick={this.onClickHandler} id="yes" >
                Yes
              </button>
          </div>
        </div>
      </div>
    )
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
    showNewProfile : showNewProfile

}

export default connect(mapStateToProps, mapDispatchToProps)(SelectorContainer)
