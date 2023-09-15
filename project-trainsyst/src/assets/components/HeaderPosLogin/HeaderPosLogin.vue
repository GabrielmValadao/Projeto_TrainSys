<template>
  <v-container>
    <v-app-bar height="150" app color="rgb(67, 21, 29)">
      <v-img
        src="../../../../src/public/logo trainsys.png"
        alt="logo TrainSys"
        max-height="150"
        width="100"
        fill-height
        tile
      />

      <div class="d-flex aling-end justify-between">
        <v-toolbar-title>
          <router-link to="/Dashboard"
            >
            <v-btn variant="plain" color="rgb(223, 70, 97)"
              ><v-icon icon="mdi-home" size="large"></v-icon>Home</v-btn
            ></router-link
          >

          <router-link to="/Gerenciamento/Aluno"
            ><v-btn variant="plain" color="rgb(223, 70, 97)"
              ><v-icon icon="mdi-weight-lifter" size="large"></v-icon>Alunos</v-btn
            ></router-link
          >

          <router-link to="/Gerenciamento/Exercicios"
            ><v-btn variant="plain" color="rgb(223, 70, 97)"
              ><v-icon icon="mdi-dumbbell" size="large"></v-icon>Exercícios</v-btn
            ></router-link
          >

          <router-link to="/"
            ><v-btn variant="plain" color="rgb(223, 70, 97)"
              ><v-icon icon="mdi-exit-run" size="large"></v-icon>Sair</v-btn
            ></router-link
          >
        </v-toolbar-title>
      </div>
    </v-app-bar>
  </v-container>
</template>

<script>
export default {
  name: "HeaderPosLogin",
};
</script>
