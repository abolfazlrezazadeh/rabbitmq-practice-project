const amqp = require("amqplib");
const exchangeName = "headersMessage";
async function recieveMessage() {
  const connection = await amqp.connect("amqp://localhost:5672");
  const channel = await connection.createChannel();
  await channel.assertExchange(exchangeName, "headers");
  const assertedQueue = await channel.assertQueue("", { exclusive: true });
  channel.bindQueue(assertedQueue.queue, exchangeName, "",{author: "abolfazl", product: "node.js","x-match" : "all"}); 
  channel.consume(assertedQueue.queue, (message) => {
    console.log(message.content.toString());
    console.log(message.properties.headers);
  });
}

recieveMessage();
