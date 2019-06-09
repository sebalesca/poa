<template lang="pug">
  .hero-body.is-paddingless
    .container.has-text-centered
      .card
        .card-header
          .card-header-title
            p {{contact.username}} {{contact.conected}}
        .card-content.has-text-left
          input#conected(type='checkbox',:value="contact.username",@click="contactSelect")
          |  Agregar a la lista
</template>

<script>
export default {
  props: {
    contact: { type: Object,
      required: true
    }
  },
  methods: {
    contactSelect () {
      // en emit le comunica al padre lo que fue seleccionado
      this.$emit('selectContent', this.contact.username)
    }
  }
}
</script>

<style lang="css">
</style>
