const amqp = require("amqplib");
const exchangeName = "logs";

async function receiveMessage() {
  try {
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();
    await channel.assertExchange(exchangeName, "fanout", { durable: true });
    //generate queue name
    const assertedQueue = await channel.assertQueue(
      "",
      {
        exclusive: true,
      } /* when queue name empty its write it auto and uniqe */
    );
    console.log(`binding queue with queue name : ${assertedQueue.queue}`);
    channel.bindQueue(assertedQueue.queue /* queue name */, exchangeName, "");
    channel.consume(assertedQueue.queue, (msg) => {
      if (msg.content) {
        console.log(msg.content.toString());
        // confirm message received
        channel.ack(msg);
      }
    });
  } catch (error) {
    console.log(error);
  }
}
receiveMessage();
