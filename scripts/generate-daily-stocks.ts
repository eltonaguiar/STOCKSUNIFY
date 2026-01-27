#!/usr/bin/env tsx
/**
 * Daily Stock Picks Generator
 * 
 * This script generates daily stock picks by combining multiple algorithms:
 * - CAN SLIM Growth Screener (long-term)
 * - Technical Momentum (short-term)
 * - Composite Rating (medium-term)
 * 
 * Output: data/daily-stocks.json
 */

import * as fs from 'fs';
import * as path from 'path';
import { fetchMultipleStocks } from './lib/stock-data-fetcher';
import { scoreCANSLIM, scoreTechnicalMomentum, scoreComposite } from './lib/stock-scorers';
import type { StockPick } from './lib/stock-scorers';

// Popular stocks to screen (mix of large cap, mid cap, and some penny stocks)
const STOCK_UNIVERSE = [
  // Large Cap Tech
  'AAPL', 'MSFT', 'GOOGL', 'AMZN', 'NVDA', 'META', 'TSLA', 'NFLX',
  // Growth Stocks
  'AMD', 'INTC', 'CRM', 'ADBE', 'PYPL', 'NOW', 'SNOW', 'PLTR',
  // Financials
  'JPM', 'BAC', 'GS', 'MS', 'V', 'MA',
  // Consumer
  'WMT', 'TGT', 'HD', 'NKE', 'SBUX',
  // Energy
  'XOM', 'CVX', 'SLB',
  // Healthcare
  'JNJ', 'PFE', 'UNH', 'ABBV',
  // Penny/Momentum (for short-term screener)
  'GME', 'AMC', 'BB', 'SNDL', 'NAKD',
  // Additional momentum plays
  'RIVN', 'LCID', 'F', 'GM'
];

async function generateStockPicks(): Promise<StockPick[]> {
  console.log('📊 Fetching stock data...');
  const stockData = await fetchMultipleStocks(STOCK_UNIVERSE);
  console.log(`✅ Fetched data for ${stockData.length} stocks`);

  const picks: StockPick[] = [];

  console.log('\n🔍 Running CAN SLIM Growth Screener...');
  for (const data of stockData) {
    const score = scoreCANSLIM(data);
    if (score && score.score >= 50) { // Only include scores >= 50
      picks.push(score);
      console.log(`  ✓ ${score.symbol}: ${score.score}/100 (${score.rating})`);
    }
  }

  console.log('\n🔍 Running Technical Momentum Screener (7-day)...');
  for (const data of stockData) {
    const score = scoreTechnicalMomentum(data, '7d');
    if (score && score.score >= 50) {
      picks.push(score);
      console.log(`  ✓ ${score.symbol}: ${score.score}/100 (${score.rating})`);
    }
  }

  console.log('\n🔍 Running Technical Momentum Screener (24h)...');
  for (const data of stockData) {
    const score = scoreTechnicalMomentum(data, '24h');
    if (score && score.score >= 60) { // Higher threshold for 24h
      picks.push(score);
      console.log(`  ✓ ${score.symbol}: ${score.score}/100 (${score.rating})`);
    }
  }

  console.log('\n🔍 Running Composite Rating Engine...');
  for (const data of stockData) {
    const score = scoreComposite(data);
    if (score && score.score >= 55) {
      picks.push(score);
      console.log(`  ✓ ${score.symbol}: ${score.score}/100 (${score.rating})`);
    }
  }

  // Remove duplicates (same symbol) - keep highest score
  const uniquePicks = new Map<string, StockPick>();
  for (const pick of picks) {
    const existing = uniquePicks.get(pick.symbol);
    if (!existing || pick.score > existing.score) {
      uniquePicks.set(pick.symbol, pick);
    }
  }

  const finalPicks = Array.from(uniquePicks.values());

  // Sort by score (highest first)
  finalPicks.sort((a, b) => b.score - a.score);

  // Limit to top 20 picks
  return finalPicks.slice(0, 20);
}

async function main() {
  console.log('📈 Generating daily stock picks...\n');

  try {
    const stocks = await generateStockPicks();
    
    const output = {
      lastUpdated: new Date().toISOString(),
      totalPicks: stocks.length,
      stocks: stocks
    };

    // Ensure data directory exists
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Write to data/daily-stocks.json
    const outputPath = path.join(dataDir, 'daily-stocks.json');
    fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));

    console.log(`\n✅ Generated ${stocks.length} stock picks`);
    console.log(`📁 Saved to: ${outputPath}`);

    // Also write to public/data for web access
    const publicDataDir = path.join(process.cwd(), 'public', 'data');
    if (!fs.existsSync(publicDataDir)) {
      fs.mkdirSync(publicDataDir, { recursive: true });
    }
    const publicOutputPath = path.join(publicDataDir, 'daily-stocks.json');
    fs.writeFileSync(publicOutputPath, JSON.stringify(output, null, 2));
    console.log(`📁 Also saved to: ${publicOutputPath}`);

    // Print summary
    console.log('\n📊 Summary:');
    console.log(`  • STRONG BUY: ${stocks.filter(s => s.rating === 'STRONG BUY').length}`);
    console.log(`  • BUY: ${stocks.filter(s => s.rating === 'BUY').length}`);
    console.log(`  • HOLD: ${stocks.filter(s => s.rating === 'HOLD').length}`);
    console.log(`  • Top Pick: ${stocks[0]?.symbol} (${stocks[0]?.score}/100)`);

  } catch (error) {
    console.error('❌ Error generating stock picks:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

export { generateStockPicks };
