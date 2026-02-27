import { describe, it, expect } from 'vitest';
import { analyze } from '../lib/node-gate/engine';

describe('NodeGate Engine', () => {
  describe('mode defaulting', () => {
    it('should default to "standard" mode when mode is not provided', async () => {
      const result = await analyze({ input: 'test input' });
      expect(result.mode).toBe('standard');
    });

    it('should use provided mode when specified', async () => {
      const result = await analyze({ input: 'test input', mode: 'advanced' });
      expect(result.mode).toBe('advanced');
    });
  });

  describe('response shape', () => {
    it('should return structured JSON with required fields', async () => {
      const result = await analyze({ input: 'test input' });
      
      expect(result).toHaveProperty('success');
      expect(result).toHaveProperty('mode');
      expect(result).toHaveProperty('input');
      expect(result).toHaveProperty('output');
      expect(result).toHaveProperty('timestamp');
      expect(result).toHaveProperty('processingTime');
    });

    it('should have correct types for all fields', async () => {
      const result = await analyze({ input: 'test input' });
      
      expect(typeof result.success).toBe('boolean');
      expect(typeof result.mode).toBe('string');
      expect(typeof result.input).toBe('string');
      expect(typeof result.output).toBe('object');
      expect(typeof result.timestamp).toBe('string');
      expect(typeof result.processingTime).toBe('number');
    });
  });

  describe('input validation', () => {
    it('should reject empty input', async () => {
      await expect(analyze({ input: '' })).rejects.toThrow();
    });

    it('should reject missing input', async () => {
      await expect(analyze({} as any)).rejects.toThrow();
    });

    it('should accept valid input', async () => {
      const result = await analyze({ input: 'valid input' });
      expect(result.success).toBe(true);
    });
  });

  describe('processing behavior', () => {
    it('should include processing time in response', async () => {
      const result = await analyze({ input: 'test input' });
      expect(result.processingTime).toBeGreaterThanOrEqual(0);
    });

    it('should include ISO timestamp', async () => {
      const result = await analyze({ input: 'test input' });
      expect(() => new Date(result.timestamp)).not.toThrow();
    });
  });
});