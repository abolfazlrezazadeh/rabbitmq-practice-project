const amqp = require("amqplib");
let index = 0;
async function receiveFromProducer() {
  const queueName = "service1";
  const connection = await amqp.connect("amqp://localhost:5672");
  const channel = await connection.createChannel();
  await channel.assertQueue(queueName, { durable: true });
  channel.consume(queueName, (message) => {
    console.log(`${index} : `, message.content.toString());
    index++;
    channel.ack(message)
  // noAck = confirm requests that received and delete them from queue
})
}

receiveFromProducer();
