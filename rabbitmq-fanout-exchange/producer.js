const amqp = require("amqplib");
const exchangeName = "logs";

async function sendMessage() {
  try {
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();
    await channel.assertExchange(exchangeName, "fanout", { durable: true });
    // when we use publish = its publishing message and not to save in queue 
    // otherwise when server is down its not send again messages
    channel.publish(
      exchangeName,
      /* routing key is generating random auto */
      "",
      Buffer.from("data from fanout type")
    );
    setTimeout(() => {
      connection.close();
      process.exit(0);
    });
  } catch (error) {
    console.log(error);
  }
}
sendMessage();
