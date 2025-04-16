/* tryAddMessage: 
     Attempts to add a message to the batch, ensuring that the size of the batch does not exceed its maximum.
     https://learn.microsoft.com/en-us/dotnet/api/azure.messaging.servicebus.servicebusmessagebatch.tryaddmessage?view=azure-dotnet


     First call:
       batch.tryAddMessage(message) tries to add the message to the current batch. If it fails, that means the batch is full, so it's sent off, and a new batch is started.
 
     Second call (after batch is reset):
       Now you attempt to add the same message to the new batch. If this fails again, it means the message is too large to fit even in an empty batch, so the code throws an error.


   */

const { ServiceBusClient } = require("@azure/service-bus");

class senderAdapter {
  constructor(connectionString, credential) {
    this.client = new ServiceBusClient(connectionString, credential);
  }

  async sendMessages(entityName, messages) {
    const sender = this.client.createSender(entityName);
    let batch = await sender.createMessageBatch();

    for (const message of messages) {
      if (!batch.tryAddMessage(message)) {
        await sender.sendMessages(batch);
        batch = await sender.createMessageBatch();
        if (!batch.tryAddMessage(message)) {
          throw new Error("Message too large for batch");
        }
      }
    }

    await sender.sendMessages(batch);
    await sender.close();
  }

  async close() {
    await this.client.close();
  }
}

module.exports = senderAdapter;
