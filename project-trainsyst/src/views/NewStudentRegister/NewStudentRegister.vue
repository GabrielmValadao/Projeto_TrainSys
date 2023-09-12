<template>
  <h1>Cadastro de novos alunos</h1>
  <v-form ref="form" @submit.prevent="handleSubmit">
    <v-text-field
      type="text"
      label="Nome completo"
      v-model="name"
      :error-messages="this.errors.name"
    />
    <v-text-field
      type="email"
      label="Email"
      v-model="email"
      :error-messages="this.errors.email"
    />
    <v-text-field
      type="text"
      label="Contato"
      v-model="contact"
      :error-messages="this.errors.contact"
    />

    <VueDatePicker
      placeholder="Data de nascimento"
      v-model="date_birth"
      :max-date="new Date()"
      locale="pt-BR"
      cancelText="Cancelar"
      selectText="Selecionar"
      :enable-time-picker="false"
    />

    <v-text-field
      type="text"
      label="CEP"
      v-model="cep"
      :error-messages="this.errors.cep"
      @blur="consultarCep"
    />
    <v-text-field
      type="text"
      label="Logradouro"
      v-model="street"
      :error-messages="this.errors.street"
    />
    <v-text-field
      type="number"
      label="Número"
      v-model="number"
      :error-messages="this.errors.number"
    />
    <v-text-field
      type="text"
      label="Bairro"
      v-model="neighborhood"
      :error-messages="this.errors.neighborhood"
    />
    <v-text-field
      type="text"
      label="Cidade"
      v-model="city"
      :error-messages="this.errors.city"
    />
    <v-text-field
      type="text"
      label="Estado"
      v-model="province"
      :error-messages="this.errors.province"
    />
    <v-text-field type="text" label="Complemento" v-model="complement" />
    <v-btn type="submit">Cadastrar Aluno</v-btn>
    <router-link to="/Gerenciamento/Aluno">
      <v-btn>Voltar</v-btn>
    </router-link>
  </v-form>
</template>

<script>
import * as yup from "yup";
import { captureErrorYup } from "../../../src/utils/captureErrorYup";
import axios from "axios";

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

  methods: {
    consultarCep() {
      // Nova variável "cep" somente com dígitos.
      var cep = this.cep.replace(/\D/g, "");

      // Verifica se campo CEP possui valor informado.
      if (cep !== "") {
        var validacep = /^[0-9]{8}$/;

        if (validacep.test(cep)) {
          // Faz a consulta na API do ViaCEP.
          fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then((response) => response.json())
            .then((data) => {
              if (!data.erro) {
                this.street = data.logradouro;
                this.neighborhood = data.bairro;
                this.city = data.localidade;
                this.province = data.uf;
              } else {
                alert("Cep não encontrado");
              }
            })
            .catch((error) => {
              console.error(error);
              alert("Erro ao consultar o cep");
            });
        } else {
          alert("Formato de cep inválido");
        }
      }
    },

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

        //cadastro de novo aluno

        axios({
          url: "http://localhost:3000/students",
          method: "POST",
          data: {
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
          },
        })
          .then(() => {
            alert("Aluno cadastrado com sucesso!");
            //reseta o formulario
            this.$refs.form.reset();
          })
          .catch(() => {
            alert("Erro ao cadastrar novo aluno!");
          });
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
