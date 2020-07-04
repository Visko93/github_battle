import React from 'react';
import { battle } from '../utils/api';
import Card from "./Card";

import { FaUser, FaCompass, FaSuitcase, FaUsers, FaUserFriends, FaCode, FaSpinner } from 'react-icons/fa';

export default class Results extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true
    }
  }
  
  componentDidMount () {
    const {playerOne, playerTwo} = this.props

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
      return <div className='flex-center'><FaSpinner size={200} className='fa fa-spinner fa-spin'/></div>
    }
    if (error) {
      return ( 
      <p className='center-text error'>{error}</p>
      );
    }
    console.log(this.state);

    return (
      <>
        <div className='grid space-around container-sm'>
        <Card 
        header={winner.score === loser.score ? 'Tie' : 'Winner'}
        subheader={`Score: ${winner.score}`}
        avatar={winner.profile.avatar_url}
        href ={winner.profile.html_url}
        name={winner.profile.login}
        >
          <ul className='card-list'>
            <li><FaUser color='rgb(239,115,115)' size={22} /> {winner.profile.name}</li>
            {winner.profile.location && 
              <li><FaCompass color='rgb(144,115,255)' size={22} /> {winner.profile.location}</li>
            }
            {winner.profile.company &&
              <li><FaSuitcase color='#795548' size={22} /> {winner.profile.company}</li>
            }
            <li><FaUsers color='rgb(129,195,245)' size={22} /> {winner.profile.followers.toLocaleString()} followers</li>
            <li><FaUserFriends color='rgb(64,183,95)' size={22} /> {winner.profile.following.toLocaleString()} following</li>
            <li><FaCode color='' size={22} /> {winner.profile.public_repos.toLocaleString()} repositories</li>
          </ul>
        
       
          
        </Card>

        <Card 
        header={winner.score === loser.score ? 'Tie' : 'Winner'}
        subheader={`Score: ${loser.score}`}
        avatar={loser.profile.avatar_url}
        href ={loser.profile.html_url}
        name={loser.profile.login}
        >
          <ul className='card-list'>
            <li><FaUser color='rgb(239,115,115)' size={22} /> {loser.profile.name}</li>
            {loser.profile.location && 
              <li><FaCompass color='rgb(144,115,255)' size={22} /> {loser.profile.location}</li>
            }
            {loser.profile.company && 
              <li><FaSuitcase color='#795548' size={22} /> {loser.profile.company}</li>
            }
            <li><FaUsers color='rgb(129,195,245)' size={22} /> {loser.profile.followers.toLocaleString()} followers</li>
            <li><FaUserFriends color='rgb(64,183,95)' size={22} /> {loser.profile.following.toLocaleString()} following</li>
            <li><FaCode color='' size={22} /> {loser.profile.public_repos.toLocaleString()} repositories</li>
          </ul>
        </Card>
          
        </div>
      </>
      
    )
  }
}