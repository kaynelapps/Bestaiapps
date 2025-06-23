const fs = require('fs').promises;
const path = require('path');
const fetch = require('node-fetch');

class ContentGenerator {
  constructor() {
    this.accessToken = process.env.CODY_ACCESS_TOKEN;
    this.apiUrl = 'https://sourcegraph.com/.api/completions/stream';
    this.categories = {
      day_1: {
        categories: ['writing', 'marketing', 'seo'],
        theme: 'content_creation',
        cross_topic: 'ai-content-marketing-stack'
      },
      day_2: {
        categories: ['image', 'video', 'design'],
        theme: 'visual_content',
        cross_topic: 'ai-visual-content-workflow'
      },
      day_3: {
        categories: ['coding', 'productivity', 'business'],
        theme: 'professional_tools',
        cross_topic: 'ai-business-automation-suite'
      },
      day_4: {
        categories: ['chatbots', 'voice', 'education'],
        theme: 'communication_learning',
        cross_topic: 'ai-communication-tools-comparison'
      }
    };
    
    this.toolsDatabase = {
      writing: ['jasper-ai', 'copy-ai', 'writesonic', 'grammarly', 'rytr', 'wordtune', 'quillbot', 'anyword'],
      marketing: ['hubspot-ai', 'marketo-ai', 'salesforce-einstein', 'mailchimp-ai', 'hootsuite-ai', 'buffer-ai'],
      seo: ['semrush-ai', 'ahrefs-ai', 'surfer-seo', 'clearscope', 'marketmuse', 'frase'],
      image: ['midjourney', 'dalle-3', 'stable-diffusion', 'canva-ai', 'leonardo-ai', 'firefly'],
      video: ['runway-ml', 'pika-labs', 'synthesia', 'luma-ai', 'invideo-ai', 'pictory'],
      design: ['figma-ai', 'adobe-sensei', 'canva-ai', 'looka', 'brandmark', 'designs-ai'],
      coding: ['github-copilot', 'tabnine', 'codeium', 'replit-ai', 'cursor', 'codex'],
      productivity: ['notion-ai', 'clickup-ai', 'monday-ai', 'asana-ai', 'todoist-ai', 'calendly-ai'],
      business: ['salesforce-ai', 'hubspot-ai', 'zoho-ai', 'microsoft-copilot', 'google-workspace-ai'],
      chatbots: ['chatgpt', 'claude', 'bard', 'character-ai', 'replika', 'chatbot-com'],
      voice: ['eleven-labs', 'murf-ai', 'speechify', 'descript', 'otter-ai', 'rev-ai'],
      education: ['khan-academy-ai', 'coursera-ai', 'duolingo-ai', 'grammarly-edu', 'quizlet-ai']
    };
  }

  async callCodyAPI(prompt, maxTokens = 2000) {
    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `token ${this.accessToken}`,
          'Content-Type': 'application/json',
          'User-Agent': 'BestAIApps-Automation/1.0'
        },
        body: JSON.stringify({
          messages: [
            {
              speaker: 'human',
              text: prompt
            }
          ],
          maxTokensToSample: maxTokens,
          temperature: 0.7,
          model: 'anthropic/claude-3-5-sonnet-20241022'
        })
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.text();
      return this.parseStreamResponse(data);
    } catch (error) {
      console.error('Cody API Error:', error);
      throw error;
    }
  }

  parseStreamResponse(streamData) {
    // Parse the streaming response from Cody
    const lines = streamData.split('\n').filter(line => line.trim());
    let content = '';
    
    for (const line of lines) {
      if (line.startsWith('data: ')) {
        try {
          const json = JSON.parse(line.slice(6));
          if (json.completion) {
            content += json.completion;
          }
        } catch (e) {
          // Skip invalid JSON lines
        }
      }
    }
    
    return content || streamData; // Fallback to raw data if parsing fails
  }

  generateReviewPrompt(toolName, category) {
    return `Write a comprehensive, professional review of ${toolName} for the ${category} category. 

Structure the review exactly as follows:

# ${toolName} Review 2025: Complete Analysis

## Introduction
Write a compelling 150-word introduction explaining what ${toolName} is and why it matters in the ${category} space.

## Key Features
Detail the main features in 300 words, focusing on what makes this tool unique.

## Pros and Cons
### Pros
List 5-6 major advantages with brief explanations.

### Cons  
List 3-4 limitations or drawbacks.

## Pricing Analysis
Analyze the pricing structure in 200 words, including value for money assessment.

## Use Cases and Examples
Provide 3-4 specific use cases with practical examples (300 words).

## Final Verdict
Conclude with a balanced assessment and rating out of 5 stars (150 words).

Requirements:
- Professional, informative tone
- 1500+ words total
- Include specific examples
- Optimize for SEO with keywords: "${toolName}", "${category} AI tools", "AI ${category}"
- Write as an expert reviewer
- Be honest and balanced`;
  }

  generateComparisonPrompt(tool1, tool2, category) {
    return `Write a detailed comparison between ${tool1} and ${tool2} in the ${category} category.

Structure the comparison as follows:

# ${tool1} vs ${tool2}: Which ${category} AI Tool is Better?

## Introduction
Brief overview of both tools and why this comparison matters (150 words).

## Feature Comparison
Create a detailed feature-by-feature comparison covering:
- Core functionality
- User interface
- Integration capabilities
- Performance
- Unique features

## Pricing Comparison
Compare pricing plans, value for money, and cost-effectiveness.

## Pros and Cons
### ${tool1}
- Pros: (4-5 points)
- Cons: (3-4 points)

### ${tool2}
- Pros: (4-5 points)  
- Cons: (3-4 points)

## Use Case Scenarios
When to choose ${tool1} vs ${tool2} with specific examples.

## Final Recommendation
Clear winner recommendation with reasoning.

Requirements:
- 1200+ words
- Objective and balanced
- Include specific examples
- SEO optimized for "${tool1} vs ${tool2}", "${category} AI comparison"
- Professional tone`;
  }

  async generateDailyContent() {
    const today = new Date();
    const dayOfCycle = (Math.floor(today.getTime() / (1000 * 60 * 60 * 24)) % 4) + 1;
    const dayConfig = this.categories[`day_${dayOfCycle}`];
    
    console.log(`Generating content for Day ${dayOfCycle}: ${dayConfig.theme}`);
    
    const articles = [];
    
    // Generate 6 reviews (2 per category)
    for (const category of dayConfig.categories) {
      const tools = this.toolsDatabase[category];
      const selectedTools = this.getRandomTools(tools, 2);
      
      for (const tool of selectedTools) {
        const prompt = this.generateReviewPrompt(tool, category);
        const content = await this.callCodyAPI(prompt);
        const article = await this.createReviewHTML(tool, category, content);
        articles.push(article);
        
        // Add delay to avoid rate limiting
        await this.delay(2000);
      }
    }
    
    // Generate 3 comparisons (1 per category)
    for (const category of dayConfig.categories) {
      const tools = this.toolsDatabase[category];
      const [tool1, tool2] = this.getRandomTools(tools, 2);
      
      const prompt = this.generateComparisonPrompt(tool1, tool2, category);
      const content = await this.callCodyAPI(prompt);
      const article = await this.createComparisonHTML(tool1, tool2, category, content);
      articles.push(article);
      
      await this.delay(2000);
    }
    
    return articles;
  }

  getRandomTools(tools, count) {
    const shuffled = [...tools].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  async createReviewHTML(toolName, category, content) {
    const date = new Date().toISOString().split('T')[0];
    const filename = `${toolName}-review-${date}.html`;
    const filepath = path.join('tools', category, filename);
    
    const html = this.generateHTMLTemplate(content, `${toolName} Review`, 'review');
    
    await this.ensureDirectoryExists(path.dirname(filepath));
    await fs.writeFile(filepath, html);
    
    return { type: 'review', category, filename, filepath };
  }

  async createComparisonHTML(tool1, tool2, category, content) {
    const date = new Date().toISOString().split('T')[0];
    const filename = `${tool1}-vs-${tool2}-${date}.html`;
    const filepath = path.join('articles', category, filename);
    
    const html = this.generateHTMLTemplate(content, `${tool1} vs ${tool2}`, 'comparison');
    
    await this.ensureDirectoryExists(path.dirname(filepath));
    await fs.writeFile(filepath, html);
    
    return { type: 'comparison', category, filename, filepath };
  }

  generateHTMLTemplate(content, title, type) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta content="width=device-width, initial-scale=1.0" name="viewport">
  <title>${title} - Best AI Apps 2025</title>
  <meta name="description" content="${title} - Comprehensive analysis and review">
  
  <!-- Favicons -->
  <link href="../assets/img/favicon.png" rel="icon">
  <link href="../assets/img/apple-touch-icon.png" rel="apple-touch-icon">
  
  <!-- Fonts -->
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
  
  <!-- Vendor CSS Files -->
  <link href="../assets/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
  <link href="../assets/vendor/bootstrap-icons/bootstrap-icons.css" rel="stylesheet">
  <link href="../assets/vendor/aos/aos.css" rel="stylesheet">
  
  <!-- Main CSS File -->
  <link href="../assets/css/main.css" rel="stylesheet">
</head>

<body class="article-page">
  <header id="header" class="header d-flex align-items-center sticky-top">
    <div class="container-fluid container-xl position-relative d-flex align-items-center">
      <a href="../index.html" class="logo d-flex align-items-center me-auto">
        <h1 class="sitename">Best<span class="accent">AI</span>Apps</h1>
      </a>
      
      <nav id="navmenu" class="navmenu">
        <ul>
          <li><a href="../index.html">Home</a></li>
          <li><a href="../categories.html">Categories</a></li>
          <li><a href="../tools.html">Tools</a></li>
          <li><a href="../blog.html">Articles</a></li>
          <li><a href="../contact.html">Contact</a></li>
        </ul>
        <i class="mobile-nav-toggle d-xl-none bi bi-list"></i>
      </nav>
    </div>
  </header>

  <main class="main">
    <section class="article-content section">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-8">
            <article class="article">
              ${this.convertMarkdownToHTML(content)}
            </article>
          </div>
        </div>
      </div>
    </section>
  </main>

  <footer id="footer" class="footer light-background">
    <div class="container copyright text-center mt-4">
      <p>© <span>Copyright</span> <strong class="px-1 sitename">BestAIApps</strong> <span>All Rights Reserved</span></p>
    </div>
  </footer>

  <!-- Vendor JS Files -->
  <script src="../assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
  <script src="../assets/vendor/aos/aos.js"></script>
  <script src="../assets/js/main.js"></script>
</body>
</html>`;
  }

    convertMarkdownToHTML(markdown) {
    return markdown
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^\* (.*$)/gim, '<li>$1</li>')
      .replace(/^- (.*$)/gim, '<li>$1</li>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/^(.*)$/gim, '<p>$1</p>')
      .replace(/<p><h/g, '<h')
      .replace(/<\/h([1-6])><\/p>/g, '</h$1>')
      .replace(/<p><li>/g, '<ul><li>')
      .replace(/<\/li><\/p>/g, '</li></ul>');
  }

  async ensureDirectoryExists(dirPath) {
    try {
      await fs.access(dirPath);
    } catch {
      await fs.mkdir(dirPath, { recursive: true });
    }
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Main execution
async function main() {
  const generator = new ContentGenerator();
  
  try {
    console.log('Starting daily content generation...');
    const articles = await generator.generateDailyContent();
    
    console.log(`Generated ${articles.length} articles:`);
    articles.forEach(article => {
      console.log(`- ${article.type}: ${article.filename}`);
    });
    
    console.log('Content generation completed successfully!');
  } catch (error) {
    console.error('Content generation failed:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = ContentGenerator;
