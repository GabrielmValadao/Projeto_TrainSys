<template>
  <h1>Cadastro de novos alunos</h1>
  <v-form>
    <v-text-field type="text" label="Nome completo" required/>
    <v-text-field type="email" label="Email" />
    <v-text-field type="text" label="Contato" required/>
    <v-text-field type="date" label="Data de nascimento" required/>
    <v-text-field type="text" label="CEP" required/>
    <v-text-field type="text" label="Logradouro" required/>
    <v-text-field type="number" label="Número" required/>
    <v-text-field type="text" label="Bairro" required/>
    <v-text-field type="text" label="Cidade" required/>
    <v-text-field type="text" label="Estado" required/>
    <v-text-field type="text" label="Complemento" required/>
  </v-form>
</template>
