<template lang="pug">
  section.hero.is-warning
                .hero-head
                  header.navbar
                    .container
                      .navbar-left
                        .navbar-item
                          strong Contactos:
                      .navbar-right.navbar-menu
                template(v-for="contact in contacts")
                  .hero-body.is-paddingless
                    .container.has-text-centered
                      .card
                        .card-header
                          .card-header-title
                            p {{contact.username}}
                        .card-content.has-text-left
                          input#conected(type='checkbox', v-model="contact.conected",readonly="true")
                          |  Conectado
</template>

<script>
export default {
  props: {
    user:{ type: Object, required: true }
  }
}
</script>

<style lang="css">
</style>
