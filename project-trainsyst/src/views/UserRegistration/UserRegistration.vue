<template>
  <v-app>
    <Header class="pa-1"></Header>
  </v-app>
  <div class="d-flex justify-center align-center min-vh-150">
    <v-form ref="form" @submit.prevent="handleSubmit" class="ma-3 pa-3">
      <h2>Crie sua conta</h2>
      <br />
      <v-text-field
        style="width: 300px"
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
        :error-messages="this.errors.email"
      />

      <v-text-field
        label="Senha"
        type="password"
        variant="underlined"
        v-model="password"
        :error-messages="this.errors.password"
      />

      <v-text-field
        label="Confirme sua senha"
        type="password"
        variant="underlined"
        v-model="verify_password"
        :error-messages="this.errors.verify_password"
      />

      <v-select
        label="Selecione o seu plano"
        :items="type_plan"
        v-model="select_plan"
        variant="underlined"
        :error-messages="this.errors.select_plan"
      />

      <br />

      <div class="d-flex justify-start align-start">
        <v-btn type="submit" class="mr-4" color="#DBD5B5">Cadastrar</v-btn>
        <router-link to="/">
          <v-btn color="#DBD5B5">Voltar</v-btn>
        </router-link>
      </div>
    </v-form>
  </div>
</template>

<script>
import Header from "../../assets/components/headerLoginCadastro/headerLoginCadastro.vue";
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

  components: {
    Header,
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
            select_plan: this.select_plan,
          },
          { abortEarly: false }
        );

        const novoUsuario = {
          name: this.name,
          email: this.email,
          password: this.password,
          type_plan: this.select_plan,
        };

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

<style scoped></style>
