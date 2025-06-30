import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { 
      negotiation_id, 
      payment_method, 
      shipping_address,
      product_name,
      final_price,
      original_price 
    } = body;

    if (!negotiation_id || !payment_method || !shipping_address) {
      return NextResponse.json(
        { error: 'negotiation_id, payment_method, and shipping_address are required' }, 
        { status: 400 }
      );
    }

    // Generate order ID
    const order_id = `ord_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Mock NFT receipt hash (Algorand)
    const nft_receipt = `0x${Math.random().toString(16).substr(2, 40)}`;
    
    // Calculate savings
    const savings = original_price ? original_price - final_price : 0;
    
    // Mock order data
    const orderData = {
      order_id,
      negotiation_id,
      status: 'confirmed',
      final_price,
      original_price,
      savings,
      product_name,
      payment_method,
      shipping_address,
      nft_receipt,
      tracking_info: {
        carrier: 'DHL',
        tracking_number: `DHL${Math.random().toString().substr(2, 10)}`,
        estimated_delivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString() // 3 days
      },
      created_at: new Date().toISOString(),
      algorand_tx_hash: `TX${Math.random().toString(36).substr(2, 20).toUpperCase()}`
    };

    // Simulate payment processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock Stripe payment confirmation
    const paymentConfirmation = {
      payment_intent_id: `pi_${Math.random().toString(36).substr(2, 15)}`,
      status: 'succeeded',
      amount: final_price * 100, // Stripe uses cents
      currency: 'eur'
    };

    return NextResponse.json({
      ...orderData,
      payment_confirmation: paymentConfirmation,
      nft_explorer_url: `https://algoexplorer.io/tx/${orderData.algorand_tx_hash}`,
      success: true
    });

  } catch (error) {
    console.error('Checkout API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const order_id = searchParams.get('id');

    if (!order_id) {
      return NextResponse.json(
        { error: 'order_id parameter is required' }, 
        { status: 400 }
      );
    }

    // Mock order lookup
    const mockOrder = {
      order_id,
      status: 'confirmed',
      final_price: 319,
      original_price: 399,
      savings: 80,
      product_name: 'Sony WH-1000XM5',
      tracking_info: {
        carrier: 'DHL',
        tracking_number: `DHL${Math.random().toString().substr(2, 10)}`,
        status: 'in_transit',
        estimated_delivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString()
      },
      created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
    };

    return NextResponse.json(mockOrder);

  } catch (error) {
    console.error('Get order error:', error);
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
} 