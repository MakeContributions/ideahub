const fs = require('fs')
const file = {
  project: fs.readFileSync('./data/projects.json', 'utf-8'),
  idea: fs.readFileSync('./data/ideas.json', 'utf-8'),
}
let projects = [];
let ideas = [];
const levels = ['basic', 'intermediate', 'advanced'];

describe('Data', () => {
  it('The project file should be an json', () => {
    expect(() => {
      projects = JSON.parse(file.project)
    })
    .not
    .toThrow();
  })

  it('The project file should be an json', () => {
    expect(() => {
      ideas = JSON.parse(file.idea)
    })
    .not
    .toThrow();
  })

  it('Project list should contains the correct level', () => {
    projects.forEach((project) => {
      expect(levels.includes(project.level)).toBe(true)
    })
  })

  it('Ideas list should contains the correct level', () => {
    ideas.forEach((project) => {
      expect(levels.includes(project.level)).toBe(true)
    })
  })
})
