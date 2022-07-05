<template>
  <div class="flex-center">
    <div class="pannel-box">
      <div class="back-box">
        <div class="card">
          <div class="hello">
            <div style="margin-left: 15px; margin-top: 35px;">
            <h1>:P</h1>
            <h2>欢迎，</h2>
            <small>Welcome</small>
            </div>
          </div>
        </div>
        <div class="tl-triangle"></div>
      </div>
      <div class="front-box">
        <h2>lizy14</h2>
        <div class="status-table">
          <span class="title"> 已连接 <br/> Duration </span>
          <h1>{{status_duration_str}}</h1>
          <span class="title">已用流量<br/>Usage</span>
          <VolumeBar :value="status_flow_bar_val">
            <div class="v-center" style="height: 100%;">
              <h3 class="flow-volumn-text" style="margin:auto 0 auto 0.5em">{{status_flow_str}}</h3>
            </div>
          </VolumeBar>
        </div>
        
      </div>
      <div class="button-box">
        <div class="tri"></div>
        <button type="button">
          断开连接<br/>Disconnect
        </button>
      </div>
      <div class="pannel-shadow"></div>
      <div class="link-box">
        <a class="tool-btn" href="http://info.tsinghua.edu.cn">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-lg" viewBox="0 0 16 16">
            <path d="m9.708 6.075-3.024.379-.108.502.595.108c.387.093.464.232.38.619l-.975 4.577c-.255 1.183.14 1.74 1.067 1.74.72 0 1.554-.332 1.933-.789l.116-.549c-.263.232-.65.325-.905.325-.363 0-.494-.255-.402-.704l1.323-6.208Zm.091-2.755a1.32 1.32 0 1 1-2.64 0 1.32 1.32 0 0 1 2.64 0Z"/>
          </svg>Info
        </a>
        <a class="tool-btn" href="https://lib.tsinghua.edu.cn/">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M448 336v-288C448 21.49 426.5 0 400 0H96C42.98 0 0 42.98 0 96v320c0 53.02 42.98 96 96 96h320c17.67 0 32-14.33 32-31.1c0-11.72-6.607-21.52-16-27.1v-81.36C441.8 362.8 448 350.2 448 336zM143.1 128h192C344.8 128 352 135.2 352 144C352 152.8 344.8 160 336 160H143.1C135.2 160 128 152.8 128 144C128 135.2 135.2 128 143.1 128zM143.1 192h192C344.8 192 352 199.2 352 208C352 216.8 344.8 224 336 224H143.1C135.2 224 128 216.8 128 208C128 199.2 135.2 192 143.1 192zM384 448H96c-17.67 0-32-14.33-32-32c0-17.67 14.33-32 32-32h288V448z"/></svg>Lib
        </a>
        <a class="tool-btn" href="https://learn.tsinghua.edu.cn/">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
          </svg>Learn
        </a>
        <a class="tool-btn" href="https://mails.tsinghua.edu.cn/">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M464 64C490.5 64 512 85.49 512 112C512 127.1 504.9 141.3 492.8 150.4L275.2 313.6C263.8 322.1 248.2 322.1 236.8 313.6L19.2 150.4C7.113 141.3 0 127.1 0 112C0 85.49 21.49 64 48 64H464zM217.6 339.2C240.4 356.3 271.6 356.3 294.4 339.2L512 176V384C512 419.3 483.3 448 448 448H64C28.65 448 0 419.3 0 384V176L217.6 339.2z"/></svg>Mail
        </a>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import sprintf from 'voca/sprintf.js'


const status_duration = ref(1538)
const status_duration_str = computed(() => {
  let sec = status_duration.value;
  let hour = Math.floor(sec / 60 / 60)
  sec -= hour * 60 * 60
  let min = Math.floor(sec / 60)
  sec -= min * 60
  sec = Math.floor(sec)
  return sprintf("%02d:%02d:%02d", hour, min, sec)
})

const status_flow_volumn = ref(43.96 * 1024 * 1024 * 1024) // uint: byte
const status_flow_str = computed(() => {
  return sprintf("%.2fG", status_flow_volumn.value / 1024 / 1024 / 1024)
})
const status_flow_bar_val = computed(() => {
  return status_flow_volumn.value / 1024 / 1024 / 1024 / 50
})

</script>

<style>
html, body, #__nuxt{
  height: 100%;
}

body {
  background-color: #e6e6e6;
}
</style>

<style lang="scss" scoped>
$theme-color: #e74e2e;

.v-center {
  display: flex;
  align-items: center;
  height: 100%;
}

.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.pannel-box {
  width: 420px;
  height: 300px;

  .back-box {
    width: 350px;
    height: 250px;
    display: flex;
    flex-direction: column;

    .card {
      width: 100%;
      height: 200px;
      background-color: $theme-color;

      color: white;

      h1 {
        margin: 0px;
        font-size: 60px;
      }

      h2 {
        margin-top: 5px;
        margin-bottom: 0px;
        font-size: 26px;
      }
    }

    .tl-triangle {
      width: 40px;
      height: 40px;
      margin-left: 15px;
    }
  }

  .front-box {
    position: absolute;
    margin-left: 90px;
    margin-top: -210px;
    z-index: 10;

    width: 300px;
    height: 200px;


    background: #fbfbfb;
    padding: 20px 20px 0 20px;

    @for $i from 1 through 4{
      h#{$i}{
        padding: 0;
        margin: 0;
        color: darken($theme-color, 10%);
      }
    }

    .status-table {
      margin-top: 10px;
      font-size: small;

      display: grid;
      grid-template-columns: min-content auto;
      grid-template-rows: auto auto;
      grid-gap: 10px;

      .title {
        text-align: right;
        align-self: end;
      }

      @for $i from 1 through 4{
        h#{$i}{
          margin-top: auto;
          color: lighten($theme-color, 10%);
        }
      }

      .flow-volumn-text {
        overflow: visible; 
        word-break: keep-all;
        color: grey;
        vertical-align: middle;
      }
    }
  }

  .button-box {
    position: absolute;
    margin-left: 320px;
    margin-top: -30px;
    z-index: 20;

    width: 120px;
    height: 60px;
    background-color: white;
    box-shadow: 0 0 3px 0px lightgray;

    button {
      margin: 10px; 
      background-color: #c0becc; 
      width: 100px; 
      height: 40px; 
      text-align: center;
      border:none;
      
      &:hover{
        background-color: lighten(#c0becc, 5%)
      }

      &:active {
        background-color: darken(#c0becc, 5%);
      }
    }

    .tri{
      position: absolute;
      width: 10px;
      height: 10px;
      margin-left: 110px;
      margin-top: -10px;

      background-color: #c9c9c9;
      clip-path: polygon(0 0, 100% 100%, 0 100%);
    }
  }

  .pannel-shadow{
    height: 20px;
    width: 80px;
    background: radial-gradient(#9a9a9a 0%, #dcdcdcab 80%, transparent 100%);
    filter: blur(3px);
    transform: scale(3.5, 1) translate(40px, 4px);
  }

  .link-box{
    margin-top: 30px;

    display: flex;
    justify-content: right;

    font-size: 8px;
    vertical-align: baseline;

    .tool-btn{
      color: lighten($theme-color, 10%);
      margin-left: 20px;

      text-decoration: none;
      &:hover{
        text-decoration: underline;
      }

      svg {
        width: 20px;
        height: 20px;
        margin-right: 2px;

        path {
          fill: lighten($theme-color, 10%);
        }
      }
    }
  }
}

.tl-triangle { // top-left
  background-color: $theme-color;
  clip-path: polygon(0 0, 100% 0, 0 100%);
}
</style>