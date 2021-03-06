/**
 * @name Sleier
 * @author JEFFe
 * @authorId 214760917810937856
 * @version 1.0.1
 * @description Sleier plugin lisää kontenttia discordiin
 * @website https://jeffe.co
 * @source https://raw.githubusercontent.com/jeffeeeee/SleierBD/main/Sleier.plugin.js
 * @updateUrl https://raw.githubusercontent.com/jeffeeeee/SleierBD/main/Sleier.plugin.js
 */

module.exports = class ExamplePlugin {
    getName() {
      return "Sleier"; // Name of your plugin to show on the plugins page
    }
    getDescription() {return "Sleier plugin lisää kontenttia discordiin";} // Description to show on the plugins page
    getVersion() {return "1.0.1";} // Current version. I recommend following semantic versioning <http://semver.org/> (e.g. 0.0.1)
    getAuthor() {return "Jehve";} // Your name

    load() {
      console.log("SLEier loaded to memory")
  if (!global.ZeresPluginLibrary) {
        console.log("ei ole zeres plugaa")
        return BdApi.showConfirmationModal("Lataa lisäosa",
          [`Lataa lisäosa joka puuttuu !!!!!!!!!!!!!!!KÄYNNISTÄ DISCORD UUSIKSI Latauksen jälkeen!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!KÄYNNISTÄ DISCORD UUSIKSI Latauksen jälkeen!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!KÄYNNISTÄ DISCORD UUSIKSI Latauksen jälkeen!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!KÄYNNISTÄ DISCORD UUSIKSI Latauksen jälkeen!!!!!!!!!!!!!!!!!`], {
              confirmText: "Lataa",
              cancelText: "En",
              onConfirm: () => {
                  require("request").get("https://rauenzi.github.io/BDPluginLibrary/release/0PluginLibrary.plugin.js", async (error, response, body) => {
                  if (error) return require("electron").shell.openExternal("https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/rauenzi/BDPluginLibrary/master/release/0PluginLibrary.plugin.js");
                  await new Promise(r => require("fs").writeFile(require("path").join(BdApi.Plugins.folder, "0PluginLibrary.plugin.js"), body, r));
                  });
              }
          });

      }


      return true
    } // Called when the plugin is loaded in to memory

    onSwitch(e) {
      console.log("ONSSWITCH ",e)

      const button = `
      <div class="buttonContainer-28fw2U da-buttonContainer">
        <button aria-label="Open GIF picker" tabindex="0" type="button" class="buttonWrapper-1ZmCpA da-buttonWrapper button-38aScr da-button lookBlank-3eh9lL colorBrand-3pXr91 grow-q77ONN da-grow noFocus-2C7BQj da-noFocus">
          <div class="contents-18-Yxp da-contents button-3AYNKb da-button button-318s1X da-button" style="margin: 0;">
            <img style="height: 26px; width: 26px; border-radius: 90px; margin-top: 5px;" src="https://cdn.discordapp.com/avatars/374563183769288706/f25f2202b6077c9bf4cd9154abb30dbe.png?size=128" alt=" " class="avatar-VxgULZ da-avatar" aria-hidden="true">
          </div>
        </button>
      </div>
      `

      document.getElementById("OOPPEL") && document.getElementById("OOPPEL").remove()
      const frame = document.createElement('div')
      frame.id = "OOPPEL"
      frame.innerHTML = button

      const buttonz = document.querySelectorAll('.da-buttons')

      buttonz[buttonz.length-1].appendChild(frame)

      document.querySelector(`#OOPPEL`).removeEventListener('click')
      document.querySelector(`#OOPPEL`).addEventListener('click', () => {
        window.YEPCOCK()
      })
    }

    start() {

     setTimeout(() => {
        console.log("WOK")

        if (!global.ZeresPluginLibrary) return
        const button = `
        <div class="buttonContainer-28fw2U da-buttonContainer">
          <button aria-label="Open GIF picker" tabindex="0" type="button" class="buttonWrapper-1ZmCpA da-buttonWrapper button-38aScr da-button lookBlank-3eh9lL colorBrand-3pXr91 grow-q77ONN da-grow noFocus-2C7BQj da-noFocus">
            <div class="contents-18-Yxp da-contents button-3AYNKb da-button button-318s1X da-button" style="margin: 0;">
              <img style="height: 26px; width: 26px; border-radius: 90px; margin-top: 5px;" src="https://cdn.discordapp.com/avatars/374563183769288706/f25f2202b6077c9bf4cd9154abb30dbe.png?size=128" alt=" " class="avatar-VxgULZ da-avatar" aria-hidden="true">
            </div>
          </button>
        </div>
        `

        document.getElementById("OOPPEL") && document.getElementById("OOPPEL").remove()
        const frame = document.createElement('div')
        frame.id = "OOPPEL"
        frame.innerHTML = button

        const buttonz = document.querySelectorAll('.da-buttons')

        buttonz[buttonz.length-1].appendChild(frame)

        document.querySelector(`#OOPPEL`).removeEventListener('click')
        document.querySelector(`#OOPPEL`).addEventListener('click', () => {
          window.YEPCOCK()
        })

        console.log(this)
        console.log(window)

        const BdApi = window.BdApi

        BdApi.linkJS("SOCKETTI", "https://jeffe.co/socket.io/socket.io.js")

        setTimeout(() => {
          const io = window.io

          window.socketti = io("https://jeffe.co")
          const socket = socketti

          setTimeout(() => {
            BdApi.showToast(`Sleier: ${socketti.connected ? 'CONNECTED' : 'Eipä ollu connectattu'}`, {type: "success", icon: true})
          }, 1000);

          const guildId = window.location.href.split("/")[4]
          const channelId = window.location.href.split("/")[5]

          console.log("IDs ", guildId, channelId)



          const username = window.ZLibrary.DiscordAPI.currentUser.discordObject.username
          const id = window.ZLibrary.DiscordAPI.currentUser.discordObject.id
          const avatar = window.ZLibrary.DiscordAPI.currentUser.discordObject.avatar
          const avatarURL = window.ZLibrary.DiscordAPI.currentUser.discordObject.avatarURL

          const auth = {
            "username": username,
            "id": id,
            "verified": true,
            "avatar": avatar,
            "avatarURL": avatarURL
          }

        window.YEPCOCK = yep

        function yep() {
          BdApi.showConfirmationModal("Sleier",
            [
                BdApi.React.createElement("div", {id: "YEPCOCK"})
            ],
            {
                danger: false,
                confirmText: "Soita",
                cancelText: "Takaisin",
                onConfirm: (e) => {
                  const nappi = document.getElementById('haku')
                  const result = document.getElementById('resultti')
                  const input = document.getElementById('hakusana').value
                  console.log(input, 'value')

                  socket.emit('SEARCH_VIDEOS', {
                    data: { auth, guildId: guildId },
                    searchTerm: input
                  })
                }
            }
          );


          document.getElementById("spanni") && document.getElementById("spanni").remove()
          const frame = document.createElement('div')
          frame.id = "spanni"
          frame.style.position = 'fixed'
          frame.style.transition = `transform 0.23s`
          frame.style.zIndex = 9999

          frame.innerHTML = `
            <style>
              #hakusana {
                width: 97%;
                padding: .25rem 0;
                border: 0;
                border-bottom: 1px solid #4f545c;
                outline: 0;
                background: transparent;
                color: #fff;
                font-size: 3rem;
                line-height: 4rem;
                letter-spacing: .125rem;
                transition: all .5s cubic-bezier(.4, .25, .8, .3);
                padding-bottom: 1px;
              }

              #MOKKA {

                cursor: pointer;

                display: flex;
                margin-right: 4px;
                align-items: center;
                text-align: center;
                justify-content: center;
                color: #b3b3b3;
                background: transparent;
                border-radius: 4px;

                transition: all 0.2s cubic-bezier(0.25, 0.1, 0.25, 1);

              }

              #MOKKA:hover {
                box-shadow: 0px 5px 12px 0px rgba(0,0,0,0.06), 0px 3px 11px 0px rgba(32, 34, 37, 0.19);
                background: #32343a;

              }

              #MOKKA:active {
                box-shadow: 0px 5px 12px 0px rgba(0,0,0,0.00), 0px 3px 11px 0px rgba(32, 34, 37, 0.00);
                background: #32343a;
              }

              #CLDOS {
                width: 97%;
                display: grid;
                grid-template-columns: 1fr 65px 65px;
                grid-template-rows: 60px;
              }


              .slider {
                -webkit-appearance: none;
                background: transparent;
                outline: none;
                -webkit-transition: .2s;
                transition: all 0.2s cubic-bezier(0.25, 0.1, 0.25, 1);
              }

              .slider:hover {
                background: #32343a;
              }

              .slider::-webkit-slider-thumb {
                -webkit-appearance: none;
                appearance: none;
                width: 16px;
                height: 16px;
                background: #52545a;
                cursor: pointer;
              }
            </style>

            <center id="CLDOS">

              <input style="margin-right: 4px;" autofocus id="hakusana" type="text"></input>
              <div>
                <div id="CLDOS" style="grid-template-columns: 65px 65px; grid-template-rows: 40px 1fr;">
                  <button style="margin-right: 4px;" id="MOKKA" class="STOPPI">
                    <span>STOP</span>
                  </button>
                  <button id="MOKKA" class="SKIPPI">
                    <span>SKIP</span>
                  </button>

                </div>
              <input id="SLIDDU" class="slider" type="range" min="1" max="100" value="50">
              </div>

            </center>



            <div id="resultti"></div>

          `
          document.getElementById("YEPCOCK").appendChild(frame)
          window.frame = frame

          document.getElementById("hakusana").focus()

          document.querySelector('.STOPPI').removeEventListener('click')
          document.querySelector('.SKIPPI').removeEventListener('click')
          document.querySelector('#SLIDDU').removeEventListener('click')

          document.querySelector('#SLIDDU').addEventListener('change', () => {
            const newVolume = document.querySelector('#SLIDDU').value
            if (newVolume < 1) {
              newVolume = 1
            }

            socket.emit('setVolume', {
              id: guildId,
              volume: newVolume
            })
          })


          document.querySelector('.STOPPI').addEventListener('click', () => {
            socket.emit('leave', { id: guildId })
            BdApi.showToast('Lähetty himaa', {type: "success", icon: true})
          })

          document.querySelector('.SKIPPI').addEventListener('click', () => {
            socket.emit('skip', { id: guildId, block: false })
            BdApi.showToast('Skipattu', {type: "success", icon: true})
          })
        }

        socket.on('ADDED_VIDEO_QUEUE', data => {
          let { error } = data

          if (error) return BdApi.showToast('Ei löytynyt', {type: "warning", icon: true})

          BdApi.showToast('Soitetaa', {type: "success", icon: true})
        })


        socket.on('GOT_VIDEOS', data => {
          let { error, videos } = data

          if (error) return BdApi.showToast('Ei löytynyt', {type: "warning", icon: true})

          const video = videos[0]
          const queueData = {
            video: video,
            auth: auth,
            guildId: guildId
          }

          socket.emit('ADD_VIDEO_QUEUE', queueData)

          // const div = document.querySelector('#resultti')
          // const videoss = videos.map(video => `<h1 id="${video.id}">${video.title}</h1>`)
          // videos.map(video => {
          //   document.getElementById(video.id).addEventListener('click', () => {

          //   })
          // })



        })

      }, 1000);
     }, 4000);

    } // Called when the plugin is activated (including after reloads)
    stop() {} // Called when the plugin is deactivated

    observer(changes) {} // Observer for the `document`. Better documentation than I can provide is found here: <https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver>
}
