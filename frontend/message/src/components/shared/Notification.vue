<template lang="pug">
  .container
    .columns
      .column.is-4.is-offset-5
        .notification(:class= "type")
          slot(name="body") Algo salio mal!
</template>

<script>
export default {
  name: 'notificacion',
  props: {
    type: {
      type: String,
      default: 'is-danger'
    }
  }
}
</script>

<stylelang="scss"scoped>
  .container {
    margin: 10px0;
  }
</style>
