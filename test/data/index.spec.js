const fs = require('fs');
const projects = JSON.parse(fs.readFileSync('./data/projects.json', 'utf-8'));
const ideas = JSON.parse(fs.readFileSync('./data/ideas.json', 'utf-8'));
const levels = ['basic', 'intermediate', 'advanced'];

test('Project list should contains the correct level', () => {
  projects.forEach((project) => {
    expect(levels.includes(project.level)).toBe(true);
  });
});

test('Ideas list should contains the correct level', () => {
  ideas.forEach((project) => {
    expect(levels.includes(project.level)).toBe(true);
  });
});
