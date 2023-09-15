<template>
  <v-app-bar height="150" app color="rgb(67, 21, 29)">
    <v-img
      src="../../../../src/public/logo trainsys.png"
      max-weight="50"
      alt="logo TrainSys"
    />
    <router-link to="/Dashboard"><h3>Home</h3> </router-link>
    <router-link to="/Gerenciamento/Aluno"><h3>Alunos</h3> </router-link>
    <router-link to="/Gerenciamento/Exercicios"><h3>Exercícios</h3> </router-link>
    <router-link to="/"><h3>Sair</h3></router-link>
  </v-app-bar>
</template>

<script>
export default {
  name: "HeaderPosLogin",
};
</script>
