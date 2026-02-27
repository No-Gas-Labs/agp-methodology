import { NextRequest, NextResponse } from 'next/server';
import { analyze } from '@/lib/node-gate/engine';
import type { NodeGateInput } from '@/lib/node-gate/types';

/**
 * POST /api/node-gate/intervene
 * 
 * Proxy endpoint that forwards requests to the analyze engine.
 * Maintains backward compatibility with existing frontend contracts.
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
 *   input: string,
 *   output: {
 *     analysis: string,
 *     confidence: number,
 *     suggestions: string[]
 *   },
 *   timestamp: string,
 *   processingTime: number
 * }
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Parse request body
    const body: NodeGateInput = await request.json();
    
    // Proxy to analyze function
    const result = await analyze(body);
    
    // Return successful response
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    // Handle JSON parsing errors
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid JSON in request body',
          timestamp: new Date().toISOString(),
        },
        { status: 400 }
      );
    }
    
    // Handle other errors
    console.error('NodeGate intervene error:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}