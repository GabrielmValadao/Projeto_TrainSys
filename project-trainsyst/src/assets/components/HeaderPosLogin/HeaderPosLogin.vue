<template>
  <v-app app color="primary">
    <v-img
      src="../../../../src/public/logo trainsys.png"
      max-weight="50"
      alt="logo TrainSys"
    />
    <router-link to="/"><h3>Home</h3> </router-link>
    <router-link to="/Dashboard"><h3>Alunos</h3> </router-link>
    <router-link to="/Gerenciamento/Exercicios"><h3>Exercícios</h3> </router-link>
    <router-link to="/Gerenciamento/Aluno"><h3>Sair</h3></router-link>
  </v-app>
</template>

<script>
export default {
  name: "HeaderPosLogin",
};
</script>
