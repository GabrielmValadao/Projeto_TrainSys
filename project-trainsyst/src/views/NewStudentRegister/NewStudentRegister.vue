<template>
  <h1>Cadastro de novos alunos</h1>
  <v-form ref="form" @submit.prevent="handleSubmit">
    <v-text-field type="text" label="Nome completo" v-model="name" :errors-messages="this.errors.name" />
    <v-text-field type="email" label="Email" v-model="email" :errors-messages="this.errors.email"/>
    <v-text-field type="text" label="Contato" v-model="contact"  :errors-messages="this.errors.contact"/>

    <VueDatePicker
      placeholder="Data de nascimento"
      v-model="date_birth"
      :max-date="new Date()"
      locale="pt-BR"
      cancelText="Cancelar"
      selectText="Selecionar"
      :enable-time-picker="false"
    />

    <v-text-field type="text" label="CEP" v-model="cep" :errors-messages="this.errors.cep" />
    <v-text-field type="text" label="Logradouro" v-model="street" :errors-messages="this.errors.street" />
    <v-text-field type="number" label="Número" v-model="number" :errors-messages="this.errors.number" />
    <v-text-field type="text" label="Bairro" v-model="neighborhood" :errors-messages="this.errors.neighborhood" />
    <v-text-field type="text" label="Cidade" v-model="city" :errors-messages="this.errors.city" />
    <v-text-field type="text" label="Estado" v-model="province" :errors-messages="this.errors.province" />
    <v-text-field
      type="text"
      label="Complemento"
      v-model="complement"
      required
    />
    <v-btn type="submit">Cadastrar Aluno</v-btn>
  </v-form>
</template>

<script>
import * as yup from "yup";
import { captureErrorYup } from "../../../src/utils/captureErrorYup";

export default {
  data() {
    return {
      name: "",
      email: "",
      contact: "",
      date_birth: "",
      cep: "",
      street: "",
      number: "",
      neighborhood: "",
      city: "",
      province: "",
      complement: "",

      errors: {},
    };
  },

  methdos: {
    handleSubmit() {
      try {
        const schema = yup.object().shape({
          name: yup.string().required("O nome é obrigatório!"),
          email: yup.string().email("Email não é valido"),
          contact: yup.string().required("O contato é obrigatório"),
          cep: yup.string().min(8).max(9).required("O cep é obrigatório"),
          street: yup.string().required("O logradouro é obrigatório"),
          number: yup.number().required("O número é obrigatório"),
          neighborhood: yup.string().required("O bairro é obrigatório"),
          city: yup.string().required("A cidade é obrigatória"),
          province: yup.string().required("O estado é obrigatório"),
        });

        schema.validateSync(
          {
            name: this.name,
            email: this.email,
            contact: this.contact,
            cep: this.cep,
            street: this.street,
            number: this.number,
            neighborhood: this.neighborhood,
            city: this.city,
            province: this.province,
          },
          { abortEarly: false }
        );

        const novoAluno = {
          name: this.name,
          email: this.email,
          contact: this.contact,
          date_birth: this.date_birth,
          cep: this.cep,
          street: this.street,
          number: this.number,
          neighborhood: this.neighborhood,
          city: this.city,
          province: this.province,
          complement: this.complement,
        };

      } catch (error) {
        if (error instanceof yup.ValidationError) {
          console.log(error);
          this.errors = captureErrorYup(error);
        }
      }
    },
  },
};
</script>
