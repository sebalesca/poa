<template lang="pug">
  section.section
        nav.navbar.has-shadow
          .container
            input.input.is-large(
              type="text",
              placeholder="Ingrese Usuario",
              v-model="user"
              )
            input.input.is-large(
              type="text",
              placeholder="Ingrese Contraseña",
              v-model="password"
              )
            a.button.is-info.is-large(v-on:click="guardarToken") Buscar
            a.button.is-danger.is-large &times; cancelar
            p
              small {{searchMessage}}
            p
              small
        .container
          .columns
            .column(v-for="t in tracks") {{t.name}}-{{t.artist}}
</template>">

