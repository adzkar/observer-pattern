import Subscription from "./subscription.mjs";

(() => {
  const subscriptionId1 = Subscription.subscribe(
    "sayHello",
    (value, _, value3) => {
      console.log(value, " 1");
      console.log(value3());
    }
  );

  const subscriptionId2 = Subscription.subscribe(
    "sayHello",
    (value, value2) => {
      console.log(value, " 2");
      console.log(value2);
    }
  );

  Subscription.notify("sayHello", 123, 321, () => {
    return "hola";
  });

  Subscription.unsubscribe("sayHello", subscriptionId1);
  Subscription.unsubscribe("sayHello", subscriptionId2);
})();
