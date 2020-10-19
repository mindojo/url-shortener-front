<template>
  <div>
    <p>
      <label for="is-extended">extended:</label>
      <input id="is-extended" type="checkbox" name="is_extended" placeholder="is_extended" v-model="url.is_extended">

      <label for="input-short-url">Short url:</label>
      <input id="input-short-url" type="text" name="short_url" placeholder="short_url" v-model="url.short_url">

      <label for="input-short-url"> Generate short url: </label>
      <button id="generate-short-url" @click="generateShortUrl"> Generate </button>

      <label for="input-url">URL:</label>
      <input id="input-url" type="text" name="url" placeholder="url" v-model="url.url">

      <label for="description">Description:</label>
      <input id="description" type="text" name="description" placeholder="description" v-model="url.description">

      <label for="expire-after">expire after:</label>
      <input id="expire-after" type="date" name="expire_after" placeholder="expire_after" v-model="url.expire_after">

      <button id="add" @click="addNewUrl">Add</button>

    </p>

  </div>
</template>

<script>


export default {
  name: 'NewUrl',
  props: ['editUrl'],
  data: function () {
    console.log(`data:${this.editUrl}`);
    return {
      url: this.editUrl
    }
  },
  methods: {
    addNewUrl: function () {
      if (!this.url.url || !this.url.short_url) {
        alert('url and short_url can not be empty');
        return;
      }
      this.$http
          .post('https://urls.mindojo.nas/api/v1', {
            'url': {
              'description': this.url.description,
              'expire_after': this.url.expire_after,
              'is_extended': this.url.is_extended,
              'short_url': this.url.short_url,
              'url': this.url.url,
            }
          })
          .then(response => {
            this.$emit('refresh-urls', response.data.urls);
            this.url = {
              'description': null,
              'expire_after': null,
              'is_extended': false,
              'short_url': null,
              'url': null
            }
          });
    },
    generateShortUrl: function (){
      this.url.short_url =  Math.random().toString(36).substring(2, 6);
    },
  }

}
</script>

<style scoped>

</style>
