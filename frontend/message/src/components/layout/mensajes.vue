<template lang="pug">
  .card
    .card-header
      .card-header-title
        .columns
          .column
            p.is-info REMITENTE: {{message.remitente}}
          .column
            button.button(@click="responder") Responder
    .card-content
      p {{message.mensaje}}
    .card-footer
      .card-footer-item.is-paddingless
        p.has-text-left Recibido: {{message.enviado}}
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
      this.$emit('responderMensaje', this.message.remitente)
    }
  }
}
</script>
