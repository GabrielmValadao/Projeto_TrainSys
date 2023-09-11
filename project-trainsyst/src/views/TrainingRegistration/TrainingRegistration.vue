<template>
  <h1>Cadastro de Treino</h1>
  <v-container>
    <v-form ref="form" @submit.prevent="handleSubmit">
      <v-select
        label="Exercício"
        v-model="selectedExercise"
        :items="exercises"
        item-text="name"
        item-value="id"
        required
      />
      <v-text-field
        label="Quantidade de Repetições"
        v-model="repetitions"
        type="number"
        min="1"
        required
      />
      <v-text-field
        label="Peso (em kg)"
        v-model="weight"
        type="number"
        required
      />
      <v-text-field
        label="Tempo de Pausa"
        v-model="breakTime"
        type="text"
        required
      />
      <v-text-field label="Observações do Treino" v-model="observations" />
      <v-select
        label="Dia da Semana"
        v-model="selectedDay"
        :items="daysOfWeek"
        required
      />
      <v-btn type="submit">Cadastrar Treino</v-btn>
    </v-form>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      exercises: [], // Para armazenar os exercícios obtidos da API
      selectedExercise: null, 
      repetitions: 1, 
      weight: null,
      breakTime: null,
      observations: "",
      daysOfWeek: [
        { title: "Segunda-feira", value: "segunda" },
        { title: "Terça-feira", value: "terca" },
        { title: "Quarta-feira", value: "quarta" },
        { title: "Quinta-feira", value: "quinta" },
        { title: "Sexta-feira", value: "sexta" },
        { title: "Sábado", value: "sabado" },
        { title: "Domingo", value: "domingo" },
      ],
      selectedDay: new Date().toLocaleDateString("pt-BR", { weekday: "long" }), // Dia atual como valor padrão
    };
  },
};
</script>
