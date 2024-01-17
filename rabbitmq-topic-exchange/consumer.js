const amqp = require("amqplib");
const exchangeName = "directMessage";
const logType = process.argv.slice(2)
// logtype =  info warnnig error
console.log(logType);
async function recieveMessage() {
  const connection = await amqp.connect("amqp://localhost:5672");
  const channel = await connection.createChannel();
  await channel.assertExchange(exchangeName, "direct");
  const assertedQueue = await channel.assertQueue("", { exclusive: true });
  for (const pattern of logType) {
      channel.bindQueue(assertedQueue.queue, exchangeName, pattern); 
  }
  channel.consume(assertedQueue.queue, (message) => {
    console.log(message.content.toString());
  });
}

recieveMessage();
