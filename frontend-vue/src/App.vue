<script setup>
import { io } from "socket.io-client";
import { onBeforeMount, ref } from "vue";

const socket = io("http://localhost:3001");

const messages = ref([]);
const messageText = ref("");
const isJoined = ref(false);
const name = ref("");
const typingDisplay = ref("");

onBeforeMount(() => {
  socket.emit("findAllMessages", {}, (response) => {
    messages.value = response;
  });

  socket.on("message", (message) => {
    messages.value.push(message);
  });

  socket.on("typing", ({ name, isTyping }) => {
    if (isTyping) typingDisplay.value = `${name} is typing...`;
    else typingDisplay.value = "";
  });
});

const join = () => {
  socket.emit("join", { name: name.value }, () => {
    isJoined.value = true;
  });
};

const sendMessage = () => {
  socket.emit("createMessage", { text: messageText.value }, () => {
    messageText.value = "";
  });
};

const emitTyping = () => {
  let timeout;

  socket.emit("typing", { isTyping: true });
  timeout = setTimeout(() => {
    socket.emit("typing", { isTyping: false });
  }, 2000);
};
</script>

<template>
  <div>
    <div v-if="!isJoined">
      <form @submit.prevent="join">
        <label>What's your name?</label>
        <input v-model="name" />
        <button type="submit">Send</button>
      </form>
    </div>
    <div v-else>
      <div v-for="message in messages">
        [{{ message.name }}]: {{ message.text }}
      </div>
      <div v-if="typingDisplay">{{ typingDisplay }}</div>
      <hr />
      <div>
        <form @submit.prevent="sendMessage">
          <label>Message:</label>
          <input v-model="messageText" @input="emitTyping" />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
