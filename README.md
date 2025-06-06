# Doom 🕹️💬

**Live Site**: [doom-ashy-nu.vercel.app](https://doom-ashy-nu.vercel.app/)  
**Repo**: [github.com/Skpanda0/Doom](https://github.com/Skpanda0/Doom)

Doom is a minimal and modern video conferencing web app, inspired by platforms like Zoom and Google Meet. With one-click room creation and real-time video/audio calling, it's designed for simplicity, speed, and reliability.Using stream for End-to-end encryption video audio call and prebulit component and styling. 

## ✨ Features

- ✅ Create or join a meeting instantly via a unique URL
- 🎥 Real-time video and audio communication
- 🚪 Secure, peer-to-peer connections (via [Stream](https://getstream.io/))
- ⚡ Fast, serverless deployment (via Vercel)
- 🧼 Clean, responsive UI for desktop and mobile

## 🧱 Tech Stack

- **Next.js** – App framework (App Router)
- **React** – UI library
- **Clerk** – Authentication
- **Stream** – Peer-to-peer video/audio
- **Tailwind CSS** – Styling
- **Vercel** – Deployment

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18
- Clerk API keys
- Stream API keys

### 1. Clone the repository

```bash
git clone https://github.com/Skpanda0/Doom.git
cd Doom
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set environment variables

- Create a .env.local file in the root:

```bash
- NEXT_PUBLIC_BASE_URL=Your app URL

- NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=Your clerk public key

- CLERK_SECRET_KEY=your clerk secret key

- NEXT_PUBLIC_CLERK_SIGN_IN_URL=Your clerk signIn URL

- NEXT_PUBLIC_CLERK_SIGN_UP_URL=Your clerk signUp URL

- NEXT_PUBLIC_STREAM_API_KEY=Your Stream API key

- STREAM_SECRET_KEY=Your stream secret key
```

### 4. Run locally

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## 📦 Deployment

This app is optimized for deployment on [Vercel](https://vercel.com/home):

1.  Push the repo to GitHub

2.  Import into Vercel

3.  Add environment variables

4.  Deploy 🚀

## 💡 Future Improvements

- 💬 In-call chat & screen sharing (For mobile)

- 📝 Meeting notes or transcripts

- 📱 Enhanced mobile experience

## 🤝 Contributing

Contributions are welcome! Feel free to fork the repo and submit a pull request.