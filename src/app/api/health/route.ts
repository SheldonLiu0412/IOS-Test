import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Check if manifest file is accessible
    const manifestUrl = 'https://your.domain.com/manifests/yourapp.plist';
    const manifestRes = await fetch(manifestUrl);
    
    if (!manifestRes.ok) {
      return NextResponse.json({
        status: 'error',
        message: 'Manifest file access failed',
        details: {
          status: manifestRes.status,
          statusText: manifestRes.statusText,
          headers: Object.fromEntries(manifestRes.headers)
        }
      });
    }

    return NextResponse.json({
      status: 'ok',
      message: 'Service is running normally',
      details: {
        manifest: 'accessible',
        contentType: manifestRes.headers.get('content-type')
      }
    });
  } catch (error) {
    return NextResponse.json({
      status: 'error',
      message: 'Health check failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
} 