<template lang="pug">
  .hero-body.is-paddingless
    .container.has-text-centered
      .card
        .card-header
          .card-header-title
        .card-content
          .media
            .media-left
              figure.image.is-48x48
                img(:src="contact.avatar", alt='Placeholder image')
            .media-content
              p.title.is-4 {{contact.username}}
              p.subtitle.is-6 {{contact.connected}}
              input(type='checkbox',:value="contact.username",@click="contactSelect")
              | Agregar a la lista
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
