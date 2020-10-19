<template>
  <div>

    <NewUrl
        v-on:refresh-urls="refreshUrls"
        :editUrl="editUrl"
    >
    </NewUrl>
    <UrlView
        v-for="(value, name) in urls"
        :url="value"
        :key="name"

        v-on:refresh-urls="refreshUrls"
        v-on:edit-url="editUrl"
    ></UrlView>


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

      editUrl: {
        description: null,
        expire_after: null,
        is_extended: false,
        short_url: null,
        url: null,
      },
    }
  },

  mounted() {
    this.retrieve_data();
  },

  methods: {
    retrieve_data() {
      this.$http
          .get('https://urls.mindojo.nas/api/v1')
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

    editUrl(url) {
      this.editUrl = url;
    },

  },
}

</script>

<style scoped>

</style>
