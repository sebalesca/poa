<template lang="pug">
    #app
      am-header
      section.section(v-show="mostrar")
        nav.navbar.has-shadow
          .container
            input.input.is-large(
              type="text",
              placeholder="Ingrese Usuario",
              v-model="username"
              )
            input.input.is-large(
              type="password",
              placeholder="Ingrese Contraseña",
              v-model="password"
              )
            a.button.is-info.is-large(v-on:click="login") Aceptar
            a.button.is-danger.is-large(v-on:click="cancelar") Cancelar
      .container(v-show="!mostrar")
        .columns
          .column.is-12
            nav.navbar.is-info(role='navigation', aria-label='main navigation')
              .navbar-brand
                .navbar-item.has-text-right
                  button.button(v-on:click="logout") Cerrar Sesion
      .container(v-show="!mostrar")
        .columns
          .column
            template(v-for="message in messages")
              section.hero.is-info
                .hero-head
                  header.navbar
                    .container
                      .navbar-left
                        .navbar-item
                          strong Mensajes Nuevos
                      .navbar-right.navbar-menu
                .hero-body
                  .card
                    .card-header
                      .card-header-title
                        p REMITENTE: {{message.remitente}}
                    .card-content
                      p {{message.mensaje}}
                    .card-footer
                      .card-footer-item
                        p Fecha: {{message.enviado}}
          .column
            .container
              section.hero.is-warning
                .hero-head
                  header.navbar
                    .container
                      .navbar-left
                        .navbar-item
                          strong UP messages
                      .navbar-right.navbar-menu
                .hero-body
                  .container.has-text-centered
                    .card
                      .card-header
                        .card-header-title
                          p mensaje de fulanito
                      .card-content
                        p este es el contenido
                      .card-footer
                        .card-footer-item
                          p este es un item del footer
      .container(v-show="!mostrar")
        .columns
          .column.is-12
            nav.navbar.is-info(role='navigation', aria-label='main navigation')
              .navbar-brand
                .navbar-item
                  button.button Nuevo Mensaje
                .navbar-item
                  button.button Limpiar
            textarea.textarea.is-primary
            .container.has-text-centered
              button.button Enviar
      am-footer
</template>

<script>
import AmFooter from '@/components/layout/Footer.vue'
import AmHeader from '@/components/layout/Header.vue'
import securityServices from '@/services/security'

export default {
  name: 'app',
  components: { AmFooter, AmHeader },
  data () {
    return {
      searchQuery: '',
      contact: [{
        name: 'admin',


      }],
      token: '',
      username: '',
      password: '',
      messages: [{
        remitente: 'sebalesca',
        mensaje: 'este es el mensaje',
        enviado: '30/05/2019'
      }, {
        remitente: 'carilila',
        mensaje: 'este es el mensaje',
        enviado: '30/05/2019'
      }],
      mostrar: true,
      errorMessage: ''
    }
  },
  created () {
    /* aca cargar desde la api este es evento que me permite cargar la data  */
  },
  computed: {
    searchMessage () {
      return `Mensages encontrados:  ${this.mensages.length}`
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
    guardarToken () {
      localStorage.setItem('token', JSON.stringify(this.token))
    },
    obtenerToken () {
      this.token = localStorage.getItem('token')
    },
    eliminarToken () {
      this.token = ''
    },
    cancelar () {
      this.password = ''
      this.username = ''
    },
    logout () {
      console.log('logout')
      securityServices.logout(this.token)
        .then(res => {
          console.log('logout exitoso')
          this.token = ''
          this.mostrar = true
          localStorage.removeItem('token')
          this.username = ''
          this.password = ''
        }).catch(function (err) {
          console.log(err)
        })
    },
    login () {
      console.log('loggin')
      if (!this.username || !this.password) {
        this.errorMessage = 'Debe ingresar password y contraseña'
        return
      }
      securityServices.login(this.username, this.password)
        .then(res => {
          console.log(res.token)
          if (res.token) {
            this.mostrar = false
            this.token = res.token
            this.guardarToken()
          }
        })
        .catch(function (err) {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="scss">
@import './scss/main.scss';
</style>
