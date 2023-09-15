<template>
  <v-app-bar height="150" app color="rgb(67, 21, 29)">
    <v-img
      src="../../../../src/public/logo trainsys.png"
      alt="logo TrainSys"
    />
    <v-toolbar-title>
      <router-link to="/Dashboard">Home</router-link>
      <router-link to="/Gerenciamento/Aluno">Alunos</router-link>
      <router-link to="/Gerenciamento/Exercicios">Exercícios</router-link>
      <router-link to="/">Sair</router-link>
    </v-toolbar-title>
  </v-app-bar>
</template>

<script>
export default {
  name: "HeaderPosLogin",
};
</script>
