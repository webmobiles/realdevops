const { ServiceBusClient, delay } = require("@azure/service-bus");

class receiverAdapter {
  constructor(connectionString, credential) {
    this.client = new ServiceBusClient(connectionString, credential);
  }

  // entityName, can be a topicName or queueName
  async subscribe(entityName, handlers, subscriptionName ) {
    const receiver = this.client.createReceiver(entityName, subscriptionName);

    const subscription = receiver.subscribe({
      processMessage: handlers.messageHandler,
      processError: handlers.errorHandler,
    });

    return {
      close: async () => {
        subscription.close();
        await receiver.close();
      },
      wait: async (ms) => delay(ms),
    };
  }

  async close() {
    await this.client.close();
  }
}

module.exports = receiverAdapter;
