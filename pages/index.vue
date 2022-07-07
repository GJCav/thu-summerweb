<template>
<div class="h-center">
  <div class="container">
    <img src="/img/header.png" style="width: 900px;margin-left: 48px;" />
    <img src="/img/bkg.png" />
    <div class="info-pannel">
      <marquee direction="up" scrollamount="2">sdfeefefefefefefefefefeeeeeeeeeeeeeeeeeeessdddsdfeefefefefefefefefefeeeeeeeeeeeeeeeeeeessdddsdfeefefefefefefefefefeeeeeeeeeeeeeeeeeeessddd</marquee>
    </div>
    <div class="login-pannel">
      <div class="input-table">
        <div>
          <span class="label-text">用户名</span> <br/>
          <span class="lable-s-text">User ID</span>
        </div>
        <input type="text" id="uname" />
        <div>
          <span class="label-text">密码</span> <br/>
          <span class="lable-s-text">Password</span>
        </div>
        <input type="password" id="passwd" />
      </div>
      <button class="connect-btn" @click="onConnect">
        <span style="font-size:24px">连接</span>
        <br/>
        <span style="font-size:18px">Connect</span>
      </button>
      <div class="login-tri"></div>
    </div>
    <div class="download">
      <ul>
        <li>Windows</li>
        <li>MacOS</li>
        <li>Linux</li>
        <li>Android</li>
        <li>iOS</li>
      </ul>
      <a style="margin-left: 400px;margin-top: 80px;">收藏<br/>Bookmark This Page</a>
      <a style="margin-left: 568px;margin-top: 80px;">帮助<br/>Help</a>
      <div class="contact">
        <div>联系<br/>Contact</div>
        <div style="margin-left: 10px;">+86-10-62784859<br/><a href="mailto:its@tsinghua.edu.cn">its@tsinghua.edu.cn</a></div>
      </div>
    </div>
  </div>
</div>
  
</template>


<script setup>

const profile = useUserProfile();

onMounted(async () => {
  await fetchUserProfile()
  console.log("index.vue")
  console.log(profile.value)
  if(profile.value.login){
    console.log("already login")
    navigateTo("/success");
  }else{
    console.log("wait for login")
  }
})

function onConnect(){
  let uname = document.getElementById("uname").value;
  let passwd = document.getElementById("passwd").value;

  userLogin(uname, passwd).then((j) => {
    navigateTo("/success");
  }).catch((res) => {
    if(res == 403){
      alert("用户名或密码错误");
    }
  })
}

</script>

<style>
html, body, #__nuxt{
  height: auto;
}

body {
  background: linear-gradient(180deg, #e6e6e6 0%, #e6e6e6 50%, #dbdbdd 100%);
}
</style>

<style scoped lang="scss">

.h-center{
  display: flex;
  justify-content: center;
}

.container {
  width: 768px;
  margin-left: -180px;

  display: flex;
  flex-direction: column;
}

.info-pannel{
  position: absolute;
  margin-top: 350px;
  margin-left: 80px;
  width: 280px;
  height: 90px;

  color: white;

  marquee{
    height: 100%;
    word-break: break-all;
  }
}

.login-pannel{
  position: absolute;
  width: 450px;
  height: 260px;

  margin-left: 400px;
  margin-top: 200px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  background-color: #F2F2F2;
  box-shadow: 0 0 4px 2px #8080804a;

  padding: 40px;

  .input-table{
    display: grid;
    grid-template-rows: auto auto;
    grid-template-columns: min-content auto;
    row-gap: 20px;
    column-gap: 28px;

    .label-text{
      font-size: x-large;
    }

    .lable-s-text{
      font-size: large;
    }

    input{
      border: #E6E6E6 solid 1px;
      padding: 2px;
      background: #e8f0fe;
      font-family: Helvetica, Arial, sans-serif;
      font-size: 34px;
      outline: none;

      width: 333px;

      &:focus-within{
        box-shadow: 0 0 11px 3px #ecd95c6b;
      }
    }
  }

  .connect-btn{
    margin-top: auto;
    width: 100%;

    border: #9CB22E solid 1px;
    background-color: #c0ce55;

    &:hover {
      background-color: #D2E042;
    }

    &:active {
      background-color: #AAC30B;
    }
  }

  .login-tri{
  height: 50px;
  width: 50px;
  background-color: #F2F2F2;

  position: absolute;
  margin-left: 280px;
  margin-top: 300px;

  clip-path: polygon(0 0, 100% 0, 0 100%);
  }
}

.download {
  background: url("/img/download.png") no-repeat;
  background-size: 865px 120px;

  width: 985px;
  height: 140px;

  margin-left: 70px;
  margin-top: 60px;

  ul {
    position: absolute;
    margin-left: -30px;
    margin-top: 79px;

    list-style: none;
    color: white;
    font-size: 17px;

    li{
      display: inline-block;
      margin-left: 10px;

      &:hover{
        text-decoration: underline;
      }
    }
  }

  a {
    position: absolute;
    text-decoration: none;
    font-size: 13px;

    &:hover{
      text-decoration: underline;
    }
  }

  .contact{
    position: absolute;
    margin-left: 670px;
    margin-top: 80px;

    display: flex;

    font-size: 13px;

    a{
      color: black;
    }
  }
}

</style>