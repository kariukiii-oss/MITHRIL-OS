import express from 'express';
import { hashPhoneNumber } from '../utils/hash';
import { fetchAntugrowData } from '../services/antugrow';
import { saveReport } from '../services/supabase';
import MessagingResponse from 'twilio/lib/twiml/MessagingResponse';

const router = express.Router();

router.post('/', async (req, res) => {
    const { Body, From, Latitude, Longitude, MediaUrl0 } = req.body;

    console.log('Received message from:', From);

    const twiml = new MessagingResponse();

    if (!Latitude || !Longitude) {
        twiml.message('Please send a location with your report.');
        res.type('text/xml').send(twiml.toString());
        return;
    }

    try {
        const lat = parseFloat(Latitude);
        const lng = parseFloat(Longitude);
        const reporterHash = hashPhoneNumber(From);

        // Fetch Environmental Data
        const { ndvi, mi, ndmi } = await fetchAntugrowData(lat, lng);

        // Compute State
        let status: 'CRITICAL' | 'BAD' | 'OKAY' = 'OKAY';
        if (ndvi < 0.2 || mi < 0.2) {
            status = 'CRITICAL';
        } else if (ndvi < 0.4 || mi < 0.4) {
            status = 'BAD';
        }

        // Save to Supabase
        await saveReport({
            reporter_hash: reporterHash,
            message_text: Body || '',
            image_url: MediaUrl0 || null,
            latitude: lat,
            longitude: lng,
            ndvi,
            mi,
            ndmi,
            status,
            category: 'General' // Default for now
        });

        // Reply to User
        twiml.message(`Thank you. Report received.\nLocation: ${lat}, ${lng}\nStatus: ${status}\nNDVI: ${ndvi}`);
    } catch (error) {
        console.error('Error processing message:', error);
        twiml.message('An error occurred while processing your report. Please try again.');
    }

    res.type('text/xml').send(twiml.toString());
});

export default router;
