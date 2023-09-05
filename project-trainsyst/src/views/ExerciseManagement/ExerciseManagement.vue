<template>
  <h1>Exercícios</h1>
  <v-text-field
    v-model="newExercise"
    label="Nome do exercício"
    variant="underlined"
    required 
  />
  <v-btn>Cadastrar exercício</v-btn>

  <v-list>
    <v-list-item>
        
    </v-list-item>

  </v-list>
 

<script>
export default {
  data() {
    return {
        newExercise: [],
    };
  },
};
</script>
