import { NextRequest, NextResponse } from 'next/server';

// Mock negotiation database
const negotiations = new Map();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { product_id, target_price, max_rounds = 5, strategy = 'balanced' } = body;

    if (!product_id || !target_price) {
      return NextResponse.json(
        { error: 'product_id and target_price are required' }, 
        { status: 400 }
      );
    }

    // Generate negotiation ID
    const negotiation_id = `neg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Mock negotiation logic
    const startPrice = 399; // Mock starting price
    const minPrice = Math.max(target_price, startPrice * 0.7); // Seller's minimum
    const currentOffer = startPrice * 0.9; // First counter-offer
    
    const negotiationData = {
      id: negotiation_id,
      product_id,
      target_price,
      start_price: startPrice,
      current_offer: Math.round(currentOffer),
      min_price: Math.round(minPrice),
      max_rounds,
      strategy,
      rounds_completed: 1,
      status: 'in_progress',
      messages: [
        {
          sender: 'seller',
          text: `Hi! Listed price €${startPrice}.`,
          timestamp: new Date().toISOString()
        },
        {
          sender: 'jarvis',
          text: `Could you do €${target_price}? I see similar listings for less.`,
          timestamp: new Date().toISOString()
        },
        {
          sender: 'seller',
          text: `I can discount to €${Math.round(currentOffer)}, that's my best offer so far.`,
          timestamp: new Date().toISOString()
        }
      ],
      created_at: new Date().toISOString(),
      estimated_completion: new Date(Date.now() + 5 * 60 * 1000).toISOString() // 5 minutes
    };

    // Store negotiation (in production, this would be in a database)
    negotiations.set(negotiation_id, negotiationData);

    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 500));

    return NextResponse.json({
      negotiation_id,
      status: 'in_progress',
      current_offer: Math.round(currentOffer),
      rounds_completed: 1,
      estimated_completion: negotiationData.estimated_completion,
      strategy_used: strategy
    });

  } catch (error) {
    console.error('Bargain API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const negotiation_id = searchParams.get('id');

    if (!negotiation_id) {
      return NextResponse.json(
        { error: 'negotiation_id parameter is required' }, 
        { status: 400 }
      );
    }

    const negotiation = negotiations.get(negotiation_id);

    if (!negotiation) {
      return NextResponse.json(
        { error: 'Negotiation not found' }, 
        { status: 404 }
      );
    }

    // Simulate negotiation progress
    if (negotiation.status === 'in_progress' && negotiation.rounds_completed < negotiation.max_rounds) {
      const progress = negotiation.rounds_completed / negotiation.max_rounds;
      const finalOffer = Math.round(
        negotiation.start_price - (negotiation.start_price - negotiation.target_price) * progress
      );

      negotiation.current_offer = Math.max(finalOffer, negotiation.min_price);
      negotiation.rounds_completed += 1;

      if (negotiation.rounds_completed >= negotiation.max_rounds || 
          negotiation.current_offer <= negotiation.target_price * 1.05) {
        negotiation.status = 'completed';
        negotiation.final_price = negotiation.current_offer;
      }

      negotiations.set(negotiation_id, negotiation);
    }

    return NextResponse.json(negotiation);

  } catch (error) {
    console.error('Get negotiation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
} 