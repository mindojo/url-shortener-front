<template>
  <tr>
    <td class="is_extended"> {{ url.is_extended }}</td>
    <td class="short_url"> {{ url.short_url }}</td>
    <td class="url"> {{ url.url }}</td>
    <td class="description"> {{ url.description }}</td>
    <td class="expire_after"> {{ url.expire_after }}</td>
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
  props: ['url'],
  methods: {
    deleteUrl: function () {
      this.$http
          .delete(`https://urls.mindojo.nas/api/v1?short_url=${this.url.short_url}`)
          .then(() => {
            this.$emit('refresh-urls');
          })
          .catch(error => console.log(error));

    },
    editUrl: function () {
      this.$emit('edit-url', this.url);
    }
  }
}
</script>

<style scoped>
tbody {
  display: table-row-group;
  vertical-align: middle;
  border-color: inherit;
}

td {
  /*margin: 10px 0px 0px;*/
  font-size: 8pt;
  width: 20%;
  text-align: left;
}
</style>
