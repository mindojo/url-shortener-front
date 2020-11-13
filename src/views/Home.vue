<template>
  <div>
    <NewUrl
        :url="editedUrl"
        v-on:refresh-urls="refreshUrls"
        :key="refreshEditedUrl"
    ></NewUrl>

    <table>
      <tr>
        <th
            v-for="field in url_fields"
            :key="field.key"
        >
          {{ field.name }}
        </th>
      </tr>

      <UrlView
          v-for="(value, name) in urls"
          :url="value"
          :key="name"

          v-on:refresh-urls="refreshUrls"
          v-on:edit-url="setEditUrl"
      ></UrlView>
    </table>

  </div>
</template>

<script>

import UrlView from "@/components/UrlView";
import NewUrl from "@/components/NewUrl";

export default {
  name: "Home",

  components: {
    UrlView,
    NewUrl,
  },

  data: function () {
    return {
      urls: null,

      editedUrl:
      {
          description: null,
          expire_after: null,
          is_extended: false,
          short_url: null,
          url: null,
        },

      refreshEditedUrl: 0,

      url_fields: [
        {
          key: 'is_extended',
          name: 'extended',
        }, {
          key: 'short_url',
          name: 'Short url',
        }, {
          key: 'url',
          name: 'URL',
        }, {
          key: 'description',
          name: 'Description',
        }, {
          key: 'expire_after',
          name: 'Expire after',
        },
      ],

    }
  },

  mounted() {
    this.retrieve_data();
  },

  methods: {
    retrieve_data() {
      const apiUrl = process.env.VUE_APP_API_BASE_URL;
      this.$http
          .get(`${apiUrl}`)
          .then(response => (this.urls = response.data.urls))
          .catch(error => console.log(error))
    },

    refreshUrls(urls) {
      if (urls) {
        this.urls = urls;
      } else {
        this.retrieve_data();
      }
    },

    setEditUrl(url) {
      this.editedUrl = url;
      this.refreshEditedUrl += 1;
    },

  },
}

</script>

<style scoped>
tbody {
  display: table-row-group;
  vertical-align: middle;
  border-color: inherit;
}

th {
  /*margin: 10px 0px 0px;*/
  font-size: 12pt;
  width: 20%;
  /*text-align: left;*/
}

</style>
