require("dotenv").config();

const namespace = `${process.env.SERVICE_BUS_NAMESPACE}`;

const queueName = `${process.env.QUEUE_NAME}`;

const topicName = `${process.env.TOPIC_NAME}`;

const subscriptionName = `${process.env.SUBSCRIPTION_NAME}`;

 
 

module.exports = {
  namespace,
  queueName,
  topicName,
  subscriptionName,
};
