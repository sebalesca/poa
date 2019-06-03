<template lang="pug">
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
</template>
<script>
export default {
  props:{
    messages:{
      type:object,
      required:true
    }
  }
}
</script>
