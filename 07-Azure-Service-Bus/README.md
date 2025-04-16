#  07  Azure Bus Services (Topics & Queues)

### Real Devops with Dave


## using JS to send and receive messages



- install  
   ```
   npm install
   ```
- run code
    ```
    cd ./servicebus-js
    ```

    Using Javascript Patterns separated in folders:

    - ./adapters
    - ./factories
    - ./proxies
    - ./services

  - update .env file  with the names of your objects:
    ```
    SERVICE_BUS_NAMESPACE=mybusnamespace1
    QUEUE_NAME=myqueue1
    TOPIC_NAME=mytopic1
    SUBSCRIPTION_NAME=mysubscription
    ```

    #### Using Queues


    - Send Messages to Queue
      
      ```
      node sendToQueue.js
      ```
    
    - Receive Messages from Queue

      ```
      node receiverFromQueue.js
      ```

    #### Using Topics

    - Send Messages to Topic
      ```
      node sendToTopic.js
      ```

    - Receive Messages from Topic
      ```
      node receiverFromTopic.js
      ```

## Concepts AMQP (RabbitMQ) vs Azure Service Bus
| AMQP Concept      | Azure Service Bus Equivalent        | Description                                              |
|-------------------|--------------------------------------|----------------------------------------------------------|
| Producer          | Sender / Client sending messages     | Sends messages to a queue or topic.                     |
| Consumer          | Receiver / Subscription client       | Receives and processes messages from queues/subscriptions. |
| Message           | Message                              | The data payload, includes body and properties.         |
| Queue             | Queue                                | Holds messages for processing (1:1 communication).       |
| Exchange          | Topic                                | Routes messages to subscriptions (pub/sub).              |
| Binding           | Subscription Filter                  | Filters which messages a subscription receives.          |
| Routing Key       | Message Properties + Filters         | Used to route messages within a topic.                   |

