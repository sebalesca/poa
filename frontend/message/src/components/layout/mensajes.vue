<template lang="pug">
  .card
    .card-header
      .card-header-title
        .columns
          .column
            p.is-info REMITENTE: {{message.Remitente}}
          .column
            button.button.is-focus(@click="responder") Responder
    .card-content
      p {{message.mensaje}}
      .container(v-show="false")
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
    .card-footer
      .card-footer-item.is-paddingless
        p.has-text-left Recibido: {{message.Enviado}}
</template>
<script>
export default {
  props: {
    message: {
      type: Object,
      required: true
    }
  },
  methods: {
    responder () {
      this.$emit('responderMensaje', this.message.Remitente)
    }
  }
}
</script>
