<template>
  <div>
    <p>
      <label for="is-extended">extended:</label>
      <input id="is-extended" type="checkbox" name="is_extended" placeholder="is_extended"
             v-model="updatedUrl.is_extended">

      <label for="input-short-url">Short url:</label>
      <input id="input-short-url" type="text" name="short_url" placeholder="short_url" v-model="updatedUrl.short_url">

      <label for="input-short-url"> Generate short url: </label>
      <button id="generate-short-url" @click="generateShortUrl"> Generate</button>

      <label for="input-url">URL:</label>
      <input id="input-url" type="text" name="url" placeholder="url" v-model="updatedUrl.url">

      <label for="description">Description:</label>
      <input id="description" type="text" name="description" placeholder="description" v-model="updatedUrl.description">

      <label for="expire-after">expire after:</label>
      <input id="expire-after" type="date" name="expire_after" placeholder="expire_after"
             v-model="updatedUrl.expire_after">

      <button v-if="this.url.url === null" @click="addNewUrl"> Add</button>
      <button v-else @click="editNewUrl"> Edit</button>

    </p>

  </div>
</template>

<script>


export default {
  name: 'NewUrl',

  props: {
    url: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      updatedUrl: {...this.url},
    }
  },
  methods: {
    addNewUrl: function () {
      if (!this.updatedUrl.url || !this.updatedUrl.short_url) {
        alert('url and short_url can not be empty');
        return;
      }

      const apiUrl = process.env.VUE_APP_API_BASE_URL;
      this.$http
          .post(`${apiUrl}`, {
            'url': {
              'description': this.updatedUrl.description,
              'expire_after': this.updatedUrl.expire_after,
              'is_extended': this.updatedUrl.is_extended,
              'short_url': this.updatedUrl.short_url,
              'url': this.updatedUrl.url,
            }
          })
          .then(response => {
            this.$emit('refresh-urls', response.data.urls);
            this.url = null;
            this.updatedUrl = {
              'description': null,
              'expire_after': null,
              'is_extended': false,
              'short_url': null,
              'url': null
            }
          });
    },

    editNewUrl: function () {
      if (!this.updatedUrl.url || !this.updatedUrl.short_url) {
        alert('url and short_url can not be empty');
        return;
      }

      const apiUrl = process.env.VUE_APP_API_BASE_URL;
      this.$http
          .put(`${apiUrl}`, {
            'url': {
              'description': this.updatedUrl.description,
              'expire_after': this.updatedUrl.expire_after,
              'is_extended': this.updatedUrl.is_extended,
              'short_url': this.updatedUrl.short_url,
              'url': this.updatedUrl.url,
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
            this.updatedUrl ={...this.url}
          });
    },

    generateShortUrl: function () {
      console.log(`generateShortUrl: ${this.updatedUrl.short_url}`)
      this.updatedUrl.short_url = Math.random().toString(36).substring(2, 6);
    },
  }

}
</script>

<style scoped>

</style>
