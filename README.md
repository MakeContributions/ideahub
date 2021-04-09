# IdeaHub
A collection of ideas and projects that contain from beginner to advance :octocat: 🎯🚀

## Contribution Guidelines
1. Fork the project
2. Modify the file [ideas.json](./data/ideas.json) or [projects.json](./data/projects.json)
3. Add your idea or project to the list as below structure, for more description of json click [here](#jsons-descriptions)
- [Project JSON structure](#project-structure)
```json
    {
        "name": "",
        "display": "",
        "description": "",
        "author": "",
        "category": "",
        "site": "",
        "tags": ""
    }
```

- [Idea JSON structure](#idea-structure)
```json
    {
        "title": "",
        "description": "",
        "level": ""
    }
```
4. Create an pull request to `main`

### Json's descriptions
#### Project structure
|Attribute name | Description                                                       |
|---------------|-------------------------------------------------------------------|
|name           | Your project name on github                                       |
|display        | The project display name                                          |
|description    | The description for your project                                  |
|author         | Your github's username                                            |
|category       | Project category, ex: game, iot, ml, ai, console app, or website  |
|site           | Website url, if doesn't have left it on emtpy string              |
|tags           | Project tags                                                      |

#### Idea structure 
|Attribute name | Description                                                       |
|---------------|-------------------------------------------------------------------|
|title          | The idea title                                                    |
|description    | The description about what should the developer do                |
|level          | The difficult of the idea to programming it                       |

### Others
- [First-time contribution](./CONTRIBUTING.md)
## License
[MIT](./LICENSE)
