const senderFactory = require("./factories/senderFactory");
const senderService = require("./services/senderService");

const { namespace, queueName } = require("./loadenv");

const getRandomInt = (max) =>   Math.floor(Math.random() * max);
 
async function main() {
  // Initialize the adapter via factory
  const messageQueue =
    senderFactory.createClientMessageBroker(namespace);

  // Inject the adapter into the service
  const senderServiceInstance = new senderService(messageQueue);

  const messages = [
    { body: "Order", applicationProperties: { id: getRandomInt(1000) } },
    { body: "Order", applicationProperties: { id: getRandomInt(1000) } },
  ];

  try {
    await senderServiceInstance.sendMessages(queueName, messages);
    console.log(`Messages sent to queue: ${queueName} successfully:`);
    messages.map((m, n) => console.log(n, m.body, m.applicationProperties.id));
  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  } finally {
    await messageQueue.close();
  }
}

main();
