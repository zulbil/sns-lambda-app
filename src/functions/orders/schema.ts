export default {
  type: "object",
  properties: {
    name: { type: 'string' },
    status: { type: 'string'},
    price: { type: 'number' },
    phone_number: { type: 'string' },
    email: { type: 'string' }
  },
  required: ['name', 'price', 'phone_number']
} as const;
