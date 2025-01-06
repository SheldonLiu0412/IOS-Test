![Notepad4e Last Update](https://img.shields.io/eclipse-marketplace/last-update/notepad4e)

# iOS App Distribution Platform

A self-hosted platform for distributing iOS apps to internal testers and users. Built with Next.js.

## Features

- Host and distribute iOS apps (.ipa files) through enterprise or ad-hoc distribution
- Generate and serve manifest files (.plist) for iOS app installation
- Simple web interface for uploading and managing app builds
- Support for multiple app versions and build management
- Secure access control for app distribution

## Getting Started

### Prerequisites

- Node.js 16+ 
- Yarn package manager
- An iOS app archive (.ipa file) signed for enterprise or ad-hoc distribution

### Installation

1. Clone the repository:

```bash
git clone https://github.com/SheldonLiu0412/IOS-Test.git
```

2. Navigate to the project directory:

```bash
cd IOS-Test
```

3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

5. Access the platform at `http://localhost:3000`.

### Deployment

For production deployment, use the following command:

```bash
cd /IOS-Test
docker-compose up -d
```

### Important Notes

⚠️ Please note: The current Dockerfile configuration is only suitable for servers with dokploy service installed. If you need to deploy in other environments, the following adjustments to the Dockerfile are required:

- Remove dokploy-related configurations
- Configure Node.js runtime environment manually
- Modify application startup commands
- Configure appropriate network and volume settings

Please refer to the project documentation or contact maintainers for deployment configurations suitable for your environment.

### Customization Guide

1. Upload Required Files:
   - Place your `.ipa` files in the `/public/apps` directory
   - Store app icons (`.png`) in the `/public/icons` directory
   - Update manifest files (`.plist`) in the `/public/manifests` directory

2. Manifest Configuration:
   - Edit the `.plist` template in `/public/manifests`:

3. Modify `/app/page.tsx`:
   - Customize the app information





