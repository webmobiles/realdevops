class senderService {
  constructor(messageQueue) {
    this.messageQueue = messageQueue;
  }

  // entityName, can be a topicName or queueName
  async sendMessages(entityName, messages) {
    await this.messageQueue.sendMessages(entityName, messages);
  }
}

module.exports = senderService;
