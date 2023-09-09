<template>
  <h1>Cadastro de novos alunos</h1>
  <v-form>
    <v-text-field type="text" label="Nome completo" v-model="name" required />
    <v-text-field type="email" label="Email" v-model="email" />
    <v-text-field type="text" label="Contato" v-model="contact" required />


      <VueDatePicker
      placeholder="Data de nascimento"
      v-model="date_birth"
      :max-date="new Date()"
      locale="pt-BR"
      cancelText="Cancelar" 
      selectText="Selecionar"
      :enable-time-picker="false"
      />

    <v-text-field type="text" label="CEP" v-model="cep" required />
    <v-text-field type="text" label="Logradouro" v-model="street" required />
    <v-text-field type="number" label="Número" v-model="number" required />
    <v-text-field type="text" label="Bairro" v-model="neighborhood" required />
    <v-text-field type="text" label="Cidade" v-model="city" required />
    <v-text-field type="text" label="Estado" v-model="province" required />
    <v-text-field type="text" label="Complemento" v-model="complement" required />
    <v-btn type="submit">Cadastrar Aluno</v-btn>
  </v-form>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      contact: '',
      date_birth: '',
      cep: '',
      street: '',
      number: '',
      neighborhood: '',
      city: '',
      province: '',
      complement: '',

      errors: {}

    }
  }
}
</script>
