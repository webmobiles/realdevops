const senderAdapter = require("../adapters/senderAdapter");
const { DefaultAzureCredential } = require("@azure/identity");


class senderFactory {
  static createClientMessageBroker(namespace) {
    console.log("Factory Namespace  ", namespace);
    const credential = new DefaultAzureCredential();
    return new senderAdapter(`${namespace}.servicebus.windows.net`, credential);
  }
  getfullyQualifiedNamespace = () => {
    
  }
}

module.exports = senderFactory;
