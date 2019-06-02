<template lang="pug">
  .card
    .card-content
      .media
        .media-left
          figure.images
            img(:src="track.album.images[0].url")
        .media-content
          p.title.is-6
            strong {{ track.name }}
          p.subtitle.is-6 {{ track.artists[0].name }}
</template>

<script>
export default {
  props: {
    track: { type: Object, required: true },
    user:{ type: Object, required: true }
  }
}
</script>

<style lang="css">
</style>
