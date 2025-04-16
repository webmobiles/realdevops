class RetrySubscriberProxy {
  constructor(adapter, maxRetries = 1) {
    this.adapter = adapter;
    this.maxRetries = maxRetries;
  }

  // entityName, can be a topicName or queueName
  async subscribe(entityName,handlers, subscriptionName ) {
    let retryCount = 0;

    const wrappedHandlers = {
      ...handlers,
      errorHandler: async (error) => {
        if (retryCount < this.maxRetries) {
          retryCount++;
          console.log(`Retrying (${retryCount}/${this.maxRetries})...`);
          await delay(1000 * retryCount);
          await this.subscribe(entityName, handlers, subscriptionName);
        } else {
          await handlers.errorHandler(error);
        }
      },
    };

    return this.adapter.subscribe(entityName, wrappedHandlers, subscriptionName);

  }

  async close() {
    await this.adapter.close();
  }
}

module.exports = RetrySubscriberProxy;
