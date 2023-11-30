[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Open Source Helpers](https://www.codetriage.com/makecontributions/ideahub/badges/users.svg)](https://www.codetriage.com/makecontributions/ideahub)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=MakeContributions_ideahub&metric=alert_status)](https://sonarcloud.io/dashboard?id=MakeContributions_ideahub)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=MakeContributions_ideahub&metric=code_smells)](https://sonarcloud.io/dashboard?id=MakeContributions_ideahub)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=MakeContributions_ideahub&metric=duplicated_lines_density)](https://sonarcloud.io/dashboard?id=MakeContributions_ideahub)
[![Netlify Status](https://api.netlify.com/api/v1/badges/3c88a58f-cd29-41f9-8580-4e48fd60532a/deploy-status)](https://app.netlify.com/sites/ideashub/deploys)
[![Discord](https://img.shields.io/discord/863049619734790185?color=7389D8&logo=discord&logoColor=ffffff&label=&labelColor=6A7EC2)](https://discord.gg/ydWxdqbTyK)

# IdeaHub
A collection of ideas and projects that contain from beginner to advance :octocat: 🎯🚀

## Categories ✨
<!--categories:start-->
- Website
    - [Basic](./docs/WEBSITE_BASIC.md)
    - [Intermediate](./docs/WEBSITE_INTERMEDIATE.md)
    - [Advanced](./docs/WEBSITE_ADVANCED.md)

- Desktop Application
    - [Basic](./docs/DESKTOP_APPLICATION_BASIC.md)
    - [Intermediate](./docs/DESKTOP_APPLICATION_INTERMEDIATE.md)
- Game
    - [Basic](./docs/GAME_BASIC.md)
- Machine Learning
    - [Basic](./docs/MACHINE_LEARNING_BASIC.md)
- Script
    - [Intermediate](./docs/SCRIPT_INTERMEDIATE.md)


<!--categories:end-->

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
        "tags": ""
    }
```
4. Create a pull request to `main`

### Json's descriptions
#### Project structure
|Attribute name | Description                                                       |
|---------------|-------------------------------------------------------------------|
|name           | Your repo name on github                                          |
|display        | The project display name                                          |
|description    | The description for your project                                  |
|author         | Your github's username                                            |
|category       | Project category, ex: game, iot, ml, ai, console app, or website  |
|level          | The difficulty of the project, ex: basic, intermediate, advanced  |
|site           | Website URL; Leave an empty string if unavailable                 |
|tags           | Project tags                                                      |

#### Idea structure 
|Attribute name | Description                                                                       |
|---------------|-----------------------------------------------------------------------------------|
|title          | The idea title                                                                    |
|description    | The description of what the developer should do                                  |
|level          | The difficulty of the idea to programming it, ex: basic, intermediate, advanced   |
|tags           | Idea Tags. NOTE: the first tag will be use by search the project                  |

### Others
- [First-time contribution](./CONTRIBUTING.md)
## License
[MIT](./LICENSE)
