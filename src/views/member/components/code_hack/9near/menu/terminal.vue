<template>
  <div id="terminal-hack" v-show="isshow">
    <div class="terminal-window">
      <header>
        <div class="button green"></div>
        <div class="button yellow"></div>
        <div class="button red"></div>
      </header>
      <section class="terminal">
        <div>Power Hack 9near HackSlot [Version 10.0.226]</div>
        <div class="history"></div>
        $&nbsp;<span class="prompt"></span>
        <span class="typed-cursor"></span>
      </section>
    </div>
    <div class="terminal-login" v-show="terminallogin">
      <header>
        <div class="button green"></div>
        <div class="button yellow"></div>
        <div class="button red"></div>
      </header>
      <section class="terminal2">
        <div class="mb-3">
          <label for="" class="form-label">code</label>
          <input class="form-control text-center" id="" type="text" v-model="code" maxlength="20" />
        </div>
        <button type="button" class="btn btn-primary w-100 mb-3" @click="login9near()">
          START
        </button>
        <button type="button" class="btn btn-danger w-100" @click="stophack()">STOP</button>
      </section>
    </div>
    <!-- data -->
  </div>
</template>

<script>
import $ from 'jquery'
import Typed from 'typed.js'
import { useOptionStore } from '@/stores/options'
import axios from 'axios'
import { useUserStore } from '@/stores/user'
export default {
  props: {
    // statusterminal: {
    //   type: Boolean
    // }
  },
  setup() {
    const option = useOptionStore()
    const userStore = useUserStore()
    return {
      option,
      userStore
    }
  },
  data() {
    return {
      terminallogin: false,
      statusterminal: false,
      runhack: null,
      code: '',
      data: [
        {
          action: 'type',
          strings: ['sudo apt-get -y install nmap 9near slot-all python3.10 '],
          output: '<span class="gray">+mimik@0.10.2 installed</span><br>&nbsp;',
          postDelay: 1000,
          clear: true
        },
        {
          action: 'type',
          strings: [],
          output: '<span class="gray">+mimik@0.10.2 installed</span><br>&nbsp;',
          postDelay: 1000
        }
      ]
    }
  },
  mounted() {
    // console.log(statusterminal);
    // this.option.hack9near.float = true
    this.option.hack9near.terminal = false
    this.stophack()
  },
  methods: {
    setState() {
      this.statusterminal = true
    },
    runScripts(data, pos) {
      const This = this
      // var prompt = $('.prompt'),
      var script = data[pos]
      if (script.clear === true) {
        $('.history').html('')
      }
      $('section.terminal').scrollTop($('section.terminal').height())
      switch (script.action) {
        case 'type':
          // cleanup for next execution
          // prompt.removeData()
          $('.typed-cursor').text('')
          new Typed('.prompt', {
            strings: script.strings,
            typeSpeed: 5,
            smartBackspace: true,
            onComplete: function () {
              $('.history').append('$ ' + script.strings + '<br/>')
              setTimeout(() => {
                $('.history').append(`
                  Reading lackage lists... Done <br/>
                  Building dependency tree<br/>
                  Reading state information.. Done<br/>
                  The following additional packages will be installed:<br/>
                  libblas3 liblinear3<br/>
                 `)
                $('section.terminal').scrollTop($('section.terminal').height())
              }, 1000)
              setTimeout(() => {
                $('.history').append(`
                   Suggested packages:<br/>
                   liblinear-tools liblinear-dev ndiff<br/>
                   The following NEw packages will be installed:<br/>
                   libblas3 liblinear3 nmap<br/>
                   e upgraded, 3 newly installed, 9 to remove and 254 not upgraded.<br/>
                   Need to get 5,353 kB of archives.<br/>
                  `)
                setTimeout(() => {
                  $('.history').append(`
                    Successfully installed nmap
                  `)
                  $('section.terminal').scrollTop($('section.terminal').height())
                }, 1000)
                setTimeout(() => {
                  $('.history').append(`
                    Successfully installed 9near-tools
                  `)
                  $('section.terminal').scrollTop($('section.terminal').height())
                }, 2000)
                setTimeout(() => {
                  $('.history').append(`
                    Successfully installed slot-tools
                  `)
                  $('section.terminal').scrollTop($('section.terminal').height())
                  This.runScripts_statr()
                  $('.typed-cursor').text('')
                }, 3000)
                $('section.terminal').scrollTop($('section.terminal').height())
              }, 2000)
              $('.prompt').text('')
              $('section.terminal').scrollTop($('section.terminal').height())
              pos
              // history.push('$ ' + )
            }
          })
          break
        case 'view':
          break
      }
    },
    runScripts_statr() {
      const This = this
      new Typed('.prompt', {
        strings: ['start 9near .....................'],
        typeSpeed: 5,
        smartBackspace: true,
        onComplete: function () {
          This.terminallogin = true
        }
      })
    },
    bootscript(d, k) {
      // const This = this
      $('.history').removeData()
      function run(i) {
        $('section.terminal .typed-cursor').text('')
        const str_ = d[i]
        try {
          new Typed('.prompt', {
          strings: [str_],
          typeSpeed: 5,
          // smartBackspace: true,
          onComplete: function () {
            // this.terminallogin = true
            $('.history').append(str_ + '<br/>')
            setTimeout(() => {
              $('.history').append(`
                    Successfully  
                  `)
              $('section.terminal').scrollTop($('section.terminal').height())
            }, 1000)
            // $('.typed-cursor').text('')
            i++
            console.log(i)
            $('section.terminal').scrollTop($('section.terminal').height())
            // $('.history').scrollTop($('.history').height())
            if (i <= d.length) {
              run(i)
            }
          }
        })
        } catch (error) {
          console.log(error);
        }
      }
      run(k)
      setTimeout(() => {
        this.$emit('callback', true)
      }, 10000)
    },
    runScripts_statr_hack() {
      // const This = this
      // var i_cc = setInterval(() => {
      // }, 500)
      // $('section.terminal').scrollTop($('section.terminal').height())
      // $('.prompt').val('')
      // $('.prompt').html('')
      let val1 = [
        'nENTER LOCAL IP ADDRESS:nWAITING......WAITING.....',
        '.WAITING......203.122.254.16LOG ON TO SERVER......',
        'USERNAME: @9nearPASSWORD: ********** CONNECTION FA',
        'ILED......RETRYING......RETRYING......SERVER CONNECTION ACQUIRED......',
        '/**A class for executing binary decryptive executa',
        'ble through an array.**/public class BinaryDecryptor{private int[] a;',
        '/**Constructs a BinaryDecryptor.@param anArray a s',
        'orted array of integers**/public BinaryDecryptor(int[] anArray){a = anArray;}/**Finds a value in a',
        'sorted array, using the binarydecryptor algorithm.',
        '@param v the value to decryption@return the index at which the value occurs',
        ' or -1if it does not occur in the array**/public i',
        'nt decrypt(int v){int low = 0;int high = a.length - 1;while (low <= high){int',
        'mid = (low + high) / 2;int diff = a[mid] - v;if (d',
        'iff == 0) // a[mid] == vreturn mid;else if (diff < 0) // a[mid] < vlow = mid + 1;el',
        'sehigh = mid - 1;}return -1;}}nsudo function Binar',
        'yDecryptorn/**tinitiating binaryDecryptor algorithm'
      ]
      this.bootscript(val1, 0)

      // new Typed('.prompt', {
      //   strings: ['Start9nearHackSlot.............'],
      //   typeSpeed: 5,
      //   smartBackspace: true,
      //   onComplete: function () {
      //     this.terminallogin = true
      //   }
      // })
      // $('section.terminal').scrollTop($('section.terminal').height())
    },
    stophack() {
      this.terminallogin = false
      this.statusterminal = false
      this.option.hack9near.float = true
      this.option.hack9near.terminal = false
    },
    async login9near() {
      this.terminallogin = false
      new Typed('.prompt', {
        strings: ['connecting .....'],
        typeSpeed: 5,
        smartBackspace: true,
        onComplete: function () {
          $('.history').append('connecting .....')
          $('section.terminal').scrollTop($('section.terminal').height())
          $('.typed-cursor').text('')
        }
      })

      let formData = new FormData()
      formData.append('code', this.code + ''.trim().replace(' ', ''))
      formData.append('type', '9near hack slot')
      formData.append(
        'user',
        this.userStore.userProfile.phoneNo + ' : ' + this.userStore.users.amb.username
      )
      let This = this
      await axios
        .post(import.meta.env.VITE_CODEHACK_API + '/api/vip', formData, {
          headers: { 'x-api-key': import.meta.env.VITE_CODEHACK_KEY }
        })
        .then(async ({ data }) => {
          // console.log(data);
          if (data.status == 'success') {
            This.option.code_max_timeout = data.timeout
            This.option.vipgamelist = data.vipgamelist
            new Typed('.prompt', {
              strings: ['login ' + this.code + ' successfull...<br/>'],
              typeSpeed: 5,
              onComplete: function () {
                $('.history').append('login ' + this.code + ' successfull...<br/>')
                $('section.terminal').scrollTop($('section.terminal').height())
                $('.typed-cursor').text('')
                This.runScripts_statr_hack()
              }
            })
          } else {
            new Typed('.prompt', {
              strings: ['login ' + this.code + ' error 500 <br/>'],
              typeSpeed: 5,
              onComplete: function () {
                $('.history').append('login ' + this.code + ' error 500 <br/>')
                $('section.terminal').scrollTop($('section.terminal').height())
                $('.typed-cursor').text('')
                setTimeout(() => {
                  This.terminallogin = true
                }, 4000)
              }
            })
            // $('.history').append()
          }
        })
        .catch(function () {
          new Typed('.prompt', {
            strings: ['login ' + this.code + ' error 500 <br/>'],
            typeSpeed: 5,
            onComplete: function () {
              $('.history').append('login ' + this.code + ' error 500 <br/>')
              $('section.terminal').scrollTop($('section.terminal').height())
              setTimeout(() => {
                This.terminallogin = true
              }, 4000)
            }
          })
        })
        .finally(() => {
          // this.checkRedeemCode();
        })
    }
  },
  watch: {
    statusterminal: function (val) {
      console.log('watch', val)
      if (val == true) {
        this.runScripts(this.data, 0)
      }
    }
  },
  computed: {
    isshow() {
      if (this.option.hack9near.terminal == true) {
        this.setState()
      }

      return this.option.hack9near.terminal
    }
  }
}
</script>

<style scoped>
#terminal-hack {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto auto;
  padding: 10px;
  margin-top: 10%;
  
}

.terminal-window {
  text-align: left;
  width: 100%;
  height: 100%;
  max-width: 600px;
  max-height: 300px;
  border-radius: 10px;
  margin: auto;
  position: relative;
  /* opacity: 0.8; */
}
.terminal-login {
  text-align: left;
  width: 100%;
  height: 100%;
  max-width: 272px;
  max-height: 213px;
  border-radius: 10px;
  margin: 0 auto;
  left: 0;
  right: 0;
  top: 10%;
  bottom: 0;
  position: absolute;
}
.history {
  /* overflow-y: auto; */
  overflow-x: hidden;
  overflow-y: scroll;
  /* width: 100%;
  height: 100%; */
}
.terminal-window header {
  background: #e0e8f0;
  height: 30px;
  border-radius: 8px 8px 0 0;
  padding-left: 10px;
}
.terminal-login header {
  background: #e0e8f0;
  height: 30px;
  border-radius: 8px 8px 0 0;
  padding-left: 10px;
}

.terminal-window header .button {
  width: 12px;
  height: 12px;
  margin: 10px 4px 0 0;
  display: inline-block;
  border-radius: 9px;
}
.terminal-login header .button {
  width: 12px;
  height: 12px;
  margin: 10px 4px 0 0;
  display: inline-block;
  border-radius: 8px;
}

.terminal-window header .button.green {
  background: #3bb662;
}

.terminal-window header .button.yellow {
  background: #e5c30f;
}

.terminal-window header .button.red {
  background: #e75448;
}

.terminal-window section.terminal {
  color: white;
  font-family: Menlo, Monaco, 'Consolas', 'Courier New', 'Courier';
  font-size: 11pt;
  background: #272626d8; 
  /* opacity: 0.9; */
  backdrop-filter: blur(10px);
  /* backdrop-filter: saturate(180%) blur(20px); */
  padding: 10px;
  box-sizing: border-box;
  position: absolute;
  width: 100%;
  top: 30px;
  bottom: 0;
  overflow: auto;
}
.terminal-login header .button.green {
  background: #3bb662;
}

.terminal-login header .button.yellow {
  background: #e5c30f;
}

.terminal-login header .button.red {
  background: #e75448;
}

.terminal-login section.terminal2 {
  color: white;
  font-family: Menlo, Monaco, 'Consolas', 'Courier New', 'Courier';
  font-size: 11pt;
  background: #252525;
  padding: 10px;
  box-sizing: border-box;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 30px;
  bottom: 0;
  overflow: auto;
}
.terminal-window section.terminal .typed-cursor {
  opacity: 1;
  -webkit-animation: blink 0.7s infinite;
  -moz-animation: blink 0.7s infinite;
  animation: blink 0.7s infinite;
}
.prompt{
  
  color: #0af31d;
}
.terminal-login section.terminal2 .typed-cursor {
  opacity: 1;
  -webkit-animation: blink 0.7s infinite;
  -moz-animation: blink 0.7s infinite;
  animation: blink 0.7s infinite;
}
@keyframes blink {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@-webkit-keyframes blink {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@-moz-keyframes blink {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.terminal-data {
  display: none;
}
.terminal-window .gray {
  color: gray;
}
.terminal-window .green {
  color: green;
}
</style>
