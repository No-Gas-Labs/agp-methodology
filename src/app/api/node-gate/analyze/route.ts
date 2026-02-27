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
        error: errorMessage,
        timestamp: new Date().toISOString(),
      },
      { status: 400 }
    );
  }
}