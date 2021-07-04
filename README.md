[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Open Source Helpers](https://www.codetriage.com/makecontributions/ideahub/badges/users.svg)](https://www.codetriage.com/makecontributions/ideahub)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=MakeContributions_ideahub&metric=alert_status)](https://sonarcloud.io/dashboard?id=MakeContributions_ideahub)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=MakeContributions_ideahub&metric=code_smells)](https://sonarcloud.io/dashboard?id=MakeContributions_ideahub)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=MakeContributions_ideahub&metric=duplicated_lines_density)](https://sonarcloud.io/dashboard?id=MakeContributions_ideahub)
[![Netlify Status](https://api.netlify.com/api/v1/badges/3c88a58f-cd29-41f9-8580-4e48fd60532a/deploy-status)](https://app.netlify.com/sites/ideashub/deploys)

# IdeaHub
A collection of ideas and projects that contain from beginner to advance :octocat: 🎯🚀

## Categories ✨
<!--categories:start-->
- Desktop Application
    - [Basic](./docs/DESKTOP_APPLICATION_BASIC.md)
    - [Intermediate](./docs/DESKTOP_APPLICATION_INTERMEDIATE.md)
- Game
    - [Basic](./docs/GAME_BASIC.md)
- Machine Learning
    - [Basic](./docs/MACHINE_LEARNING_BASIC.md)
- Website
    - [Basic](./docs/WEBSITE_BASIC.md)
    - [Intermediate](./docs/WEBSITE_INTERMEDIATE.md)

<!--categories:end-->


## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out the [documentation](https://nuxtjs.org).

## Special Directories

You can create the following extra directories, some of which have special behaviors. Only `pages` is required; you can delete them if you don't want to use their functionality.

### `assets`

The assets directory contains your uncompiled assets such as Stylus or Sass files, images, or fonts.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/assets).

### `components`

The components directory contains your Vue.js components. Components make up the different parts of your page and can be reused and imported into your pages, layouts and even other components.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/components).

### `layouts`

Layouts are a great help when you want to change the look and feel of your Nuxt app, whether you want to include a sidebar or have distinct layouts for mobile and desktop.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/layouts).


### `pages`

This directory contains your application views and routes. Nuxt will read all the `*.vue` files inside this directory and setup Vue Router automatically.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/get-started/routing).

### `plugins`

The plugins directory contains JavaScript plugins that you want to run before instantiating the root Vue.js Application. This is the place to add Vue plugins and to inject functions or constants. Every time you need to use `Vue.use()`, you should create a file in `plugins/` and add its path to plugins in `nuxt.config.js`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/plugins).

### `static`

This directory contains your static files. Each file inside this directory is mapped to `/`.

Example: `/static/robots.txt` is mapped as `/robots.txt`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/static).

### `store`

This directory contains your Vuex store files. Creating a file in this directory automatically activates Vuex.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/store).

## Contribution Guidelines
1. Fork the project
2. Modify the file [ideas.json](https://github.com/MakeContributions/ideahub/edit/main/data/ideas.json) or [projects.json](https://github.com/MakeContributions/ideahub/edit/main/data/projects.json)
3. Add your idea or project to the list as below structure, for more description of json click [here](#jsons-descriptions)
- [Project JSON structure](#project-structure)
```json
    {
        "name": "",
        "display": "",
        "description": "",
        "author": "",
        "category": "",
        "level": "",
        "site": "",
        "tags": ""
    }
```

- [Idea JSON structure](#idea-structure)
```json
    {
        "title": "",
        "description": "",
        "level": "",
        "tags: ""
    }
```
4. Create an pull request to `main`

### Json's descriptions
#### Project structure
|Attribute name | Description                                                       |
|---------------|-------------------------------------------------------------------|
|name           | Your repo name on github                                          |
|display        | The project display name                                          |
|description    | The description for your project                                  |
|author         | Your github's username                                            |
|category       | Project category, ex: game, iot, ml, ai, console app, or website  |
|level          | The difficult of the project, ex: basic, intermediate, advanced   |
|site           | Website url, if doesn't have left it on emtpy string              |
|tags           | Project tags                                                      |

#### Idea structure 
|Attribute name | Description                                                                       |
|---------------|-----------------------------------------------------------------------------------|
|title          | The idea title                                                                    |
|description    | The description about what should the developer do                                |
|level          | The difficult of the idea to programming it, ex: basic, intermediate, advanced    |
|tags           | Idea Tags. NOTE: the first tag will be use by search the project                  |

### Others
- [First-time contribution](./CONTRIBUTING.md)

## License
[MIT](./LICENSE)
