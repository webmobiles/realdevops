
const subscriberFactory = require("./factories/subscriberFactory");
const receiverService = require("./services/receiverService");
const RetrySubscriberProxy = require("./proxies/retrySubscriberProxy");


const { namespace, queueName } = require("./loadenv");

async function main() {
  try {
    // Initialize through factory
    const adapter =
      subscriberFactory.createAzureServiceBusSubscriber(namespace);

    // Wrap with retry proxy
    const subscriber = new RetrySubscriberProxy(adapter);

    // Inject into service
    const senderService = new receiverService(subscriber);

    // Start listening
    await senderService.startListening(queueName);

    // Keep alive for 30 seconds
    await new Promise((resolve) => setTimeout(resolve, 30000));

    // Clean up
    await senderService.stopListening();
  } catch (err) {
    console.error("Error occurred:", err);
    process.exit(1);
  }
}

main();
