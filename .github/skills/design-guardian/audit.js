#!/usr/bin/env node
/**
 * Design Guardian Audit Script
 * Validates HTML/CSS against design system guidelines
 */

const fs = require('fs');
const path = require('path');

// Color contrast calculation (WCAG 2.1)
function getLuminance(r, g, b) {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function getContrastRatio(fg, bg) {
  const l1 = getLuminance(fg.r, fg.g, fg.b);
  const l2 = getLuminance(bg.r, bg.g, bg.b);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

// Audit rules
const auditRules = {
  colorPalette: {
    name: 'Color Palette Compliance',
    check: (content) => {
      const hexPattern = /#[0-9a-fA-F]{6}\b/g;
      const violations = [];
      let match;
      while ((match = hexPattern.exec(content)) !== null) {
        violations.push({
          color: match[0],
          position: match.index,
          suggestion: 'Use CSS variables: var(--color-primary), var(--color-accent), etc.'
        });
      }
      return violations;
    }
  },
  responsiveness: {
    name: 'Responsive Design',
    check: (content) => {
      const violations = [];
      if (!content.includes('viewport') && !content.includes('meta name="viewport"')) {
        violations.push({
          issue: 'Missing viewport meta tag',
          suggestion: '<meta name="viewport" content="width=device-width, initial-scale=1.0">'
        });
      }
      if (!content.includes('@media') && !content.includes('media query')) {
        violations.push({
          issue: 'No media queries found',
          suggestion: 'Add @media (max-width: 768px) for mobile responsiveness'
        });
      }
      return violations;
    }
  }
};

// Run audit
console.log('🔍 Design Guardian Audit\n');
const htmlFile = path.join(__dirname, '../../index.html');
const cssFile = path.join(__dirname, '../../css/style.css');

if (fs.existsSync(htmlFile)) {
  const htmlContent = fs.readFileSync(htmlFile, 'utf8');
  console.log('📄 Auditing index.html...');
  const colorViolations = auditRules.colorPalette.check(htmlContent);
  if (colorViolations.length > 0) {
    console.log(`  ⚠️  Found ${colorViolations.length} hardcoded colors:`);
    colorViolations.forEach(v => console.log(`    - ${v.color} → ${v.suggestion}`));
  } else {
    console.log('  ✅ No hardcoded colors detected');
  }
} else {
  console.log('⏭️  index.html not found');
}

console.log('\n✨ Audit complete');
