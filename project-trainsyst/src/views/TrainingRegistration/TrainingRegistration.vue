<template>
        <h1>Cadastro de Treino</h1>
        <v-container>
    <v-form @submit.prevent="cadastrarTreino">
      <v-select
        label="Exercício"
        v-model="selectedExercise"
        :items="exercises"
        item-text="name"
        item-value="id"
        required
      ></v-select>
      <v-text-field
        label="Quantidade de Repetições"
        v-model="repetitions"
        type="number"
        min="1"
        required
      ></v-text-field>
      <v-text-field
        label="Peso (em kg)"
        v-model="weight"
        type="number"
        required
      ></v-text-field>
      <v-text-field
        label="Tempo de Pausa"
        v-model="breakTime"
        type="time"
        required
      ></v-text-field>
      <v-text-field
        label="Observações do Treino"
        v-model="observations"
      ></v-text-field>
      <v-select
        label="Dia da Semana"
        v-model="selectedDay"
        :items="daysOfWeek"
        required
      ></v-select>
      <v-btn type="submit" color="primary">Cadastrar Treino</v-btn>
    </v-form>
  </v-container>
</template>