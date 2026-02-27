export interface NodeGateInput {
  input: string;
  mode?: string;
}

export interface NodeGateMetadata {
  timestamp: string;
  version: string;
}

export interface NodeGateOutput {
  success: boolean;
  mode: string;
  result: string;
  metadata: NodeGateMetadata;
}

export type NodeGateMode = 'standard' | 'advanced' | 'minimal';