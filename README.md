# STOCKSUNIFY 📈

**Unified Stock Analysis & Daily Picks**

This repository consolidates stock analysis data, algorithms, and daily picks from multiple AI-validated sources.

## 🌐 Live Site

**GitHub Pages:** [View Live Site](https://eltonaguiar.github.io/STOCKSUNIFY/)

## 📊 Daily Stock Picks

**Latest Data:** [data/daily-stocks.json](./data/daily-stocks.json)

Daily stock picks are generated using multiple algorithms:
- **CAN SLIM Growth Screener** (Long-term, 3-12 months)
- **Technical Momentum** (Short-term, 24h-1 week)
- **ML Ensemble** (Portfolio Management)

## 📚 Analysis Documents

### Comprehensive Analysis
- [Stock Repository Analysis](./STOCK_REPOSITORY_ANALYSIS.md) - Analysis of 11 stock repositories
- [Algorithm Summary](./STOCK_ALGORITHM_SUMMARY.md) - Quick reference guide
- [Decision Matrix](./STOCK_ALGORITHM_DECISION_MATRIX.md) - Visual algorithm selector

### AI Assessments
- [Google Gemini Analysis](./STOCK_GOOGLEGEMINI_ANALYSIS.md) - Gemini's assessment
- [Comet Browser AI Analysis](./STOCK_COMETBROWSERAI_ANALYSIS.md) - Comet Browser AI breakdown
- [ChatGPT Analysis](./STOCK_CHATGPT_ANALYSIS.md) - ChatGPT code inspection

## 🔧 Scripts

- [generate-daily-stocks.ts](./scripts/generate-daily-stocks.ts) - Daily stock picks generator

## 🚀 Usage

### Generate Daily Stock Picks

```bash
npm install
npx tsx scripts/generate-daily-stocks.ts
```

### View Data

The daily stock picks are available as JSON:
- **Local:** `data/daily-stocks.json`
- **Web:** `https://eltonaguiar.github.io/STOCKSUNIFY/data/daily-stocks.json`

## 📈 Algorithms Integrated

### 1. Long-Term Growth (3-12 months)
**CAN SLIM Growth Screener** - 60-70% accuracy
- RS Rating ≥ 90
- Stage-2 Uptrend
- Revenue Growth ≥ 25% (SEC EDGAR data)
- Institutional Accumulation

### 2. Short-Term Momentum (24h - 1 week)
**Technical + Volume Analysis**
- Volume Surge Detection
- RSI Extremes
- Breakout Patterns
- Bollinger Band Squeeze
- ⚠️ High Risk - Penny Stocks

### 3. ML Portfolio Management
**ML Ensemble + Risk Management**
- XGBoost/Gradient Boosting
- Sentiment Analysis (NLP)
- Portfolio Optimization
- VaR, Sharpe Ratio metrics

## 🔗 Source Repositories

This data is synced from:
- [TORONTOEVENTS_ANTIGRAVITY](https://github.com/eltonaguiar/TORONTOEVENTS_ANTIGRAVITY) - Main repository
- [mikestocks](https://github.com/eltonaguiar/mikestocks) - CAN SLIM Growth Screener
- [Stock Spike Replicator](https://github.com/eltonaguiar/eltonsstocks-apr24_2025) - ML + Risk Management
- [Penny Stock Screener](https://github.com/eltonaguiar/SCREENER_PENNYSTOCK_SKYROCKET_24HOURS_CURSOR) - Technical Momentum

## ⚠️ Disclaimer

Stock predictions are for informational purposes only and do not constitute financial advice. Always conduct your own research and consult with a licensed financial advisor before making investment decisions.

## 📅 Last Updated

This repository is automatically synced daily. Check the `lastUpdated` field in `data/daily-stocks.json` for the latest update timestamp.

---

*Powered by 11+ AI-validated stock analysis algorithms*
