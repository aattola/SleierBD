/**
 * @name Sleier
 * @author JEFFe
 * @authorId 214760917810937856
 * @version 1.0.7
 * @description Sleier plugin lisää kontenttia discordiin
 * @website https://jeffe.co
 * @source https://raw.githubusercontent.com/jeffeeeee/SleierBD/main/Sleier.plugin.js
 * @updateUrl https://raw.githubusercontent.com/jeffeeeee/SleierBD/main/Sleier.plugin.js
 */

// eslint-disable-next-line
const fontCss = `
@font-face {
  font-family: "Circular";
  src: url("https://proxy.jeffe.workers.dev/?https://jeffe.co/static/CircularStd-Black.woff2") format("woff2");
  font-weight: 400;
  font-style: normal;
}

.sleierHeader {
  background: #3B3E44;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  width: 300px;
  border-radius: 0px 0px 0px 6px;
}

.sleierRoot {
  padding-top: 16px;
}

.sleierQueue {
  display: grid;

}
`
const loaderCss =
  '.spinner{-webkit-animation:rotation 1.35s linear infinite;animation:rotation 1.35s linear infinite}@-webkit-keyframes rotation{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(270deg);transform:rotate(270deg)}}@keyframes rotation{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(270deg);transform:rotate(270deg)}}.circle{stroke-dasharray:180;stroke-dashoffset:0;-webkit-transform-origin:center;-ms-transform-origin:center;transform-origin:center;-webkit-animation:turn 1.35s ease-in-out infinite;animation:turn 1.35s ease-in-out infinite}@-webkit-keyframes turn{0%{stroke-dashoffset:180}50%{stroke-dashoffset:45;-webkit-transform:rotate(135deg);transform:rotate(135deg)}100%{stroke-dashoffset:180;-webkit-transform:rotate(450deg);transform:rotate(450deg)}}@keyframes turn{0%{stroke-dashoffset:180}50%{stroke-dashoffset:45;-webkit-transform:rotate(135deg);transform:rotate(135deg)}100%{stroke-dashoffset:180;-webkit-transform:rotate(450deg);transform:rotate(450deg)}}'
const loader = `
<div class="sleierLoader">
  <svg style="stroke:#5677fc; position: absolute; top: 40%; left: 40%;" class="spinner" width="35px" height="35px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg"><circle class="circle" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle></svg>
  <img src="https://i.imgur.com/UknTZmJ.png" style="
      height: 40px;
      position: absolute;
      top: 49%;
      left: 35%;
  ">
</div>
`

const mainHTML = `
  <div class="sleierHeader">
    <img src="https://i.imgur.com/UknTZmJ.png" style="height: 35px; padding: 2px 12px;">
  </div>

  <div class="sleierRoot">
    <div class="sleierQueue">
    </div>
  </div>
`

const request = require('request')
const fs = require('fs')
const path = require('path')

function psykoosit() {
    if (global.sleierInterval) {
      clearInterval(global.sleierInterval)
      global.sleierSocket.removeListener('nowPlaying')
    }
    let members = document.querySelector('[aria-label="Members"]')
    const membersContainer = document.querySelector('.da-hiddenMembers')
    console.log('members', members)

    if (!members) {
      setTimeout(() => {
        psykoosit()
      }, 2000);
      return console.log('[SleierBD] Members ei löytynt koitetaa uusiksi 2 sekunnin päästä!')
    }

    if (!global.sleierSocket || !global.sleierSocket.connected) {
      setTimeout(() => {
        psykoosit()
      }, 2000);
      console.log(`[SleierBD] Socket status: ${global.sleierSocket ? 'ladannut. connectaus: ' + global.sleierSocket.connected : 'ei ladannut'}`)
      return console.log('[SleierBD] Socket ei ladannut / connectannu vielä koitetaa uusiksi 2 sekunnin päästä')
    }
    let visible = true

    const guildId = window.location.href.split('/')[4]
    global.sleierInterval = setInterval(() => {
      global.sleierSocket.emit('getNowPlaying', { id: guildId })
    }, 5000)

    global.sleierSocket.on('nowPlaying', ({ queue, playing }) => {
      // console.log(queue, playing)

      if (playing) {
        if (visible) {
          global.orava()
        } else {
          updateQueue(queue, playing)
        }
      } else {
        if (!visible) {
          global.orava()
        }
      }
    })

    function updateQueue(queue, playing) {
      const queueElem = document.querySelector('.sleierQueue')
      let list

      // console.log(queueElem.children, list)
      if (queueElem.children[0]) {
        list = Array.from(queueElem.children).map(a => a.id)
      } else {
        list = []
      }

      const idQueue = queue.map(i => i.id)

      Array.from(queueElem.children).forEach(sonki => {
        if (!idQueue.includes(sonki.id)) {
          sonki.remove()
        }
      })

      queue.forEach((song, i) => {
        if (list.includes(song.id)) return

        if (i == 0) {
          const songDiv = document.createElement('div')
          songDiv.id = song.id
          songDiv.style.display = 'grid'
          songDiv.style.gridTemplateRows = '1f'
          songDiv.style.gridGap = '10px'
          songDiv.style.marginBottom = '10px'
          songDiv.style.justifyContent = 'center'
          songDiv.innerHTML = `
            <img style="width: 280px; border-radius: 8px; box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);" src="${song.thumbnail}"></img>
            <div style="max-width: 300px; word-break: break-all; color: #eaeaea; padding-right: 5px;">
              <h1>${song.title}</h1>
              <p style="margin: 0; margin-top: 5px; opacity: 0.7;">Pyytäjä: ${song.requester}</p>
            </div>
          `
          queueElem.appendChild(songDiv)
        } else {
          const songDiv = document.createElement('div')
          songDiv.id = song.id
          songDiv.style.display = 'grid'
          songDiv.style.gridTemplateColumns = '100px 200px'
          songDiv.style.gridGap = '10px'
          songDiv.style.marginTop = '10px'
          songDiv.innerHTML = `
            <img style="max-width: 300px; width: 100px; border-radius: 8px; box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);" src="${song.thumbnail}"></img>
            <div style="word-break: break-all; color: #eaeaea; padding-right: 5px;">
              <h1>${song.title}</h1>
              <p style="margin: 0; margin-top: 5px; opacity: 0.7;">Pyytäjä: ${song.requester}</p>
            </div>
          `
          queueElem.appendChild(songDiv)
        }
      })
    }

    global.orava = () => {
      members = document.querySelector('[aria-label="Members"]')
      members.style.display = visible ? 'none' : 'block'

      if (!visible) {
        // poistetaa
        clearInterval(global.sleierInterval)
        document.querySelector('#sleierContainer').remove()
      } else {
        // lisätää
        const cont = document.createElement('div')
        cont.id = 'sleierContainer'
        cont.innerHTML = loader
        membersContainer.appendChild(cont)

        const BdApi = window.BdApi

        BdApi.showToast(
          `Sleier: ${
            global.sleierSocket.connected
              ? 'CONNECTED'
              : 'Eipä ollu connectattu'
          }`,
          { type: 'success', icon: true }
        )

        setTimeout(() => {
          if (global.sleierSocket.connected) {
            document.querySelector('.sleierLoader').remove()

            const root = document.createElement('div')
            root.id = 'sleierRootCreator'
            root.innerHTML = mainHTML
            cont.appendChild(root)

            const guildId = window.location.href.split('/')[4]
            const channelId = window.location.href.split('/')[5]
            console.log('IDs ', guildId, channelId)
            const username =
              window.ZLibrary.DiscordAPI.currentUser.discordObject.username
            const id = window.ZLibrary.DiscordAPI.currentUser.discordObject.id
            const avatar =
              window.ZLibrary.DiscordAPI.currentUser.discordObject.avatar
            const avatarURL =
              window.ZLibrary.DiscordAPI.currentUser.discordObject.avatarURL
            const auth = {
              username: username,
              id: id,
              verified: true,
              avatar: avatar,
              avatarURL: avatarURL
            }

            console.log(auth)
          }
        }, 1000)
      }
      visible = !visible
    }
  }

class SleierPlugin {
  getName() {
    return 'Sleier' // Name of your plugin to show on the plugins page
  }

  getDescription() {
    return 'Sleier plugin lisää kontenttia discordiin'
  }

  getVersion() {
    return '1.0.7'
  }

  getAuthor() {
    return 'JEFFe'
  }

  load() {
    if (!global.ZeresPluginLibrary) {
      return BdApi.showConfirmationModal('Lataa lisäosa', [
        'Lataa lisäosa joka puuttuu !!!!!!!!!!!!!!!KÄYNNISTÄ DISCORD UUSIKSI Latauksen jälkeen!!!!',
        {
          confirmText: 'Lataa',
          cancelText: 'En',
          onConfirm: () => {
            request.get(
              'https://rauenzi.github.io/BDPluginLibrary/release/0PluginLibrary.plugin.js',
              async (error, response, body) => {
                if (error) {
                  require('electron').shell.openExternal(
                    'https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/rauenzi/BDPluginLibrary/master/release/0PluginLibrary.plugin.js'
                  )
                  return
                }
                const folder = path.join(
                  global.BdApi.Plugins.folder,
                  '0PluginLibrary.plugin.js'
                )
                // eslint-disable-next-line promise/param-names
                await new Promise(r => {
                  fs.writeFile(folder, body, () => {
                    r()
                  })
                })
              }
            )
          }
        }
      ])
    } else {
      global.BdApi.linkJS('SOCKETTI', 'https://jeffe.co/socket.io/socket.io.js')
      global.BdApi.injectCSS('loaderCSS', loaderCss)
      global.BdApi.injectCSS('fontCSS', fontCss)

      global.ZLibrary.PluginUpdater.checkForUpdate(
        this.getName(),
        this.getVersion(),
        'https://raw.githubusercontent.com/jeffeeeee/SleierBD/main/Sleier.plugin.js'
      )

      setInterval(function() {
        global.ZLibrary.PluginUpdater.checkForUpdate(
          this.getName(),
          this.getVersion(),
          'https://raw.githubusercontent.com/jeffeeeee/SleierBD/main/Sleier.plugin.js'
        )
      }, 5 * 60 * 1000)

      setTimeout(() => {
        global.sleierSocket = io('https://jeffe.co')
      }, 1500)
    }

    return true
  } // Called when the plugin is loaded in to memory



  onSwitch(e) {
    psykoosit()
  }

  start() {
    psykoosit()

    // setTimeout(() => {
    //   console.log('WOK')
    //   if (!global.ZeresPluginLibrary) return
    //   const button = `
    //     <div class="buttonContainer-28fw2U da-buttonContainer">
    //       <button aria-label="Open GIF picker" tabindex="0" type="button" class="buttonWrapper-1ZmCpA da-buttonWrapper button-38aScr da-button lookBlank-3eh9lL colorBrand-3pXr91 grow-q77ONN da-grow noFocus-2C7BQj da-noFocus">
    //         <div class="contents-18-Yxp da-contents button-3AYNKb da-button button-318s1X da-button" style="margin: 0;">
    //           <img style="height: 26px; width: 26px; border-radius: 90px; margin-top: 5px;" src="https://cdn.discordapp.com/avatars/374563183769288706/f25f2202b6077c9bf4cd9154abb30dbe.png?size=128" alt=" " class="avatar-VxgULZ da-avatar" aria-hidden="true">
    //         </div>
    //       </button>
    //     </div>
    //     `
    //   document.getElementById('OOPPEL') &&
    //     document.getElementById('OOPPEL').remove()
    //   const frame = document.createElement('div')
    //   frame.id = 'OOPPEL'
    //   frame.innerHTML = button
    //   const buttonz = document.querySelectorAll('.da-buttons')
    //   buttonz[buttonz.length - 1].appendChild(frame)
    //   document.querySelector('#OOPPEL').removeEventListener('click')
    //   document.querySelector('#OOPPEL').addEventListener('click', () => {
    //     window.YEPCOCK()
    //   })
    //   console.log(this)
    //   console.log(window)
    //   const BdApi = window.BdApi
    //   setTimeout(() => {
    //     const io = window.io
    //     window.socketti = io('https://jeffe.co')
    //     const socket = socketti
    //     setTimeout(() => {
    //       BdApi.showToast(
    //         `Sleier: ${
    //           socketti.connected ? 'CONNECTED' : 'Eipä ollu connectattu'
    //         }`,
    //         { type: 'success', icon: true }
    //       )
    //     }, 1000)
    //     const guildId = window.location.href.split('/')[4]
    //     const channelId = window.location.href.split('/')[5]
    //     console.log('IDs ', guildId, channelId)
    //     const username =
    //       window.ZLibrary.DiscordAPI.currentUser.discordObject.username
    //     const id = window.ZLibrary.DiscordAPI.currentUser.discordObject.id
    //     const avatar =
    //       window.ZLibrary.DiscordAPI.currentUser.discordObject.avatar
    //     const avatarURL =
    //       window.ZLibrary.DiscordAPI.currentUser.discordObject.avatarURL
    //     const auth = {
    //       username: username,
    //       id: id,
    //       verified: true,
    //       avatar: avatar,
    //       avatarURL: avatarURL
    //     }
    //     window.YEPCOCK = yep
    //     function yep() {
    //       BdApi.showConfirmationModal(
    //         'Sleier',
    //         'Sleier',
    //         BdApi.React.createElement('div', { id: 'YEPCOCK' }),
    //         {
    //           danger: false,
    //           confirmText: 'Soita',
    //           cancelText: 'Takaisin',
    //           onConfirm: e => {
    //             const nappi = document.getElementById('haku')
    //             const result = document.getElementById('resultti')
    //             const input = document.getElementById('hakusana').value
    //             console.log(input, 'value')
    //             socket.emit('SEARCH_VIDEOS', {
    //               data: { auth, guildId: guildId },
    //               searchTerm: input
    //             })
    //           }
    //         }
    //       )
    //       document.getElementById('spanni') &&
    //         document.getElementById('spanni').remove()
    //       const frame = document.createElement('div')
    //       frame.id = 'spanni'
    //       frame.style.position = 'fixed'
    //       frame.style.transition = 'transform 0.23s'
    //       frame.style.zIndex = 9999
    //       frame.innerHTML = `
    //         <style>
    //           #hakusana {
    //             width: 97%;
    //             padding: .25rem 0;
    //             border: 0;
    //             border-bottom: 1px solid #4f545c;
    //             outline: 0;
    //             background: transparent;
    //             color: #fff;
    //             font-size: 3rem;
    //             line-height: 4rem;
    //             letter-spacing: .125rem;
    //             transition: all .5s cubic-bezier(.4, .25, .8, .3);
    //             padding-bottom: 1px;
    //           }
    //           #MOKKA {
    //             cursor: pointer;
    //             display: flex;
    //             margin-right: 4px;
    //             align-items: center;
    //             text-align: center;
    //             justify-content: center;
    //             color: #b3b3b3;
    //             background: transparent;
    //             border-radius: 4px;
    //             transition: all 0.2s cubic-bezier(0.25, 0.1, 0.25, 1);
    //           }
    //           #MOKKA:hover {
    //             box-shadow: 0px 5px 12px 0px rgba(0,0,0,0.06), 0px 3px 11px 0px rgba(32, 34, 37, 0.19);
    //             background: #32343a;
    //           }
    //           #MOKKA:active {
    //             box-shadow: 0px 5px 12px 0px rgba(0,0,0,0.00), 0px 3px 11px 0px rgba(32, 34, 37, 0.00);
    //             background: #32343a;
    //           }
    //           #CLDOS {
    //             width: 97%;
    //             display: grid;
    //             grid-template-columns: 1fr 65px 65px;
    //             grid-template-rows: 60px;
    //           }
    //           .slider {
    //             -webkit-appearance: none;
    //             background: transparent;
    //             outline: none;
    //             -webkit-transition: .2s;
    //             transition: all 0.2s cubic-bezier(0.25, 0.1, 0.25, 1);
    //           }
    //           .slider:hover {
    //             background: #32343a;
    //           }
    //           .slider::-webkit-slider-thumb {
    //             -webkit-appearance: none;
    //             appearance: none;
    //             width: 16px;
    //             height: 16px;
    //             background: #52545a;
    //             cursor: pointer;
    //           }
    //         </style>
    //         <center id="CLDOS">
    //           <input style="margin-right: 4px;" autofocus id="hakusana" type="text"></input>
    //           <div>
    //             <div id="CLDOS" style="grid-template-columns: 65px 65px; grid-template-rows: 40px 1fr;">
    //               <button style="margin-right: 4px;" id="MOKKA" class="STOPPI">
    //                 <span>STOP</span>
    //               </button>
    //               <button id="MOKKA" class="SKIPPI">
    //                 <span>SKIP</span>
    //               </button>
    //             </div>
    //           <input id="SLIDDU" class="slider" type="range" min="1" max="100" value="50">
    //           </div>
    //         </center>
    //         <div id="resultti"></div>
    //       `
    //       if (!document.getElementById('YEPCOCK')) return console.log("Yepcock ei ole elem id")
    //       document.getElementById('YEPCOCK').appendChild(frame)
    //       window.frame = frame
    //       document.getElementById('hakusana').focus()
    //       document.querySelector('.STOPPI').removeEventListener('click')
    //       document.querySelector('.SKIPPI').removeEventListener('click')
    //       document.querySelector('#SLIDDU').removeEventListener('click')
    //       document.querySelector('#SLIDDU').addEventListener('change', () => {
    //         const newVolume = document.querySelector('#SLIDDU').value
    //         if (newVolume < 1) {
    //           newVolume = 1
    //         }
    //         socket.emit('setVolume', {
    //           id: guildId,
    //           volume: newVolume
    //         })
    //       })
    //       document.querySelector('.STOPPI').addEventListener('click', () => {
    //         socket.emit('leave', { id: guildId })
    //         BdApi.showToast('Lähetty himaa', { type: 'success', icon: true })
    //       })
    //       document.querySelector('.SKIPPI').addEventListener('click', () => {
    //         socket.emit('skip', { id: guildId, block: false })
    //         BdApi.showToast('Skipattu', { type: 'success', icon: true })
    //       })
    //     }
    //     socket.on('ADDED_VIDEO_QUEUE', data => {
    //       const { error } = data
    //       if (error)
    //         return BdApi.showToast('Ei löytynyt', {
    //           type: 'warning',
    //           icon: true
    //         })
    //       BdApi.showToast('Soitetaa', { type: 'success', icon: true })
    //     })
    //     socket.on('GOT_VIDEOS', data => {
    //       const { error, videos } = data
    //       if (error)
    //         return BdApi.showToast('Ei löytynyt', {
    //           type: 'warning',
    //           icon: true
    //         })
    //       const video = videos[0]
    //       const queueData = {
    //         video: video,
    //         auth: auth,
    //         guildId: guildId
    //       }
    //       socket.emit('ADD_VIDEO_QUEUE', queueData)
    //       // const div = document.querySelector('#resultti')
    //       // const videoss = videos.map(video => `<h1 id="${video.id}">${video.title}</h1>`)
    //       // videos.map(video => {
    //       //   document.getElementById(video.id).addEventListener('click', () => {
    //       //   })
    //       // })
    //     })
    //   }, 1000)
    // }, 4000)
  } // Called when the plugin is activated (including after reloads)

  stop() {} // Called when the plugin is deactivated

  observer(changes) {} // Observer for the `document`. Better documentation than I can provide is found here: <https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver>
}

module.exports = SleierPlugin
