import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('🚀 Hello from Railway test!');
});



const PORT = process.env.PORT || 8080;
app.use('/ai', aiRoutes);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Running on port ${PORT}`);

  // 👇 Keeps the container alive by logging every 20s
  setInterval(() => {
    console.log('✅ Keep-alive ping from backend');
  }, 20000);
});
