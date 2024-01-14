/**
 * The Structure would be seems like this:
 * {
 *      [event]: {
 *          [subscriptionId]: callBack
 *      }
 * }
 */

import { getRandomId } from "./randomId.mjs";

class SubscriptionClass {
  subscriptions = {};

  subscribe = (event, callBack) => {
    const subscriptionId = getRandomId();

    this.subscriptions[event] = {
      ...this.subscriptions[event],
      [subscriptionId]: callBack,
    };

    return subscriptionId;
  };

  unsubscribe = (event, subscriptionId) => {
    if (subscriptionId in this.subscriptions[event]) {
      delete this.subscriptions[event][subscriptionId];
    }
  };

  notify = (event, ...args) => {
    return new Promise((resolve, reject) => {
      try {
        const subscriptedEvents = this.subscriptions[event] || {};
        const subscriptionIds = Object.keys(subscriptedEvents);

        for (const subscriptionId of subscriptionIds) {
          const callBack = subscriptedEvents[subscriptionId];
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
