# Packages API Documentation

This document describes all the available REST API endpoints for the package management system.

## Base URL

```
http://localhost:3000
```

## API Endpoints

### 📦 Packages

#### Create Package

- **POST** `/packages`
- **Body:**
  ```json
  {
    "name": "Holiday Package Dubai"
  }
  ```

#### Get All Packages

- **GET** `/packages`
- **Response:** Array of packages with their relationships

#### Get Package by ID

- **GET** `/packages/:id`
- **Response:** Package with all related fares and installments

#### Update Package

- **PATCH** `/packages/:id`
- **Body:**
  ```json
  {
    "name": "Updated Package Name"
  }
  ```

#### Delete Package

- **DELETE** `/packages/:id`

#### Get Package Pricing (All Categories)

- **GET** `/packages/:packageId/slots/:slotId/pricing`
- **Description:** Get complete pricing information including fares and installments for all categories (Adult, Child, Infant)
- **Response:** Complete pricing breakdown with calculated totals
- **Example Response:**
  ```json
  {
    "packageId": 1,
    "slotId": 1,
    "packageName": "Dubai Adventure Package",
    "slotName": "Summer Slot 2025",
    "fares": {
      "adult": 2500.0,
      "child": 1500.0,
      "infant": 500.0
    },
    "installments": {
      "adult": {
        "firstInstallment": 1000.0,
        "firstInstallmentDueDate": "2025-03-01",
        "secondInstallment": 750.0,
        "secondInstallmentDueDate": "2025-04-01",
        "thirdInstallment": 750.0,
        "thirdInstallmentDueDate": "2025-05-01",
        "totalAmount": 2500.0
      },
      "child": {
        "firstInstallment": 600.0,
        "firstInstallmentDueDate": "2025-03-01",
        "secondInstallment": 450.0,
        "secondInstallmentDueDate": "2025-04-01",
        "thirdInstallment": 450.0,
        "thirdInstallmentDueDate": "2025-05-01",
        "totalAmount": 1500.0
      },
      "infant": null
    },
    "createdAt": "2025-08-06T12:00:00.000Z",
    "updatedAt": "2025-08-06T12:00:00.000Z"
  }
  ```

---

### 🎰 Slots

#### Create Slot

- **POST** `/slots`
- **Body:**
  ```json
  {
    "name": "Summer Slot 2025",
    "seatCount": 50,
    "startDate": "2025-06-01T00:00:00.000Z",
    "endDate": "2025-08-31T23:59:59.000Z"
  }
  ```

#### Get All Slots

- **GET** `/slots`

#### Get Slot by ID

- **GET** `/slots/:id`

#### Update Slot

- **PATCH** `/slots/:id`
- **Body:**
  ```json
  {
    "seatCount": 75,
    "startDate": "2025-06-15T00:00:00.000Z"
  }
  ```

#### Delete Slot

- **DELETE** `/slots/:id`

---

### 💰 Package Fares

#### Create Package Fare

- **POST** `/package-fares`
- **Body:**
  ```json
  {
    "packageId": 1,
    "slotId": 1,
    "adultFare": 2500.0,
    "childFare": 1500.0,
    "infantFare": 500.0
  }
  ```

#### Get All Package Fares

- **GET** `/package-fares`

#### Get Package Fare by Package & Slot ID

- **GET** `/package-fares/:packageId/:slotId`

#### Update Package Fare

- **PATCH** `/package-fares/:packageId/:slotId`
- **Body:**
  ```json
  {
    "adultFare": 2750.0,
    "childFare": 1650.0
  }
  ```

#### Delete Package Fare

- **DELETE** `/package-fares/:packageId/:slotId`

---

### 👨‍🦳 Adult Installments

#### Create Adult Installment

- **POST** `/adult-installments`
- **Body:**
  ```json
  {
    "packageId": 1,
    "slotId": 1,
    "firstInstallment": 1000.0,
    "firstInstallmentDueDate": "2025-03-01",
    "secondInstallment": 750.0,
    "secondInstallmentDueDate": "2025-04-01",
    "thirdInstallment": 750.0,
    "thirdInstallmentDueDate": "2025-05-01"
  }
  ```

#### Get All Adult Installments

- **GET** `/adult-installments`

#### Get Adult Installment by Package & Slot ID

- **GET** `/adult-installments/:packageId/:slotId`

#### Update Adult Installment

- **PATCH** `/adult-installments/:packageId/:slotId`

#### Delete Adult Installment

- **DELETE** `/adult-installments/:packageId/:slotId`

---

### 👶 Child Installments

#### Create Child Installment

- **POST** `/child-installments`
- **Body:**
  ```json
  {
    "packageId": 1,
    "slotId": 1,
    "firstInstallment": 600.0,
    "firstInstallmentDueDate": "2025-03-01",
    "secondInstallment": 450.0,
    "secondInstallmentDueDate": "2025-04-01",
    "thirdInstallment": 450.0,
    "thirdInstallmentDueDate": "2025-05-01"
  }
  ```

#### Get All Child Installments

- **GET** `/child-installments`

#### Get Child Installment by Package & Slot ID

- **GET** `/child-installments/:packageId/:slotId`

#### Update Child Installment

- **PATCH** `/child-installments/:packageId/:slotId`

#### Delete Child Installment

- **DELETE** `/child-installments/:packageId/:slotId`

---

### 🍼 Infant Installments

#### Create Infant Installment

- **POST** `/infant-installments`
- **Body:**
  ```json
  {
    "packageId": 1,
    "slotId": 1,
    "firstInstallment": 200.0,
    "firstInstallmentDueDate": "2025-03-01",
    "secondInstallment": 150.0,
    "secondInstallmentDueDate": "2025-04-01",
    "thirdInstallment": 150.0,
    "thirdInstallmentDueDate": "2025-05-01"
  }
  ```

#### Get All Infant Installments

- **GET** `/infant-installments`

#### Get Infant Installment by Package & Slot ID

- **GET** `/infant-installments/:packageId/:slotId`

#### Update Infant Installment

- **PATCH** `/infant-installments/:packageId/:slotId`

#### Delete Infant Installment

- **DELETE** `/infant-installments/:packageId/:slotId`

---

## Sample Usage with curl

### Create a complete package setup:

1. **Create a package:**

   ```bash
   curl -X POST http://localhost:3000/packages \
     -H "Content-Type: application/json" \
     -d '{"name": "Dubai Adventure Package"}'
   ```

2. **Create a slot:**

   ```bash
   curl -X POST http://localhost:3000/slots \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Summer 2025",
       "seatCount": 50,
       "startDate": "2025-06-01T00:00:00.000Z",
       "endDate": "2025-08-31T23:59:59.000Z"
     }'
   ```

3. **Create package fare:**

   ```bash
   curl -X POST http://localhost:3000/package-fares \
     -H "Content-Type: application/json" \
     -d '{
       "packageId": 1,
       "slotId": 1,
       "adultFare": 2500.00,
       "childFare": 1500.00,
       "infantFare": 500.00
     }'
   ```

4. **Get all packages with relationships:**

   ```bash
   curl http://localhost:3000/packages
   ```

5. **Get complete pricing information for package and slot:**
   ```bash
   curl http://localhost:3000/packages/1/slots/1/pricing
   ```

## Error Responses

All endpoints return appropriate HTTP status codes:

- `200` - Success
- `201` - Created
- `404` - Not Found
- `400` - Bad Request
- `500` - Internal Server Error

Error response format:

```json
{
  "statusCode": 404,
  "message": "Package with ID 999 not found",
  "error": "Not Found"
}
```
