<template>
  <v-app>
    <Header></Header>
  </v-app>
  <h2 class="d-flex justify-center align-center ma-4">
    <v-icon
      icon="mdi-weight-lifter"
      color="rgb(223, 70, 97)"
      size="large"
    ></v-icon
    >Cadastro de novo aluno
  </h2>

  <div class="container">
    <div class="d-flex justify-center align-center pa-5">
      <v-form ref="form" @submit.prevent="handleSubmit">
        <div class="d-flex">
          <v-text-field
            class="mr-5"
            variant="underlined"
            style="width: 300px"
            type="text"
            label="Nome completo"
            v-model="name"
            :error-messages="this.errors.name"
          />
          <v-text-field
            style="width: 300px"
            variant="underlined"
            type="email"
            label="Email"
            v-model="email"
            :error-messages="this.errors.email"
          />
        </div>
        <div class="d-flex">
          <v-text-field
            class="mr-5"
            variant="underlined"
            style="width: 300px"
            type="text"
            label="Contato"
            placeholder="com (DDD)"
            v-model="contact"
            :error-messages="this.errors.contact"
          />

          <VueDatePicker
            style="width: 300px"
            variant="underlined"
            placeholder="Data de nascimento"
            v-model="date_birth"
            :max-date="new Date()"
            locale="pt-BR"
            cancelText="Cancelar"
            selectText="Selecionar"
            :enable-time-picker="false"
          />
        </div>

        <h3 class="d-flex justify-center align-center ma-1">Endereço</h3>
        <div class="d-flex">
          <v-text-field
            class="mr-5"
            style="width: 300px"
            variant="underlined"
            type="text"
            label="CEP"
            v-model="cep"
            :error-messages="this.errors.cep"
            @blur="consultarCep"
          />
          <v-text-field
            style="width: 300px"
            type="text"
            variant="underlined"
            label="Logradouro"
            v-model="street"
            :error-messages="this.errors.street"
          />
        </div>

        <div class="d-flex">
          <v-text-field
            class="mr-5"
            style="width: 300px"
            variant="underlined"
            type="number"
            label="Número"
            v-model="number"
            :error-messages="this.errors.number"
          />
          <v-text-field
            style="width: 300px"
            variant="underlined"
            type="text"
            label="Bairro"
            v-model="neighborhood"
            :error-messages="this.errors.neighborhood"
          />
        </div>
        <div class="d-flex">
          <v-text-field
            class="mr-5"
            style="width: 300px"
            variant="underlined"
            type="text"
            label="Cidade"
            v-model="city"
            :error-messages="this.errors.city"
          />
          <v-text-field
            style="width: 300px"
            variant="underlined"
            type="text"
            label="Estado"
            v-model="province"
            :error-messages="this.errors.province"
          />
        </div>
        <v-text-field
          variant="underlined"
          type="text"
          label="Complemento"
          v-model="complement"
        />
        <v-btn variant="elevated"  class="mr-5" color="#DBD5B5" type="submit"
          >Cadastrar Aluno</v-btn
        >
        <router-link to="/Gerenciamento/Aluno">
          <v-btn variant="elevated"  color="#DBD5B5">Voltar</v-btn>
        </router-link>
      </v-form>
    </div>
  </div>
</template>

<script>
import Header from "../../assets/components/HeaderPosLogin/HeaderPosLogin.vue";
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

  components: {
    Header,
  },

  methods: {
    consultarCep() {
      
      var cep = this.cep.replace(/\D/g, "");

      
      if (cep !== "") {
        var validacep = /^[0-9]{8}$/;

        if (validacep.test(cep)) {
          
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
          email: yup
            .string()
            .email("Email não é valido")
            .required("Email é obrigatório!"),
          contact: yup.string().required("O contato é obrigatório!"),
          cep: yup.string().min(8).max(9).required("O cep é obrigatório!"),
          street: yup.string().required("O logradouro é obrigatório!"),
          number: yup.string().required("O número é obrigatório!"),
          neighborhood: yup.string().required("O bairro é obrigatório!"),
          city: yup.string().required("A cidade é obrigatória!"),
          province: yup.string().required("O estado é obrigatório!"),
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

<style scoped>
.container {
  margin: 0 auto;
  width: 1000px;
  border: 5px solid #dbd5b5;
  border-radius: 10px;
}
</style>
