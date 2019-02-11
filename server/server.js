require('dotenv').config()

const express              = require('express'),
      path                 = require('path'),
      webpack              = require('webpack'),
      cors                 = require('cors')
      request              = require('request')
      Spotify              = require('spotify-web-api-js'),
      XMLHttpRequest       = require('xmlhttprequest').XMLHttpRequest,
      webpackDevMiddleware = require('webpack-dev-middleware')
      config               = require('../webpack.config'),
      saveAcessToken       = require('./spotify-connector'),
      
      port       = process.env.PORT,
      compiler   = webpack(config),
      app        = express(),
      spotifyApi = new Spotify()

app.use(cors())
app.options('*', cors())
// app.use(webpackDevMiddleware(compiler, {
//   publicPath: config.output.publicPath
// }))
console.log(config.output.publicPath)

app.use(express.static(config.output.publicPath))

saveAcessToken() // Returns accessToken

app.get('/api/artist/:name', (req, res) => {
  spotifyApi.searchArtists(req.params.name, {
    limit: 5
  }, (err, data) => {
    if (err) {
      if (err.status === 401) {
        console.log('refreshed token')
        saveAcessToken()
      } else {
        console.log(err)
      }
    } else {
      res.send(data)
    }
  })
})

app.get('/api/findartist/:name', (req, res) => {
  spotifyApi.getArtist(req.params.name,
    (err, data) => {
      if (err) {
        if (err.status === 401) {
          console.log('refreshed token')
          saveAcessToken()
        } else {
          console.log(err)
        }
      } else {
        res.send(data)
      }
    })
})

app.get('/api/artistalbums/:id', (req, res) => {
  spotifyApi.getArtistAlbums(req.params.id, {
    include_groups: 'album,single',
    market: 'PL' //might try a different way to obtain it in the future
  }, (err, data) => {
    if (err) {
      if (err.status === 401) {
        console.log('refreshed token')
        saveAcessToken()
      } else {
        console.log(err)
      }
    } else {
      console.log(JSON.stringify(data))
      res.send(data)
    }
  })
})

app.get('/api/relatedartists/:id', (req, res) => {
  spotifyApi.getArtistRelatedArtists(req.params.id,
    (err, data) => {
      if (err) {
        if (err.status === 401) {
          console.log('refreshed token')
          saveAcessToken()
        } else {
          console.log(err)
        }
      } else {
        res.send(data)
      }
    })
})

//gonna DRY the requests i think as they're quite similar
app.get('/api/albumtracks/:id', (req, res) => {
  spotifyApi.getAlbumTracks(req.params.id, {
    market: 'PL'
  },
  (err, data) => {
    if (err) {
      if (err.status === 401) {
        console.log('refreshed token')
        saveAcessToken()
      } else {
        console.log(err)
      }
    } else {
      res.send(data)
    }
  })
})

app.get('/api/songaudiofeatures/:id', (req, res) => {
  spotifyApi.getAudioFeaturesForTrack(req.params.id,
    (err, data) => {
      console.log(JSON.stringify(data))
      if (err) {
        if (err.status === 401) {
          console.log('refreshed token')
          saveAcessToken()
        } else {
          console.log(err)
        }
      } else {
        res.send(data)
      }
    })
})

app.get('/bundle.js', (req, res) => {
  res.sendFile(path.join(__dirname, '../bundle.js'))
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../src/index.html'))
})

app.listen(port, (err) => {
  if (err) {
    console.log(err)
  } else {
    console.log('server running')
  }
})
