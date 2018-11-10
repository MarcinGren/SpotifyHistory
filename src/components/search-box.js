import React, { Component } from 'react'
import axios from 'axios'
import ArtistsStore from '../stores/artists-store'
import { observer } from 'mobx-react'

@observer
export default class SearchBox extends Component {

  render() {
    return (
      <div>
        {/* to be moved to a separate component */}
        <div className='header-container'>
        <h1 className='header-text'>
          Look for your favourite artist!
        </h1>
        </div>
        <p>
          <span className='artist-input'>
            <input
              type='text' 
              name='artist' 
              value={this.props.artistsStore.searchedArtist}
              onChange={this.onInputChange}
              // onSubmit={event => this.props.artistsStore.updateSearchedArtist(event.target.value)}
              // onSubmit={event => this.props.artistsStore.searchedArtist = event.target.value} 
              // Make request then map 5 artists id, name, img to store
              onSubmit={axios.get(`/api/artist/${this.props.artistsStore.searchedArtist}`)
              .then((response) => {
                console.log(response)
                console.log('datares')
                console.log(response.data)
                console.log(JSON.stringify(response.data))
                // Bug: Artist might be listed twice which results in more than 5 items listed
                // Story: Type in 'Avicii' -> Hit backspace 3 times -> Avicii listed more than 
                // once and more listing than 5
                
                // Applied limit on query itself so might remove this later
                response.data.artists.items.slice(0, 5).map(artist => {
                  let urlLength = artist.images['0'].url.length
                  console.log('cover')
                  console.log(artist.images['0'].url)
                  this.props.artistsStore.foundArtists.unshift({id: artist.id, name: artist.name, img: artist.images['0'].url})}
                )})
              }
              />
              <span></span>
              </span>
          {/* <input 
            type='submit' /> */}
        </p>
      </div>
    )
  }

onInputChange = event => {
  this.props.artistsStore.searchedArtist = event.target.value
}

}
