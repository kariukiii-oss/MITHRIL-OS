MITHRIL-OS :One OS to monitor it all


THE PROBLEM:

Illegal logging and poaching in Kenya's vast forests (like the Mau Complex and Aberdares) are devastating ecosystems. Rangers are often reactive, relying on delayed reports and lacking real-time situational awareness. They are fighting a modern war with outdated tools.I believe that software can deliver this at a low cost to the authorities and relevant organizations.

While other software systems exists,they are either too complex or too tailored fora singular problem.This kills the flow and efficiency.

OUR SOLUTION:

Mithril-OS is a monitoring OS specifically designed to solve the problem addressed above. It is designed to be simple,cohesive and efficient. Our focus on a strong analytics platform modular to accomodate and analyze any stream of data ensures that we're a one-stop shop for any monitoring needs ranging from moisture indices to real-time reporting by citizens.

Mithril-OS is built to form a foundation meaning that it can be scaled up to support third party applications and services.


KEY FEATURES:

1. 🌑 Tactical Dark Mode ("The Lattice")
A custom-built UI design system optimized for high-contrast visibility.
-   Glassmorphism Panels: Floating overlays that maximize map visibility.
-   Neon Status Indicators: Instant visual feedback (🔴 Critical, 🟠 Warning, 🟢 Stable).
-   Data-Dense HUD: `JetBrains Mono` typography for rapid scanning of coordinates and indices.

 2. 🗺️ Interactive Command Map
-   Live Threat Visualization: Reports appear instantly as pulsing pins.
-   Watchlist Flags: Blue flags mark critical monitored zones (e.g., "Sector 4 - Mau Forest").
-   Ranger HUD: Click any flag or pin to open a floating Heads-Up Display with deep environmental analytics.

 3. 📱 WhatsApp Integration (Twilio)
-   Zero-Friction Reporting: Citizens just send a location pin on WhatsApp.
-   Auto-Geolocation: The system parses GPS data automatically.
-   Instant Feedback: The bot replies with the analyzed threat level of the area.

Tech stack

Frontend| Next.js 14 (App Router), TailwindCSS, Leaflet Maps, Lucide Icons 
Backend | Node.js, Express, TypeScript 
Database| Supabase (PostgreSQL + Realtime)
AI/Data | Antugrow API (NDVI/Satellite Data) 
Comms |Twilio (WhatsApp API) 
 
 Prerequisites
-   Node.js 18+
-   Supabase Project
-   Twilio Account
1. Navigate to directory.
   
cd mithril-os

 2. Backend Setup
    
cd backend
npm install
npm run dev


3. Frontend Setup 

cd frontend
npm install
npm run dev 

 4. Launch Mission Control
Open `http://localhost:3000` to access the Mithril-OS Command Interface.

Owner: MUGO KARIUKI MOSES
Built with ❤️ - 2025
