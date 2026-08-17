#!/usr/bin/env node
/**
 * Add Project Skill
 * Generates and inserts project cards into index.html
 */

const fs = require('fs');
const path = require('path');

const projectTemplate = {
  residential: {
    category_en: 'residential',
    category_jp: '戸建住宅'
  },
  commercial: {
    category_en: 'commercial',
    category_jp: '商業施設'
  },
  public: {
    category_en: 'public',
    category_jp: '公共施設'
  }
};

function generateProjectCard(data) {
  const {
    project_name,
    year,
    description,
    image_path,
    category
  } = data;

  const categoryInfo = projectTemplate[category] || projectTemplate.residential;

  return `<article class="project-card" data-category="${categoryInfo.category_en}">
  <div class="project-card-thumb">
    <img src="${image_path}" alt="${project_name}の外観写真" loading="lazy" width="600" height="400">
    <span class="category-badge">${categoryInfo.category_jp}</span>
  </div>
  <div class="project-card-body">
    <span class="project-year">${year}年 竣工</span>
    <h3 class="project-title">${project_name}</h3>
    <p class="project-desc">${description}</p>
  </div>
</article>`;
}

// Example usage
const exampleProject = {
  project_name: 'サンシャイン邸',
  year: 2024,
  description: '南向きの明るいリビングが特徴の高級戸建住宅。地域の自然景観と調和した設計。',
  image_path: './assets/project-1.jpg',
  category: 'residential'
};

console.log('🏗️  Project Card Generator\n');
const card = generateProjectCard(exampleProject);
console.log('Generated HTML:\n');
console.log(card);
console.log('\n✅ Insert this into <div id="projects-grid"> in index.html');
