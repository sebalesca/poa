<template lang="pug">
    #app
      section.section
        nav.navbar.has-shadow
          .container
            input.input.is-large(
              type="text",
              placeholder="Ingrese Usuario",
              v-model="searchQuery"
              )
            input.input.is-large(
              type="text",
              placeholder="Ingrese Contraseña",
              v-model="token"
              )
            a.button.is-info.is-large(v-on:click="guardarToken") Buscar
            a.button.is-danger.is-large &times;
            a.button.is-success(v-on:click="obtenerToken")
            p
              small {{searchMessage}}
            p
              small {{token}}
        .container
          .columns
            .column(v-for="t in tracks") {{t.name}}-{{t.artist}}
</template>

<script>
import AmFooter from ('./components/layout/Footer.vue')

const tracks = [
  { name: 'muchacha corazón de tiza', artist: 'Luis Alberto Espineta' },
  { name: 'Hoy aca en el baile', artist: 'el pepo' },
  { name: 'this is love', artist: 'snake' }
]
export default {
  name: 'app',
  components : { AmFooter },
  data () {
    return {
      searchQuery: '',
      tracks: [],
      token: ''
    }
  },
  computed: {
    searchMessage () {
      return `Artistas encontrados:  ${this.tracks.length}`
    },
    edad () {
      return this.fecha
    }
  },
  watch: {
    // tiene  que tener el mismo nombre del data que escucha
    fecha (nuevo, viejo) {
      console.log(`este es el valor nuevo ${nuevo} y este el viejo ${viejo}`)
    }
  },
  methods: {
    search () {
      this.tracks = tracks
    },
    guardarToken () {
      localStorage.setItem('token', JSON.stringify(this.token))
    },
    obtenerToken () {
      this.token = localStorage.getItem('token')
    },
    eliminarToken () {
      this.token= ''
    }
  }
}
</script>

<style lang="scss">
@import './scss/main.scss';
</style>
