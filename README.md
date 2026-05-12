# PaymentGateway

Monorepo with 3 independent microservices that communicate over HTTP.

## Services

| Service | Port | Description |
|---|---|---|
| `create-payment` | 3000 | Handles payment creation |
| `company-status` | 3001 | Checks company and account status |
| `settle-payments` | 3002 | Processes payment settlement |

## Getting started

Each service is independent. Run each one in a separate terminal:

```bash
cd create-payment && npm run dev
cd company-status && npm run dev
cd settle-payments && npm run dev
```

## Endpoints

Every service exposes:

- `GET /health` — returns `{ service, status: "ok" }`
- `GET /ping` — calls `/health` on the other two services and reports connectivity

### Example /ping response

```json
{
  "service": "create-payment",
  "status": "ok",
  "connections": {
    "company-status": "ok",
    "settle-payments": "ok"
  }
}
```

## Environment variables

Copy `.env.example` to `.env` inside each service directory before running.
