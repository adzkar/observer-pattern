import Subscription from "./subscription";

(() => {
  const subscriptionId1: string = Subscription.subscribe(
    "sayHello",
    (value: any, _, value3: any) => {
      console.log(value, " 1");
      console.log(value3());
    }
  );

  const subscriptionId2: string = Subscription.subscribe(
    "sayHello",
    (value: any, value2: any) => {
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
