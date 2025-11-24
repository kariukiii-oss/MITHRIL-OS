import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import whatsappRoutes from './routes/whatsapp';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false })); // Twilio sends form-urlencoded
app.use(bodyParser.json());

app.use('/api/whatsapp', whatsappRoutes);

app.get('/', (req, res) => {
  res.send('Mithril-OS Backend is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
