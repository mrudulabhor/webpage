const express = require('express');
const axios = require('axios');
const puppeteer = require('puppeteer');
const lighthouse = require('lighthouse');
const { exec } = require('child_process');

const app = express();
app.use(express.json());

app.post('/api/analyze', async (req, res) => {
  const { url } = req.body;

  try {
    // Get webpage content and perform SEO & accessibility checks
    const seoData = await analyzeSEO(url);
    const accessibilityData = await analyzeAccessibility(url);
    const aiFeedback = await getAIFeedback(url);

    // Simulate results (you can replace this with real analysis)
    res.json({
      url,
      accessibilityScore: accessibilityData.score,
      seoScore: seoData.score,
      aiFeedback
    });
  } catch (error) {
    console.error('Error in analysis:', error);
    res.status(500).json({ error: 'Analysis failed' });
  }
});

// Function to run SEO analysis (using Lighthouse CLI)
const analyzeSEO = async (url) => {
  return new Promise((resolve, reject) => {
    exec(`lighthouse ${url} --output json --chrome-flags="--headless"`, (err, stdout, stderr) => {
      if (err) {
        reject(stderr);
      } else {
        const result = JSON.parse(stdout);
        const seoScore = result.categories.seo.score * 100;
        resolve({ score: seoScore });
      }
    });
  });
};

// Function to run accessibility analysis (using Puppeteer and axe-core)
const analyzeAccessibility = async (url) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  // Inject axe-core for accessibility testing
  await page.addScriptTag({ url: 'https://cdn.jsdelivr.net/npm/axe-core@4.3.5/axe.min.js' });

  const result = await page.evaluate(() => {
    return axe.run();
  });

  await browser.close();

  const accessibilityScore = result.violations.length === 0 ? 100 : 100 - (result.violations.length * 10);
  return { score: accessibilityScore };
};

// Simulate AI-based feedback (use an AI API for this in production)
const getAIFeedback = async (url) => {
  // This could be a call to GPT-based API for content review
  return 'AI feedback suggests your page is generally well-optimized, but it could improve accessibility in terms of contrast ratio.';
};

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
