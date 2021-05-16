<template>
  <v-app id="inspire">
    <v-app-bar app color="secondary" dark>
      <v-container class="py-0 fill-height">
        <v-btn href="/" text>
          <span class="mr-2">IdeaHub</span>
        </v-btn>
      </v-container>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        dense
        dark
        flat
        hide-details
        style="max-width: 260px"
        rounded
        solo-inverted
        append-icon="mdi-magnify"
      />
    </v-app-bar>

    <v-main>
      <v-container>
        <v-row>
          <div class="col-sm-12 col-md-3 col-lg-2">
            <v-list color="transparent" dense subheader>
              <v-subheader> Top Tags </v-subheader>
              <v-list-item
                v-for="tag in topTags"
                :key="tag.name"
                :to="tag.link"
                link
              >
                <v-list-item-content>
                  <v-list-item-title>#{{ tag.name }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-divider></v-divider>

              <v-subheader> Links </v-subheader>
              <v-list-item
                link
                v-for="link in links"
                :key="link"
                :to="'/' + link"
              >
                <v-list-item-content>
                  <v-list-item-title>{{ link }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </div>

          <div class="col-sm-12 col-md col-lg">
            <v-container fluid>
              <v-row dense>
                <div
                  v-for="item in list"
                  :key="isIdeas ? item.title : item.name"
                  class="d-flex flex-column col-sm-12 col-md-6 col-lg-6"
                >
                  <v-card class="flex d-flex flex-column col">
                    <v-card-title
                      v-text="isIdeas ? item.title : item.display"
                    ></v-card-title>
                    <v-card-text
                      class="flex"
                      v-text="item.description"
                    ></v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        icon
                        v-if="isIdeas"
                        :disabled="item.exampleCount < 1"
                        :to="`/Projects/${item.tags[0]}`"
                      >
                        <v-badge
                          overlap
                          :content="item.exampleCount"
                          :value="item.exampleCount"
                        >
                          <v-icon>mdi-code-tags</v-icon>
                        </v-badge>
                      </v-btn>
                      <v-btn
                        icon
                        v-if="!isIdeas"
                        :href="item.repo"
                        target="__blank"
                      >
                        <v-icon>mdi-github</v-icon>
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </div>
              </v-row>
            </v-container>
          </div>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import ideaList from './../../data/ideas.json';
import projectList from './../../data/projects.json';
export default {
  name: 'Home',
  data: () => {
    return { kind: '', search: '' };
  },
  mounted: function () {
    this.kind = this.$route.params.kind ? this.$route.params.kind : 'ideas';
    this.search = this.$route.params.search ? this.$route.params.search : '';
  },
  computed: {
    list() {
      const current = this.isIdeas ? this.ideas : this.projects;
      return current.filter((item) =>
        item.tags.some(
          (tag) =>
            this.search === '' ||
            tag
              .replace(/ /, '-')
              .toLowerCase()
              .indexOf(this.search.toLowerCase().replace(/ /, '-')) >= 0
        )
      );
    },
    ideas() {
      return ideaList
        .map((i) => {
          return {
            ...i,
            tags: i.tags.split(',').map((t) => t.trim()),
          };
        })
        .map((i) => {
          return {
            ...i,
            exampleCount: this.getTagCount(i.tags),
          };
        })
        .sort((a, b) =>
          a.title.toUpperCase() > b.title.toUpperCase() ? 1 : -1
        );
    },
    projects() {
      return projectList
        .map((i) => {
          return {
            ...i,
            tags: i.tags.split(',').map((t) => t.trim()),
            repo: `https://github.com/${i.author}/${i.name}`,
          };
        })
        .sort((a, b) => (a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1));
    },
    topTags() {
      const allTags = this.isIdeas
        ? this.ideas.flatMap((i) => i.tags)
        : this.projects.flatMap((i) => i.tags);
      const tagCount = [];
      allTags.forEach((i) => {
        const found = tagCount.find((t) => t.name == i);
        if (tagCount.find((t) => t.name == i)) {
          found.count = found.count + 1;
        } else {
          tagCount.push({
            name: i,
            count: 1,
            link: `/${this.kind}/${i}`,
          });
        }
      });
      tagCount.sort((a, b) => b.count - a.count);
      if (tagCount.length > 5) {
        tagCount.length = 5;
      }
      return tagCount;
    },
    links() {
      return this.isIdeas ? ['Projects'] : ['Ideas'];
    },
    isIdeas() {
      return this.kind.toLowerCase() == 'ideas';
    },
  },
  watch: {
    '$route.params.kind': function (val) {
      if (val) {
        this.kind = val;
      }
    },
    '$route.params.search': function (val) {
      this.search = val ? val : '';
    },
  },
  methods: {
    searchProjectsBy(tag) {
      return this.projects.filter((p) => p.tags.includes(tag));
    },
    getTagCount(tags) {
      return this.searchProjectsBy(tags[0]).length;
    },
  },
};
</script>
<style>
.v-input__slot {
  padding-right: 10px !important;
}
</style>
