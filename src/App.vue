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
  background-color: var(--primaryColor);
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
  margin-bottom: 5px;
}

.primaryButton {
  padding: 15px 30px;
  border-radius: 20px;
  background-color: var(--primaryColor);
  border: 1px solid black;
  font-size: 18px;
  font-weight: 500;
  color: black;
  transition: .1s all;
}
.joinAnonymouslyButton:hover {
  background-color: black;
  border: 1px solid white;
  color: white;
  cursor: pointer;
}

.joinNickedButton {
  padding: 10px 16px;
  transition: .1s all;
  border-radius: 100%;
}

.joinNickedButton:hover {
  background-color: var(--green);
  cursor: pointer;
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
  border: 1px solid black;
  background-color: var(--primaryColor);
  border-radius: 15px;
  padding: 10px 10px 10px 5px;
  transition: .1s all;
  font-size: 18px;
}

.nickInput:active, .nickInput:focus {
  outline: dashed var(--green);
}
</style>