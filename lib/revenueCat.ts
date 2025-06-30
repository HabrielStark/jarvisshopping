// Mock RevenueCat integration for subscription management

export interface Subscription {
  id: string;
  plan: 'free' | 'pro' | 'team';
  status: 'active' | 'expired' | 'cancelled';
  current_period_start: string;
  current_period_end: string;
  price: number;
  currency: string;
}

export interface PurchaseResult {
  success: boolean;
  subscription?: Subscription;
  error?: string;
}

// Mock subscription data storage
const subscriptions = new Map<string, Subscription>();

export const purchase = async (plan: 'pro' | 'team', userId: string): Promise<PurchaseResult> => {
  try {
    // Simulate RevenueCat API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const prices = {
      pro: 7,
      team: 15
    };

    const subscription: Subscription = {
      id: `sub_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      plan,
      status: 'active',
      current_period_start: new Date().toISOString(),
      current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
      price: prices[plan],
      currency: 'EUR'
    };

    // Store subscription (in production, this would be handled by RevenueCat)
    subscriptions.set(userId, subscription);

    return {
      success: true,
      subscription
    };

  } catch (error) {
    console.error('Purchase error:', error);
    return {
      success: false,
      error: 'Failed to process subscription'
    };
  }
};

export const getSubscription = async (userId: string): Promise<Subscription | null> => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    const subscription = subscriptions.get(userId);
    
    // Check if subscription is still valid
    if (subscription && new Date(subscription.current_period_end) > new Date()) {
      return subscription;
    }

    return null;
  } catch (error) {
    console.error('Get subscription error:', error);
    return null;
  }
};

export const cancelSubscription = async (userId: string): Promise<boolean> => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const subscription = subscriptions.get(userId);
    if (subscription) {
      subscription.status = 'cancelled';
      subscriptions.set(userId, subscription);
      return true;
    }

    return false;
  } catch (error) {
    console.error('Cancel subscription error:', error);
    return false;
  }
};

export const restoreSubscription = async (userId: string): Promise<Subscription | null> => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // In a real app, this would check with RevenueCat for valid purchases
    const subscription = subscriptions.get(userId);
    
    if (subscription && subscription.status === 'cancelled') {
      subscription.status = 'active';
      subscriptions.set(userId, subscription);
      return subscription;
    }

    return null;
  } catch (error) {
    console.error('Restore subscription error:', error);
    return null;
  }
}; 