class receiverService {
  constructor(subscriber) {
    this.subscriber = subscriber;
    this.counter = 0;
  }

  // entityName, can be a topicName or queueName
  async startListening(entityName, subscriptionName) {
    const handlers = {
      messageHandler: async (message) => {
        console.log(
          `Received message ${this.counter}: ${message.body} ${message.applicationProperties.id}`
        );
        this.counter++;
        // Add your business logic here
      },
      errorHandler: async (error) => {
        console.error("Error occurred:", error);
        // Add error handling logic here
      },
    };

    this.subscription = await this.subscriber.subscribe(
      entityName,
      handlers,
      subscriptionName,
    );
  }

  async stopListening() {
    if (this.subscription) {
      await this.subscription.close();
    }
  }
}

module.exports = receiverService;