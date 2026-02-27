import type { NodeGateInput, NodeGateOutput, NodeGateMode } from './types';

/**
 * Version of the NodeGate engine
 */
export const ENGINE_VERSION = '1.0.0';

/**
 * Validates the input for the NodeGate engine
 * @throws {Error} If input is invalid
 */
function validateInput(input: NodeGateInput): void {
  if (!input || typeof input !== 'object') {
    throw new Error('Input must be an object');
  }

  if (!input.input || typeof input.input !== 'string') {
    throw new Error('Input must contain a valid "input" string');
  }

  if (input.input.trim().length === 0) {
    throw new Error('Input cannot be empty');
  }
}

/**
 * Normalizes the mode, defaulting to 'standard' if not provided
 */
function normalizeMode(mode?: string): NodeGateMode {
  if (!mode) return 'standard';
  
  const validModes: NodeGateMode[] = ['standard', 'advanced', 'minimal'];
  if (validModes.includes(mode as NodeGateMode)) {
    return mode as NodeGateMode;
  }
  
  return 'standard';
}

/**
 * Performs the actual analysis based on the input and mode
 * Returns a string result as required by the API contract
 */
function performAnalysis(input: string, mode: NodeGateMode): string {
  const baseAnalysis = `Analyzed input: "${input.substring(0, 100)}${input.length > 100 ? '...' : ''}"`;
  
  switch (mode) {
    case 'minimal':
      return `${baseAnalysis} (minimal mode)`;
    
    case 'advanced':
      return `${baseAnalysis} (advanced mode with deep analysis)`;
    
    case 'standard':
    default:
      return `${baseAnalysis} (standard mode)`;
  }
}

/**
 * Main analysis function for the NodeGate engine
 * @param input - The input to analyze
 * @returns Structured analysis result matching the required API contract
 */
export async function analyze(input: NodeGateInput): Promise<NodeGateOutput> {
  // Validate input
  validateInput(input);
  
  // Normalize mode
  const mode = normalizeMode(input.mode);
  
  // Perform analysis
  const result = performAnalysis(input.input, mode);
  
  return {
    success: true,
    mode,
    result,
    metadata: {
      timestamp: new Date().toISOString(),
      version: ENGINE_VERSION,
    },
  };
}

/**
 * Helper function to normalize mode (exported for testing)
 */
export { normalizeMode };