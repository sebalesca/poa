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
                  button.button.has-text-right(v-on:click="alta") Nuevo Usuario

      am-notification(:type="typeNotification", v-show="showNotification")
        p(slot="body") {{notification}}
      section.section(v-show="showalta")
        .container
          .columns
            .column.is-2
              input.input.is-primary(v-model="newUser.username", type="text",placeholder="Ingrese Username")
            .column.is-2
              input.input.is-primary(v-model="newUser.password",type="text",placeholder="Ingrese Password")
            .column.is-4
              input.input.is-primary(v-model="newUser.email",type="email",placeholder="Ingrese nombre de E-mail")
            .column
              .select.is-rounded.is-primary.is-medium
                select(v-model="newUser.rol",name="rol")
                  option User
                  option admin
            .column
               .card
                .card-header
                  .card-header-title
                    p seleccione avatar
                .card-content
                  .media
                    .media-left
                      figure.image.is-48x48
                        img(:src="newUser.avatar", alt='avatar')
                    .media-content
                      .select
                      select(v-model="newUser.avatar")
                        option(v-for="avatar in avatars",:value="avatar.url") {{avatar.name}}
          .columns
            .column.has-text-centered
              button.button.is-primary(v-on:click="addUser") Guardar
              button.button.is-danger(v-on:click="cleanUser") Cancelar
      .container(v-show="!mostrar")
        .columns
          .column
            section.hero.is-info
              .hero-head
                header.navbar
                  .container
                    .navbar-left
                      .navbar-item
                        strong Mensajes Nuevos
                    .navbar-right.navbar-menu
              .hero-body.is-paddingless
                section(v-for="message in messages")
                  am-messages(:message="message",@responderMensaje="respondTo")
          .column
              section.hero.is-warning
                .hero-head
                  header.navbar
                    .container
                      .navbar-left
                        .navbar-item
                          strong Contactos Online:
                      .navbar-right.navbar-menu
                section(v-for="contact in contacts")
                  am-contactos(:contact="contact",@selectContent="setContact")

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
import AmContactos from '@/components/layout/Contactos.vue'
import AmMessages from '@/components/layout/mensajes.vue'
import AmNotification from '@/components/shared/Notification.vue'
import userServices from '@/services/user'
import securityServices from '@/services/security'
import messageServices from '@/services/message'
export default {
  name: 'app',
  components: { AmFooter, AmHeader, AmContactos, AmMessages, AmNotification },
  data () {
    return {
      showNotification: false,
      notification: '',
      typeNotification: '',
      avatars: [
        {
          name: 'Avatar1',
          url: 'src/assets/admin.png'

        },
        {
          name: 'Avatar2',
          url: 'src/assets/avatarM.png'

        },
        {
          name: 'Avatar3',
          url: 'src/assets/avatarF.png'

        }],
      newUser: {
        username: '',
        email: '',
        rol: '',
        password: '',
        avatar: 'src/assets/avatarM.png'
      },
      showalta: false,
      searchQuery: '',
      contacts: [],
      token: '',
      username: '',
      password: '',
      sendTo: [],
      messages: [],
      mostrar: true,
      errorMessage: ''
    }
  },
  created () {
    /*  */
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
    showNotification () {
      if (this.showNotification) {
        setTimeout(() => {
          this.showNotification = false
        }, 3000)
      }
    }
  },
  methods: {
    updateNotification (message, type) {
      this.notification = message
      this.typeNotification = type
      this.showNotification = true
    },
    addUser () {
      /* let regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
      if(regex.test(this.newUser.email)){
        console.log('email correcto')
      }else{
        console.log('mail incorrecto')
      } */
      // logica de nuevo user
      userServices.add(this.newUser.username, this.newUser.password, this.newUser.rol, this.newUser.avatar, this.newUser.email, this.token)
        .then(res => {
          console.log(res)
          if (res.status === 'Error' || res.status === 'error') {
            this.updateNotification(res.message, 'is-danger')
          } else {
            this.updateNotification(res.messages, 'is-info')
          }
        }).catch(function (err) {
          console.log(err.error)
          console.log('error')
        })
    },
    cleanUser () {
      // logica de user
      this.newUser.username = ''
      this.newUser.password = ''
      this.newUser.email = ''
      this.newUser.rol = ''
      this.showalta = false

      console.log('cancelar alta')
    },
    alta () {
      this.showalta = true
      console.log('alta')
    },
    cargaContactos () {
      userServices.ContactConected(this.token)
        .then(res => {
          console.log(res)
          if (res.status === 'Error' || res.status === 'error') {
            this.updateNotification(res.message, 'is-danger')
          } else {
            this.updateNotification(res.messages, 'is-info')
          }
        }).catch(function (err) {
          console.log(err.error)
          console.log('error')
        })
    },
    caragaMensajes () {

    },
    respondTo (username) {
      this.sendTo.splice(0)
      this.sendTo.push(username)
      console.log(this.sendTo[0])
    },
    setContact (username) {
      let exist = this.sendTo.includes(username)
      if (!exist) {
        this.sendTo.push(username)
      } else {
        this.sendTo.splice(this.sendTo.indexOf(username), 1)
      }
      console.log(this.sendTo)
    },
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
          this.showalta = false
          this.messages.splice(0)
          this.contacts.splice(0)
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
            // cargo los contactos en linea
            userServices.ContactConected(res.token)
              .then(res => {
                console.log(res)
                if (res.status === 'Error' || res.status === 'error') {
                  this.updateNotification(res.message, 'is-danger')
                } else {
                  res.forEach(element => {
                    this.contacts.push(element)
                  })
                  this.updateNotification(res.messages, 'is-info')
                  messageServices.trae(res.token)
                    .then(res => {
                      console.log(res)
                      if (res.status === 'Error' || res.status === 'error') {
                        this.updateNotification(res.message, 'is-danger')
                      } else {
                        res.forEach(element => {
                          this.messages.push(element)
                        })
                        this.updateNotification(res.messages, 'is-info')
                        messageServices.traer(res.token)
                          .then(res => {
                            console.log(res)
                            if (res.status === 'Error' || res.status === 'error') {
                              this.updateNotification(res.message, 'is-danger')
                            } else {
                              res.forEach(element => {
                                this.messages.push(element)
                              })
                              this.updateNotification(res.messages, 'is-info')
                            }
                          }).catch(function (err) {
                            console.log(err.error)
                            console.log('error')
                          })
                      }
                    }).catch(function (err) {
                      console.log(err.error)
                      console.log('error')
                    })
                }
              }).catch(function (err) {
                console.log(err.error)
                console.log('error')
              })// cargo los mensajes y luego los voy a filtrar por leido
          } else {
            if (res.status === 'Error' || res.status === 'error') {
              this.updateNotification(res.message, 'is-danger')
            } else {
              this.updateNotification(res.messages, 'is-info')
            }
          }
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    enviar () {
      // hay que validar los envios y antes de enviar
    }
  }
}
</script>

<style lang="scss">
@import './scss/main.scss';
</style>
