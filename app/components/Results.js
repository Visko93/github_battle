import React from 'react';
import { battle } from '../utils/api';
import PropTypes from "prop-types";
import queryString from 'query-string';
import { Link } from "react-router-dom";

import Loading from "./Loading";
import Card from "./Card";
import Tooltip from "./Tooltip";

import { FaUser, FaCompass, FaSuitcase, FaUsers, FaUserFriends, FaCode, FaSpinner } from 'react-icons/fa';



function ProfileList({ profile }) {
  return (
    <ul className='card-list'>
      <li>
        <FaUser color='rgb(239,115,115)' size={22} /> 
          {profile.name}
      </li>
      {profile.location && 
      <li>
        <Tooltip text="User's Location">
          <FaCompass color='rgb(144,115,255)' size={22} /> 
          {profile.location}
        </Tooltip>
      </li>
      }
      {profile.company &&
        <li>
          <Tooltip text="User's Company">
            <FaSuitcase color='#795548' size={22} /> 
            {profile.company}
          </Tooltip>
        </li>
      }
      <li><FaUsers color='rgb(129,195,245)' size={22} /> {profile.followers.toLocaleString()} followers</li>
      <li><FaUserFriends color='rgb(64,183,95)' size={22} /> {profile.following.toLocaleString()} following</li>
      <li><FaCode color='' size={22} /> {profile.public_repos.toLocaleString()} repositories</li>
    </ul>
  )
}

ProfileList.propTypes = {
  profile: PropTypes.object.isRequired
}

export default class Results extends React.Component {
  state = {
    winner: null,
    loser: null,
    error: null,
    loading: true
  }
  
  componentDidMount () {
    const {playerOne, playerTwo} = queryString.parse(this.props.location.search)

    battle([playerOne, playerTwo]) 
      .then((players) => {
        this.setState({
          winner: players[0],
          loser:players[1],
          error: null,
          loading: false
        })
      }).catch(({message}) => {
        this.setState({
          error: message,
          loading: false
        })
      })
    
  }

  render() {
    const { winner, loser, error, loading } = this.state;
    
    if(loading === true) {
      return <Loading />
    }
    if (error) {
      return ( 
      <p className='center-text error'>{error}</p>
      );
    }

    return (
      <>
        <div className='grid-results space-around container-sm'>
          <Card 
            header={winner.score === loser.score ? 'Tie' : 'Winner'}
            subheader={`Score: ${winner.score}`}
            avatar={winner.profile.avatar_url}
            href ={winner.profile.html_url}
            name={winner.profile.login}
          >
            <ProfileList profile={winner.profile} />
          </Card>

          <Card 
            header={winner.score === loser.score ? 'Tie' : 'Winner'}
            subheader={`Score: ${loser.score}`}
            avatar={loser.profile.avatar_url}
            href ={loser.profile.html_url}
            name={loser.profile.login}
          >
            <ProfileList profile={loser.profile} />
          </Card>
        </div>
        <Link 
          to='/battle'
          className='btn dark-btn btn-space'
        >
          Reset
        </Link>
      </>
      
    )
  }
}



const styles = {
  container: {
    position: 'relative',
    display: 'flex'
  },
  tooltip: {
    boxSizing: 'border-box',
    position: 'absolute',
    width: '160px',
    bottom: '100%',
    left: '50%',
    marginLeft: '-80px',
    borderRadius: '3px',
    backgroundColor: '3px',
    padding: '7px',
    marginBottom: '5px',
    color: '#fff',
    textAlign: 'center',
    fontSize: '14px',
  }
}