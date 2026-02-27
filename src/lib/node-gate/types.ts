export interface NodeGateInput {
  input: string;
  mode?: string;
}

export interface NodeGateOutput {
  success: boolean;
  mode: string;
  input: string;
  output: {
    analysis: string;
    confidence: number;
    suggestions: string[];
  };
  timestamp: string;
  processingTime: number;
}

export type NodeGateMode = 'standard' | 'advanced' | 'minimal';