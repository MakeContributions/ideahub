<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="clipped"
      flat
      fixed
      app
    >
      <v-list subheader flat>
        <v-subheader>Top Tags</v-subheader>
        <v-list-item
          v-for="(item, i) in topTags"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-content>
            <v-list-item-title v-text="item.name" />
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>

        <v-subheader>Links</v-subheader>
        <v-list-item
          v-for="link in links"
          :key="link"
          link
          :to="link.to"
        >
          <v-list-item-content>
            <v-list-item-title>{{ link.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon class="d-xl-none d-lg-none" @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import ideaList from '@@/data/ideas.json';
import projectList from '@@/data/projects.json';

export default {
  data () {
    return {
      clipped: true,
      drawer: true,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        }
      ],
      right: true,
      rightDrawer: false,
      title: 'Ideahub',
      kind: '',
      search: '',
    }
  },
  computed: {
    list() {
      const current = this.isIdeas ? this.ideas : this.projects;
      return current.filter((item) =>
        item.tags.some(
          (tag) =>
            this.search === '' ||
            tag && tag
              .replace(/ /, '-')
              .toLowerCase()
              .includes(this.search.toLowerCase().replace(/ /, '-'))
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
        const found = tagCount.find((t) => t.name === i);
        if (tagCount.find((t) => t.name === i)) {
          found.count = found.count + 1;
        } else {
          tagCount.push({
            name: i,
            count: 1,
            to: `?kind=${this.kind}&search=${i}`,
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
      const result = [];
      const defaultKind = this.isIdeas ? 'Projects' : 'Ideas';
      result.push({name: defaultKind, to: `?kind=${defaultKind}`});
      return result;
    },
    isIdeas() {
      return this.kind.toLowerCase() === 'ideas';
    },
  },
  watch: {
    '$route.query.kind' (val) {
      if (val) {
        this.kind = val;
      }
    },
    '$route.query.search' (val) {
      this.search = val || '';
    },
  },
  mounted () {
    this.kind = this.$route.params.kind ? this.$route.params.kind : 'ideas';
    this.search = this.$route.params.search ? this.$route.params.search : '';
  },
  methods: {
    searchProjectsBy(tag) {
      return this.projects.filter((p) => p.tags.includes(tag));
    },
    getTagCount(tags) {
      return this.searchProjectsBy(tags[0]).length;
    },
  },
}
</script>
