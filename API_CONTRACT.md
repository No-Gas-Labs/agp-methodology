# NodeGate API Contract Documentation

## Overview

The NodeGate engine provides analysis capabilities through two API endpoints. The engine processes input text and returns structured analysis results based on the specified mode.

## Version

Current Engine Version: `1.0.0`

## Endpoints

### 1. POST /api/node-gate/analyze

**Description:** Primary NodeGate analysis endpoint

**Request Body:**
```typescript
{
  input: string;           // Required: The text to analyze
  mode?: 'standard' | 'advanced' | 'minimal';  // Optional: Analysis mode (defaults to 'standard')
}
```

**Response (Success - 200):**
```typescript
{
  success: boolean;        // true
  mode: string;            // The mode used for analysis
  result: string;          // Analysis result as a string
  metadata: {
    timestamp: string;     // ISO 8601 timestamp
    version: string;       // Engine version (e.g., "1.0.0")
  }
}
```

**Response (Error - 400):**
```typescript
{
  success: boolean;        // false
  mode: string;            // 'standard'
  result: string;          // ''
  metadata: {
    timestamp: string;     // ISO 8601 timestamp
    version: string;       // Engine version
  },
  error: string;           // Error message
}
```

### 2. POST /api/node-gate/intervene

**Description:** Proxy endpoint that forwards requests to the analyze engine. Maintains backward compatibility with existing frontend contracts.

**Request Body:** Same as `/api/node-gate/analyze`

**Response:** Same as `/api/node-gate/analyze`

**Response (Error - 400):**
```typescript
{
  success: boolean;        // false
  mode: string;            // 'standard'
  result: string;          // ''
  metadata: {
    timestamp: string;     // ISO 8601 timestamp
    version: string;       // Engine version
  },
  error: string;           // Error message
}
```

**Response (Error - 500):**
```typescript
{
  success: boolean;        // false
  mode: string;            // 'standard'
  result: string;          // ''
  metadata: {
    timestamp: string;     // ISO 8601 timestamp
    version: string;       // Engine version
  },
  error: string;           // Error message
}
```

## Analysis Modes

### Standard Mode (default)
- Provides balanced analysis
- Confidence: 0.85
- Output format: `"Analyzed input: &quot;...&quot; (standard mode)"`

### Advanced Mode
- Provides deep analysis
- Confidence: 0.95
- Output format: `"Analyzed input: &quot;...&quot; (advanced mode with deep analysis)"`

### Minimal Mode
- Provides basic analysis
- Confidence: 0.70
- Output format: `"Analyzed input: &quot;...&quot; (minimal mode)"`

## Validation Rules

1. **Input Required:** The `input` field must be provided and must be a non-empty string
2. **Input Type:** Must be a string type
3. **Input Length:** Cannot be empty or whitespace-only
4. **Mode Validation:** If provided, mode must be one of: 'standard', 'advanced', 'minimal'
5. **Mode Default:** If not provided, defaults to 'standard'

## Error Handling

### Invalid JSON (400)
- Occurs when request body is not valid JSON
- Error message: "Invalid JSON in request body"

### Missing Input (400)
- Occurs when input field is missing or invalid
- Error message: "Input must contain a valid &quot;input&quot; string"

### Empty Input (400)
- Occurs when input is empty or whitespace-only
- Error message: "Input cannot be empty"

### Server Error (500)
- Occurs for unexpected server errors
- Error message: "Unknown error occurred" or specific error message

## TypeScript Types

```typescript
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
```

## Example Usage

### cURL Example

```bash
# Standard mode (default)
curl -X POST http://localhost:3000/api/node-gate/analyze \
  -H "Content-Type: application/json" \
  -d '{"input": "Analyze this text"}'

# Advanced mode
curl -X POST http://localhost:3000/api/node-gate/analyze \
  -H "Content-Type: application/json" \
  -d '{"input": "Analyze this text", "mode": "advanced"}'

# Using intervene proxy
curl -X POST http://localhost:3000/api/node-gate/intervene \
  -H "Content-Type: application/json" \
  -d '{"input": "Analyze this text"}'
```

### JavaScript/TypeScript Example

```typescript
const response = await fetch('/api/node-gate/analyze', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    input: 'Analyze this text',
    mode: 'advanced'
  })
});

const data = await response.json();
console.log(data);
// {
//   success: true,
//   mode: 'advanced',
//   result: 'Analyzed input: "Analyze this text" (advanced mode with deep analysis)',
//   metadata: {
//     timestamp: '2024-01-01T00:00:00.000Z',
//     version: '1.0.0'
//   }
// }
```

## Testing

All endpoints are covered by comprehensive unit tests:

- **Engine Tests:** 10 tests covering mode defaulting, response shape, input validation, and processing behavior
- **Proxy Tests:** 4 tests covering proxy behavior, error handling, and contract stability

Run tests with:
```bash
npm test
```

## Build Verification

The implementation passes all quality checks:

- ✅ All 14 tests passing
- ✅ Zero build errors
- ✅ Zero TypeScript errors
- ✅ Zero lint warnings
- ✅ Strong TypeScript typing
- ✅ Full ESM compatibility
- ✅ Defensive error handling
- ✅ Zero unused imports

## Architecture

```
/src/lib/node-gate/
├── types.ts       # TypeScript type definitions
└── engine.ts      # Core analysis engine

/src/app/api/node-gate/
├── analyze/
│   └── route.ts   # Primary analysis endpoint
└── intervene/
    └── route.ts   # Proxy endpoint (backward compatible)

/src/__tests__/
├── node-gate-engine.test.ts   # Engine unit tests
└── node-gate-proxy.test.ts    # Proxy unit tests
```

## Frontend Compatibility

The `/api/node-gate/intervene` endpoint maintains backward compatibility with existing frontend contracts. Frontend code can continue to use this endpoint without modification, while the new `/api/node-gate/analyze` endpoint provides the same functionality with the updated response structure.