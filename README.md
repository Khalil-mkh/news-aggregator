# News Aggregator

A modern web application that aggregates news from various sources into a single, user-friendly interface.

## Features

- Real-time news updates
- Customizable news categories
- Responsive design
- Docker support

## Prerequisites

- Node.js 18 or higher
- npm or yarn
- Docker (optional)

## Setup

### Local Development

1. Clone the repository:

```bash
git clone <your-repository-url>
cd news-aggregator
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

### Docker Deployment

1. Build the Docker image:

```bash
docker build -t news-aggregator .
```

2. Run the container:

```bash
docker run -p 3000:3000 news-aggregator
```

The application will be available at `http://localhost:3000`

### ⚠️ Note: API Key Handling

For this test challenge, API keys are stored as environment variables (`.env`) and directly exposed in the frontend. This approach is **not recommended for production**, as it can lead to security risks.
