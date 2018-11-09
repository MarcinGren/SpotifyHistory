import React from 'react'
import ReactDOM from 'react-dom'
import Arists from './components/artists'
import SearchBox from './components/search-box'
import ArtistsList from './components/artists-list'
import artistsStore from './stores/artists-store'
import './styles/main.scss'

ReactDOM.render(
    <div>
        index react
    <SearchBox artistsStore={artistsStore} />
    {/* <Arists artistsStore={artistsStore} /> */}
    <ArtistsList artistsStore={artistsStore} />
</div>, document.querySelector('.container'))
