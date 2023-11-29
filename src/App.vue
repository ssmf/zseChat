<script setup>

</script>

<template>
  <div class="enterMainContainer">
    <h1 class="mainHeading">Zse Chat <br> pisz z uczniami zse!</h1>
    <div class="joinContainer">
      <button class="primaryButton joinAnonymouslyButton">Dolacz anonimowo</button>
      <div class="joinNickedContainer">
        <input type="text" placeholder="username" class="nickInput">
        <button class="primaryButton joinNickedButton">✔</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.enterMainContainer {
  width: 100%;
  height: 100%;
  background-image: url('assets/mainBackground.jpg');
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
}

.mainHeading {
  font-size: 50px;
  font-weight: 600;
  text-align: center;
  margin: 0px 0px 5px 0px;
}

.primaryButton {
  padding: 15px 30px;
  border-radius: 20px;
  background-color: rgba(0, 0, 0, 0);
  border: 1px solid white;
  font-size: 18px;
  font-weight: 500;
  color: white;
  transition: .1s all;
}
.joinAnonymouslyButton:hover {
  background-color: var(--primaryColor);
  border: 1px solid var(--primaryColor);
  color: white;
  cursor: pointer;
  box-shadow: 0px 0px 10px 0px var(--primaryColor);
}

.joinNickedButton {
  padding: 10px 20px;
  transition: .1s all;
  border-radius: 100%;
  background-color: rgba(255, 255, 255, 0);
  border: 1px solid var(--green);
}

.joinNickedButton:hover {
  background-color: var(--green);
  cursor: pointer;
  box-shadow: 0px 0px 10px 0px var(--green);
}

.joinContainer {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 20px;
}

.joinNickedContainer {
  display: flex;
  gap: 10px
}

.nickInput {
  font-weight: 300;
  outline: none;
  border: 1px solid white;
  background-color: rgba(0, 0, 0, 0);
  border-radius: 15px;
  padding: 15px 10px 15px 5px;
  transition: .1s all;
  font-size: 18px;
}

.nickInput:active, .nickInput:focus {
  border: 1px solid white;
  box-shadow: 0px 0px 10px -3px white;
}
</style>