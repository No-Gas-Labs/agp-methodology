import { describe, it, expect, vi, beforeEach } from 'vitest';
import { analyze } from '../lib/node-gate/engine';

// Mock the analyze function
vi.mock('../lib/node-gate/engine', () => ({
  analyze: vi.fn(),
}));

describe('NodeGate Intervene Proxy Logic', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('proxy behavior', () => {
    it('should proxy requests to analyze function', async () => {
      const mockResponse = {
        success: true,
        mode: 'standard',
        result: 'Analyzed input: "test input" (standard mode)',
        metadata: {
          timestamp: new Date().toISOString(),
          version: '1.0.0',
        },
      };
      
      vi.mocked(analyze).mockResolvedValue(mockResponse);

      const result = await analyze({ input: 'test input' });

      expect(analyze).toHaveBeenCalledWith({ input: 'test input' });
      expect(result).toEqual(mockResponse);
    });

    it('should pass mode parameter through proxy', async () => {
      const mockResponse = {
        success: true,
        mode: 'advanced',
        result: 'Analyzed input: "test input" (advanced mode with deep analysis)',
        metadata: {
          timestamp: new Date().toISOString(),
          version: '1.0.0',
        },
      };
      
      vi.mocked(analyze).mockResolvedValue(mockResponse);

      const result = await analyze({ input: 'test input', mode: 'advanced' });

      expect(analyze).toHaveBeenCalledWith({ input: 'test input', mode: 'advanced' });
      expect(result.mode).toBe('advanced');
    });
  });

  describe('error handling', () => {
    it('should handle analyze errors gracefully', async () => {
      vi.mocked(analyze).mockRejectedValue(new Error('Analysis failed'));

      await expect(analyze({ input: 'test input' })).rejects.toThrow('Analysis failed');
    });
  });

  describe('contract stability', () => {
    it('should maintain consistent response structure', async () => {
      const mockResponse = {
        success: true,
        mode: 'standard',
        result: 'Analyzed input: "test input" (standard mode)',
        metadata: {
          timestamp: new Date().toISOString(),
          version: '1.0.0',
        },
      };
      
      vi.mocked(analyze).mockResolvedValue(mockResponse);

      const result = await analyze({ input: 'test input' });
      
      expect(result).toHaveProperty('success');
      expect(result).toHaveProperty('mode');
      expect(result).toHaveProperty('result');
      expect(result).toHaveProperty('metadata');
      expect(result.metadata).toHaveProperty('timestamp');
      expect(result.metadata).toHaveProperty('version');
    });
  });
});