import app from './src/app.js';

const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.json("App is working great 😁");
});
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server is started on port ${PORT}`);
});
