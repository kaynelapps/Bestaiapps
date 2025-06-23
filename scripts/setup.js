const fs = require('fs').promises;
const path = require('path');

async function setupDirectories() {
  const toolsCategories = [
    'analytics', 'audio', 'business', 'chatbots', 'coding', 
    'customer-service', 'data-analysis', 'design', 'education', 
    'email', 'finance', 'healthcare', 'hr', 'image-generators', 
    'legal', 'marketing', 'productivity', 'research', 'sales', 
    'seo', 'social-media', 'translation', 'video', 'voice', 'writing'
  ];

  const articlesCategories = [
    'business', 'chatbots', 'coding', 'education', 'general', 
    'image', 'marketing', 'productivity', 'seo', 'video', 
    'voice', 'writing'
  ];

  console.log('Setting up directory structure...');

  // Ensure all tools directories exist
  for (const category of toolsCategories) {
    const dirPath = path.join('tools', category);
    try {
      await fs.access(dirPath);
      console.log(`✓ ${dirPath} already exists`);
    } catch {
      await fs.mkdir(dirPath, { recursive: true });
      console.log(`✓ Created ${dirPath}`);
    }
  }

  // Ensure all articles directories exist
  for (const category of articlesCategories) {
    const dirPath = path.join('articles', category);
    try {
      await fs.access(dirPath);
      console.log(`✓ ${dirPath} already exists`);
    } catch {
      await fs.mkdir(dirPath, { recursive: true });
      console.log(`✓ Created ${dirPath}`);
    }
  }

  console.log('Directory setup completed!');
}

setupDirectories().catch(console.error);
