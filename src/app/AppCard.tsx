"use client";

import Image from "next/image";

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

export default function AppCard({ app }: { app: App }) {
  const handleInstall = async () => {
    const isMobile = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    const isIOSChrome = isMobile && /CriOS/i.test(navigator.userAgent);
    const isSafari = /Safari/i.test(navigator.userAgent) && !/Chrome/i.test(navigator.userAgent);
    
    console.log('🔍 Installation environment:', {
      isMobile,
      isIOSChrome,
      isSafari,
      userAgent: navigator.userAgent,
      manifestUrl: app.manifestUrl,
      ipaUrl: app.ipaUrl
    });

    if (isMobile && !isIOSChrome && app.manifestUrl) {
      try {
        const fullManifestUrl = `https://your.domain.com${app.manifestUrl}`;
        console.log('📝 Attempting to fetch manifest:', {
          originalUrl: app.manifestUrl,
          fullUrl: fullManifestUrl
        });

        const manifestCheck = await fetch(app.manifestUrl);
        console.log('📋 Manifest check response:', {
          ok: manifestCheck.ok,
          status: manifestCheck.status,
          statusText: manifestCheck.statusText,
          contentType: manifestCheck.headers.get('content-type'),
          headers: Object.fromEntries(manifestCheck.headers),
        });

        if (!manifestCheck.ok) {
          const errorText = await manifestCheck.text();
          console.error('❌ Manifest access error:', {
            status: manifestCheck.status,
            statusText: manifestCheck.statusText,
            body: errorText,
            headers: Object.fromEntries(manifestCheck.headers)
          });
          alert('Installation file is temporarily unavailable, please try again later');
          return;
        }

        const manifestContent = await manifestCheck.text();
        console.log('📄 Manifest content preview:', {
          length: manifestContent.length,
          preview: manifestContent.substring(0, 500),
          containsIPAUrl: manifestContent.includes(app.ipaUrl),
          containsBundleIdentifier: manifestContent.includes('bundle-identifier')
        });

        if (!manifestContent.includes('software-package') || 
            !manifestContent.includes('bundle-identifier')) {
          console.error('❌ Invalid manifest format:', {
            hasSoftwarePackage: manifestContent.includes('software-package'),
            hasBundleId: manifestContent.includes('bundle-identifier'),
            contentLength: manifestContent.length
          });
          alert('Invalid manifest format');
          return;
        }

        const installUrl = `itms-services://?action=download-manifest&url=${encodeURIComponent(fullManifestUrl)}`;
        console.log('🚀 Redirecting to install URL:', {
          installUrl,
          encodedManifestUrl: encodeURIComponent(fullManifestUrl)
        });
        
        setTimeout(() => {
          console.log('⏳ Initiating installation redirect...');
          window.location.href = installUrl;
          
          setTimeout(() => {
            console.log('✅ Post-redirect status check');
            if (window.location.href === installUrl) {
              console.log('⚠️ Redirect might have failed - URL unchanged');
            }
          }, 500);
        }, 100);

        try {
          const ipaCheck = await fetch(app.ipaUrl, { method: 'HEAD' });
          console.log('📦 IPA file check:', {
            status: ipaCheck.status,
            contentType: ipaCheck.headers.get('content-type'),
            contentLength: ipaCheck.headers.get('content-length')
          });
          
          if (!ipaCheck.ok) {
            throw new Error(`IPA file not accessible: ${ipaCheck.status}`);
          }
        } catch (error) {
          console.error('❌ IPA file error:', error);
          alert('IPA file is not accessible');
          return;
        }

      } catch (error) {
        console.error('💥 Installation error:', {
          error,
          manifestUrl: app.manifestUrl,
          errorName: error instanceof Error ? error.name : 'Unknown',
          errorMessage: error instanceof Error ? error.message : String(error),
          stack: error instanceof Error ? error.stack : undefined
        });
        alert('An error occurred during installation, please try again later');
      }
    } else {
      console.log('📦 Downloading IPA directly:', {
        reason: {
          notMobile: !isMobile,
          isChrome: isIOSChrome,
          noManifest: !app.manifestUrl
        },
        ipaUrl: app.ipaUrl
      });
      window.location.href = app.ipaUrl;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 transition-transform hover:scale-[1.02] flex flex-col h-full">
      <div className="flex items-start space-x-4">
        <Image
          src={app.iconUrl}
          alt={`${app.name} icon`}
          width={80}
          height={80}
          className="rounded-xl shadow-md flex-shrink-0"
        />
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-1">{app.name}</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 min-h-[40px]">
            {app.description}
          </p>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Version {app.version} • Updated on {app.updateDate}
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="mt-auto pt-6 space-y-3">
        <button
          onClick={handleInstall}
          className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md transform transition-all duration-200 flex items-center justify-center space-x-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          <span>Install</span>
        </button>
        
        <button
          onClick={() => window.open(app.detailsUrl || `https://your.domain.com/apps/${app.id}`, '_blank')}
          className="w-full py-3 px-4 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-xl transition-colors text-gray-700 dark:text-gray-200"
        >
          Details
        </button>
      </div>
    </div>
  );
} 