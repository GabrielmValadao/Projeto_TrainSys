<template>
  <h1>Crie sua conta</h1>
  <v-form ref="form" @submit.prevent="handleSubmit">
    <v-text-field
      label="Nome"
      type="text"
      variant="underlined"
      v-model="name"
      :error-messages="this.errors.name"
    />

    <v-text-field
      label="E-mail"
      type="email"
      variant="underlined"
      v-model="email"
      :error-messages= "this.errors.email"
    />

    <v-text-field
      label="Senha"
      type="password"
      variant="underlined"
      v-model="password"
      :error-messages= "this.errors.password"
    />

    <v-text-field
      label="Confirme sua senha"
      type="password"
      variant="underlined"
      v-model="verify_password"
      :error-messages= "this.errors.verify_password"
    />

    <v-select
      label="Selecione o seu plano"
      :items="type_plan"
      v-model="select_plan"
      variant="underlined"
      :error-messages= "this.errors.select_plan"
    />

    <v-btn type="submit">Cadastrar</v-btn>
    <router-link to="/">
      <v-btn>Voltar</v-btn>
    </router-link>
  </v-form>
</template>

<script>
import * as yup from "yup";
import axios from "axios";
import { captureErrorYup } from "../../../src/utils/captureErrorYup";

export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      verify_password: "",
      select_plan: "bronze",
      type_plan: [
        { title: "Bronze", value: "bronze" },
        { title: "Prata", value: "silver" },
        { title: "Ouro", value: "gold" },
      ],

      errors: {},
    };
  },

  methods: {
    handleSubmit() {
      try {
        const schema = yup.object().shape({
          name: yup.string().required("O nome é obrigatório!"),
          email: yup
            .string()
            .email("Email não é valido")
            .required("O email é obrigatório"),
          password: yup
            .string()
            .min(8, "A senha precisa ter no mínimo 8 caracteres")
            .max(20, "A senha deve ter entrega 8 e 20 caracteres"),
          verify_password: yup
            .string()
            .required("Informe novamente sua senha")
            .oneOf([yup.ref("password")], "As senhas devem ser iguais"),
          select_plan: yup.string().required("Selecione um dos planos"),
        });

        schema.validateSync(
          {
            name: this.name,
            email: this.email,
            password: this.password,
            verify_password: this.verify_password,
            select_plan: this.select_plan 
          },
          { abortEarly: false }
        );

        const novoUsuario = {
          name: this.name,
          email: this.email,
          password: this.password,
          type_plan: this.select_plan,
        };

        //cadastro do usuario

        axios
          .post(`http://localhost:3000/users`, novoUsuario)
          .then(() => {
            alert("Usuário cadastrado com sucesso!");
            this.$router.push("/");
          })
          .catch((error) => {
            console.log(error);
            if (error.response?.data?.message) {
              alert(error.response.data.message);
            } else {
              alert("Houve um erro ao efetuar cadastro do usuário");
            }
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

</style>
