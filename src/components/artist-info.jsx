import React, { Component } from 'react'
import { observer } from 'mobx-react'

export default @observer class ArtistInfo extends Component {
  render() {
    const { artistInfoStore } = this.props

    return (
      <div className="ai__artists-grid">
        <div className="ai__name">
          <span>{artistInfoStore.artistInfo.name}</span>
        </div>
        <div className="ai__popularity">
          <span>Popularity: </span>
          <span>{artistInfoStore.artistInfo.popularity}</span>
        </div>
        <div className="ai__followers">
          <span>Followers: </span>
          <span>{artistInfoStore.artistInfo.followers}</span>
        </div>
        <div className="ai__genres">
          {artistInfoStore.artistInfo.genres.map(genre => {
            return (
              <div key={genre} className="ai__genre">
                {genre}
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}