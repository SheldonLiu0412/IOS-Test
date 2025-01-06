import { Suspense } from 'react';
import AppCard from "./AppCard";
import StatusChecker from './StatusChecker';

type App = {
  id: string;
  name: string;
  description: string;
  version: string;
  updateDate: string;
  iconUrl: string;
  ipaUrl: string;
  manifestUrl?: string;
  detailsUrl?: string;
};

const apps: App[] = [
  {
    id: "demo-app",
    name: "Demo App",
    description: "A demo application",
    version: "1.0.0",
    updateDate: "2024年1月",
    iconUrl: "/apps/yourapp.png",
    ipaUrl: "/apps/yourapp.ipa",
    manifestUrl: "/manifests/yourapp.plist",
    detailsUrl: "https://example.com"
  },
];

console.log('Application resources:', apps.map(app => ({
  id: app.id,
  iconUrl: app.iconUrl,
  ipaUrl: app.ipaUrl,
  manifestUrl: app.manifestUrl
})));

const GITHUB_URL = "https://github.com/SheldonLiu0412/IOS-Test";
const DEVELOPER_URL = "https://snailsshell.com";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:py-24">
        <div className="text-center mb-16">
          <div className="flex justify-center items-center gap-4 mb-4">
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
              IPA Center
            </h1>
            <div className="flex gap-3">
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              </a>
              <a
                href={DEVELOPER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="mb-4">
            <Suspense fallback={null}>
              <StatusChecker />
            </Suspense>
          </div>

          <p className="text-gray-600 dark:text-gray-300">
            Get the latest versions of our applications here
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {apps.map((app) => (
            <AppCard key={app.id} app={app} />
          ))}
        </div>

        <div className="mt-20">
          <h2 className="text-2xl font-semibold mb-6 text-center">Installation Guide</h2>
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-6">
              <h3 className="font-medium text-lg mb-4">iOS Device Installation</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">One-Click Install with Safari</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    1. Open this page in Safari browser<br/>
                    2. Click "Install App" button<br/>
                    3. Click "Install" in the confirmation popup
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Other Browsers</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Please open this page in Safari browser, or download the IPA file to install using other tools
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-6">
              <h3 className="font-medium text-lg mb-4">Alternative Installation Methods</h3>
              <div className="space-y-2">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  After downloading the IPA file, you can install using these tools:
                </p>
                <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <li>AltStore - For personal developer accounts</li>
                  <li>Sideloadly - Supports various signing methods</li>
                  <li>TrollStore - For jailbroken devices</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
