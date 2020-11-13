<template>
  <tr>
    <td class="is_extended"> {{ displayedUrl.is_extended }}</td>
    <td class="short_url long_text"> {{ url_hostname }}/{{ displayedUrl.short_url }}</td>
    <td class="url long_text"> {{ displayedUrl.url }}</td>
    <td class="description long_text"> {{ displayedUrl.description }}</td>
    <td class="expire_after"> {{ displayedUrl.expire_after }}</td>
    <td>
      <button v-on:click="editUrl"> Edit</button>
    </td>
    <td>
      <button v-on:click="deleteUrl"> Delete</button>
    </td>
  </tr>
</template>

<script>


export default {
  name: 'UrlView',

  props: {
    url: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      displayedUrl: {...this.url},
      url_hostname : window.location.origin,
    }
  },

  methods: {
    deleteUrl: function () {

      const apiUrl = process.env.VUE_APP_API_BASE_URL;
      this.$http
          .delete(`${apiUrl}?short_url=${this.displayedUrl.short_url}`)
          .then(() => {
            this.$emit('refresh-urls');
          })
          .catch(error => console.log(error));

    },

    editUrl: function () {
      this.$emit('edit-url', this.displayedUrl);
    }
  }
}
</script>

<style scoped>

td {
  /*margin: 10px 0px 0px;*/
  font-size: 8pt;
  width: 20%;
  /*text-align: left;*/
}

.long_text {
  text-align: left;
}
</style>
