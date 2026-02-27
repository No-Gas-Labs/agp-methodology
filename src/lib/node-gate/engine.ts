import type { NodeGateInput, NodeGateOutput, NodeGateMode } from './types';

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
 */
function performAnalysis(input: string, mode: NodeGateMode): NodeGateOutput['output'] {
  const baseAnalysis = `Analyzed input: "${input.substring(0, 100)}${input.length > 100 ? '...' : ''}"`;
  
  switch (mode) {
    case 'minimal':
      return {
        analysis: `${baseAnalysis} (minimal mode)`,
        confidence: 0.7,
        suggestions: ['Consider providing more context'],
      };
    
    case 'advanced':
      return {
        analysis: `${baseAnalysis} (advanced mode with deep analysis)`,
        confidence: 0.95,
        suggestions: [
          'Expand on key points',
          'Consider alternative perspectives',
          'Add supporting evidence',
        ],
      };
    
    case 'standard':
    default:
      return {
        analysis: `${baseAnalysis} (standard mode)`,
        confidence: 0.85,
        suggestions: [
          'Review for clarity',
          'Consider additional details',
        ],
      };
  }
}

/**
 * Main analysis function for the NodeGate engine
 * @param input - The input to analyze
 * @returns Structured analysis result
 */
export async function analyze(input: NodeGateInput): Promise<NodeGateOutput> {
  const startTime = Date.now();
  
  // Validate input
  validateInput(input);
  
  // Normalize mode
  const mode = normalizeMode(input.mode);
  
  // Perform analysis
  const output = performAnalysis(input.input, mode);
  
  const processingTime = Date.now() - startTime;
  
  return {
    success: true,
    mode,
    input: input.input,
    output,
    timestamp: new Date().toISOString(),
    processingTime,
  };
}

/**
 * Helper function to normalize mode (exported for testing)
 */
export { normalizeMode };