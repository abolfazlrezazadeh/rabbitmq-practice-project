const amqp = require("amqplib");
const exchangeName = "direct";

async function sendMessage() {
  const connection = await amqp.connect("amqp://localhost:5672");
  const channel = await connection.createChannel();
  await channel.assertExchange(exchangeName, "direct" /*,{durable : true}*/);
  channel.publish(exchangeNamem, "error", Buffer.from("hello "));
  setTimeout(() => {
    process.exit(0);
  });
}

sendMessage();
