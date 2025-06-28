import React from 'react';
import { motion } from 'framer-motion';
import { FaPython, FaSearch, FaChartPie, FaBook, FaGithub, FaTools } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const SnapeSentimentAnalysis = () => {
  console.log('SnapeSentimentAnalysis component mounted');
  
  return (
    <motion.div 
      className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-16 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <Link 
          to="/projects" 
          className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 mb-8 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Projects
        </Link>

        {/* Project Header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <div className="flex items-center mb-4">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Secrets of Severus Snape: Web Scraping & Sentiment Analysis</h1>
                <span className="ml-3 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300">
                  Python
                </span>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Unveiling the emotional depths of Severus Snape through data-driven storytelling.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {['#Python', '#WebScraping', '#SentimentAnalysis', '#NLTK', '#DataScience'].map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <FaTools className="mr-2" />
                <span>Tools used: Python, BeautifulSoup, NLTK, Pandas, Matplotlib, Jupyter Notebook</span>
              </div>
            </div>
          </div>
        </div>

        {/* Project Content */}
        <div className="space-y-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Inspired by childhood memories of Harry Potter, this project uses Python to scrape text about Severus Snape and analyze his emotional landscape through sentiment analysis. By combining web scraping with natural language processing, I decoded the complex feelings and recurring themes in Snape's story.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Project Objective</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              To extract and analyze textual data about Severus Snape to understand his emotional nuances and identify key words that define his character.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Web Scraping Process</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Using Python libraries like BeautifulSoup, I extracted relevant paragraphs from dedicated fan sites and wikis. The raw text was then cleaned and structured into CSV files for analysis.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Sentiment Analysis Methodology</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Leveraging NLTK's SentimentIntensityAnalyzer, I classified Snape's sentiments into categories such as worry, contempt, anger, and protectiveness. This revealed the emotional texture of his narrative.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Key Findings</h2>
            <ul className="space-y-3 mb-6">
              <li className="flex">
                <span className="text-indigo-500 mr-2">•</span>
                <span className="text-gray-600 dark:text-gray-300"><strong>Worry (22.51%)</strong> dominates, reflecting Snape's constant concern throughout the saga.</span>
              </li>
              <li className="flex">
                <span className="text-indigo-500 mr-2">•</span>
                <span className="text-gray-600 dark:text-gray-300"><strong>Contempt (19.32%)</strong> and <strong>Anger (14.94%)</strong> highlight moments of disdain and frustration.</span>
              </li>
              <li className="flex">
                <span className="text-indigo-500 mr-2">•</span>
                <span className="text-gray-600 dark:text-gray-300"><strong>Protectiveness (10.06%)</strong> shows Snape's hidden guardian role.</span>
              </li>
              <li className="flex">
                <span className="text-indigo-500 mr-2">•</span>
                <span className="text-gray-600 dark:text-gray-300">Sarcasm, sacrifice, ambiguity, and affection also color his emotional profile.</span>
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Top Keywords</h2>
            <ul className="space-y-3 mb-6">
              <li className="flex">
                <span className="text-indigo-500 mr-2">•</span>
                <span className="text-gray-600 dark:text-gray-300"><strong>Snape</strong> appears 703 times, central to the narrative.</span>
              </li>
              <li className="flex">
                <span className="text-indigo-500 mr-2">•</span>
                <span className="text-gray-600 dark:text-gray-300"><strong>Harry, Dumbledore, Voldemort</strong> underscore key relationships.</span>
              </li>
              <li className="flex">
                <span className="text-indigo-500 mr-2">•</span>
                <span className="text-gray-600 dark:text-gray-300"><strong>Lily</strong> symbolizes poignant emotional ties.</span>
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Visual Insights</h2>
            <div className="bg-gray-50 dark:bg-gray-700/30 p-6 rounded-xl mb-6">
              <img 
                src="/images/snape-sentiment-dashboard.avif" 
                alt="Sentiment Analysis Dashboard for Severus Snape" 
                className="w-full h-auto rounded-lg shadow-md mb-4"
                loading="lazy"
              />
              <p className="text-center text-sm text-gray-500 dark:text-gray-400">Dashboard visualizing sentiment distribution and keyword frequency in Snape's story.</p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700/30 p-6 rounded-xl mb-6">
              <img 
                src="/images/snape-wordcloud.avif" 
                alt="Word Cloud of Most Frequent Words in Snape's Story" 
                className="w-full h-auto rounded-lg shadow-md mb-4"
                loading="lazy"
              />
              <p className="text-center text-sm text-gray-500 dark:text-gray-400">Word cloud highlighting the most significant words associated with Severus Snape.</p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Conclusion</h2>
            <p className="text-gray-600 dark:text-gray-300">
              This project uncovers the layered emotions of Severus Snape through data science techniques, blending storytelling with analytics to reveal the complexity behind one of literature's most enigmatic characters.
            </p>
          </div>
        </div>

        {/* Technical Implementation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Web Scraping */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
              <FaSearch className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Web Scraping</h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Scraped fan wikis using BeautifulSoup</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Collected 703 mentions of Snape</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Structured data in pandas DataFrames</span>
              </li>
            </ul>
          </div>

          {/* Sentiment Analysis */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-4">
              <FaChartPie className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Sentiment Analysis</h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li className="flex items-start">
                <span className="text-purple-500 mr-2">•</span>
                <span>NLTK's SentimentIntensityAnalyzer</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 mr-2">•</span>
                <span>Emotion categorization</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 mr-2">•</span>
                <span>Contextual sentiment scoring</span>
              </li>
            </ul>
          </div>

          {/* Data Visualization */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
              <FaBook className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Visual Insights</h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>Sentiment distribution charts</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>Word cloud visualization</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>Emotional arc analysis</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Visualizations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
            <img 
              src="/images/snape-sentiment-dashboard.avif" 
              alt="Snape Sentiment Dashboard"
              className="w-full h-auto"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/images/placeholder.svg';
              }}
            />
            <div className="p-4">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Sentiment Dashboard</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Distribution of emotional tones in Snape's narrative arc throughout the series.
              </p>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
            <img 
              src="/images/snape-wordcloud.avif" 
              alt="Snape Word Cloud"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/images/placeholder.svg';
              }}
            />
            <div className="p-4">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Word Cloud</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Most significant words associated with Snape's character and story.
              </p>
            </div>
          </div>
        </div>

        {/* Code Snippets */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Technical Implementation</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">Web Scraping with BeautifulSoup</h3>
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg overflow-x-auto">
                <pre className="text-sm text-gray-800 dark:text-gray-200">
{`import requests
from bs4 import BeautifulSoup
import pandas as pd

def scrape_snape_mentions():
    url = "https://harrypotter.fandom.com/wiki/Severus_Snape"
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    
    # Find all paragraphs containing Snape's mentions
    paragraphs = soup.find_all('p')
    mentions = [p.get_text() for p in paragraphs if 'Snape' in p.get_text()]
    
    # Create DataFrame and save to CSV
    df = pd.DataFrame(mentions, columns=['text'])
    df.to_csv('snape_mentions.csv', index=False)
    return df`}
                </pre>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">Sentiment Analysis with NLTK</h3>
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg overflow-x-auto">
                <pre className="text-sm text-gray-800 dark:text-gray-200">
{`from nltk.sentiment import SentimentIntensityAnalyzer
import nltk
nltk.download('vader_lexicon')

def analyze_sentiment(text):
    sia = SentimentIntensityAnalyzer()
    sentiment = sia.polarity_scores(text)
    return {
        'positive': sentiment['pos'],
        'negative': sentiment['neg'],
        'neutral': sentiment['neu'],
        'compound': sentiment['compound']
    }

def process_mentions(df):
    # Apply sentiment analysis to each mention
    sentiments = df['text'].apply(analyze_sentiment)
    return pd.concat([df, pd.DataFrame(list(sentiments))], axis=1)`}
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* Key Findings */}
        <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-indigo-800 dark:text-indigo-300 mb-6">Key Findings & Insights</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-indigo-700 dark:text-indigo-200 mb-3">Emotional Profile</h3>
              <ul className="space-y-2 text-indigo-700 dark:text-indigo-300">
                <li className="flex items-start">
                  <span className="text-indigo-500 mr-2">•</span>
                  <span>Worry emerges as the dominant emotion (22.51%)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-500 mr-2">•</span>
                  <span>Complex mix of contempt (19.32%) and protectiveness (10.06%)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-500 mr-2">•</span>
                  <span>Anger present but not dominant (14.94%)</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-indigo-700 dark:text-indigo-200 mb-3">Narrative Insights</h3>
              <ul className="space-y-2 text-indigo-700 dark:text-indigo-300">
                <li className="flex items-start">
                  <span className="text-indigo-500 mr-2">•</span>
                  <span>Lily Potter emerges as emotional anchor</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-500 mr-2">•</span>
                  <span>Strong themes of sacrifice and redemption</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-500 mr-2">•</span>
                  <span>Complex relationship with Dumbledore and Harry</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Explore the Code</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            Dive deeper into the analysis and explore the code on GitHub.
          </p>
          <a
            href="https://github.com/yourusername/snape-sentiment-analysis"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700 dark:bg-white dark:text-gray-800 dark:hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          >
            <FaGithub className="mr-2" />
            View on GitHub
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default SnapeSentimentAnalysis;
