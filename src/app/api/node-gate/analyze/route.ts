import { NextRequest, NextResponse } from 'next/server';
import { analyze } from '@/lib/node-gate/engine';
import type { NodeGateInput } from '@/lib/node-gate/types';

/**
 * POST /api/node-gate/analyze
 * 
 * Main NodeGate analysis endpoint
 * 
 * Request body:
 * {
 *   input: string,
 *   mode?: 'standard' | 'advanced' | 'minimal'
 * }
 * 
 * Response:
 * {
 *   success: boolean,
 *   mode: string,
 *   result: string,
 *   metadata: {
 *     timestamp: string,
 *     version: string
 *   }
 * }
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Parse request body
    const body: NodeGateInput = await request.json();
    
    // Perform analysis
    const result = await analyze(body);
    
    // Return successful response
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    // Handle errors
    console.error('NodeGate analyze error:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    return NextResponse.json(
      {
        success: false,
        mode: 'standard',
        result: '',
        metadata: {
          timestamp: new Date().toISOString(),
          version: '1.0.0',
        },
        error: errorMessage,
      },
      { status: 400 }
    );
  }
}