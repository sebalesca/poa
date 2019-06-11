<template lang="pug">
.modal
  .modal-background
  .modal-card
    header.modal-card-head
      p.modal-card-title Modal title
      button.delete(aria-label='close')
    section.modal-card-body
      // Content ...
    footer.modal-card-foot
      button.button.is-success Save changes
      button.button Cancel
</template>

<script>
  export default {

  }
</script>

<style lang="scss" scoped>

</style>
