const { DefaultAzureCredential } = require("@azure/identity");
const receiverAdapter = require("../adapters/receiverAdapter");

class subscriberFactory {
  static createAzureServiceBusSubscriber(namespace) {
    const credential = new DefaultAzureCredential();
    return new receiverAdapter(
      `${namespace}.servicebus.windows.net`,
      credential
    );
  }

  // Example for other messaging systems
  static createAwsSqsSubscriber() {
    /* ... */
  }
}

module.exports = subscriberFactory;
