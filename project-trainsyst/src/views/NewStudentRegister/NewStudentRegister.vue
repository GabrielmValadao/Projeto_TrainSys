<template>
  <h1>Cadastro de novos alunos</h1>
  <v-form>
    <v-text-field type="text" label="Nome completo" required />
    <v-text-field type="email" label="Email" />
    <v-text-field type="text" label="Contato" required />

    <VueDatePicker
      label="Data de Nascimento"
      v-model="dateBirth"
      :max-date="new Date()"
      locale="pt-BR"
      cancelText="Cancelar"
      selectText="Selecionar"
      :enable-time-picker="false"
    />

    <v-text-field type="text" label="CEP" required />
    <v-text-field type="text" label="Logradouro" required />
    <v-text-field type="number" label="Número" required />
    <v-text-field type="text" label="Bairro" required />
    <v-text-field type="text" label="Cidade" required />
    <v-text-field type="text" label="Estado" required />
    <v-text-field type="text" label="Complemento" required />
  </v-form>
</template>

<script>
export default {
  data() {
    return {
      dateBirth: new Date()
    }
  }
}
</script>
