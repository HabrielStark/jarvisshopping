import { NextRequest, NextResponse } from 'next/server';

// Mock product database
const products = [
  { id: 'p1', name: 'iPhone 15 Pro 256GB', price: 1299, retailer: 'Amazon', category: 'electronics', negotiable: true },
  { id: 'p2', name: 'MacBook Air M3', price: 1499, retailer: 'MediaMarkt', category: 'electronics', negotiable: true },
  { id: 'p3', name: 'Sony WH-1000XM5', price: 399, retailer: 'eBay', category: 'electronics', negotiable: true },
  { id: 'p4', name: 'Samsung 4K Monitor', price: 599, retailer: 'Best Buy', category: 'electronics', negotiable: true },
  { id: 'p5', name: 'iPad Pro 11"', price: 899, retailer: 'Apple Store', category: 'electronics', negotiable: false },
  { id: 'p6', name: 'Nike Air Max 270', price: 149, retailer: 'Nike Store', category: 'fashion', negotiable: true },
  { id: 'p7', name: 'Dyson V15 Vacuum', price: 749, retailer: 'Amazon', category: 'home', negotiable: true },
  { id: 'p8', name: 'Canon EOS R6', price: 2499, retailer: 'B&H Photo', category: 'electronics', negotiable: true },
];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { query, category, max_price, retailers } = body;

    if (!query) {
      return NextResponse.json(
        { error: 'Query parameter is required' }, 
        { status: 400 }
      );
    }

    // Filter products based on search criteria
    let results = products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );

    if (category) {
      results = results.filter(product => product.category === category);
    }

    if (max_price) {
      results = results.filter(product => product.price <= max_price);
    }

    if (retailers && retailers.length > 0) {
      results = results.filter(product => 
        retailers.some((retailer: string) => 
          product.retailer.toLowerCase().includes(retailer.toLowerCase())
        )
      );
    }

    // Add mock URLs and additional data
    const enhancedResults = results.map(product => ({
      ...product,
      url: `https://${product.retailer.toLowerCase().replace(' ', '')}.com/product/${product.id}`,
      image: `/img/${product.name.toLowerCase().replace(/\s+/g, '-')}.jpg`,
      savings_potential: product.negotiable ? Math.floor(product.price * 0.15) : 0
    }));

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    return NextResponse.json({
      results: enhancedResults,
      total: enhancedResults.length,
      query,
      filters: { category, max_price, retailers }
    });

  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
} 