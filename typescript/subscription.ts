/**
 * The Structure would be seems like this:
 * {
 *      [event]: {
 *          [subscriptionId]: callBack
 *      }
 * }
 */

import { getRandomId } from "./randomId";

type CallBackFn = (...args: any[]) => void;

interface CallbackSubscription {
  [subscriptionId: string]: CallBackFn;
}

interface SubscriptionType {
  [event: string]: CallbackSubscription;
}

class SubscriptionClass {
  subscriptions: SubscriptionType = {};

  subscribe = (event: string, callBack: CallBackFn): string => {
    const subscriptionId: string = getRandomId();

    this.subscriptions[event] = {
      ...this.subscriptions[event],
      [subscriptionId]: callBack,
    };

    return subscriptionId;
  };

  unsubscribe = (event: string, subscriptionId: string) => {
    if (subscriptionId in this.subscriptions[event]) {
      delete this.subscriptions[event][subscriptionId];
    }
  };

  notify = (event: string, ...args: any): Promise<void> => {
    return new Promise((resolve, reject) => {
      try {
        const subscriptedEvents: CallbackSubscription =
          this.subscriptions[event] || {};
        const subscriptionIds: string[] = Object.keys(subscriptedEvents);

        for (const subscriptionId of subscriptionIds) {
          const callBack: CallBackFn = subscriptedEvents[subscriptionId];
          callBack(...args);
        }

        resolve();
      } catch (e) {
        reject(e);
      }
    });
  };
}

const Subscription = new SubscriptionClass();

export default Subscription;
