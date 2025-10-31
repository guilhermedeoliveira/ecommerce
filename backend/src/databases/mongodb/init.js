// Initialize MongoDB database
db = db.getSiblingDB('ecommerce_db');

// Create collections if needed
db.createCollection('users');
db.createCollection('sessions');
db.createCollection('logs');

// Create indexes
db.users.createIndex({ email: 1 }, { unique: true });
db.sessions.createIndex({ userId: 1 });
db.sessions.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Insert sample data or initial documents if needed
// db.users.insertOne({
//   email: 'admin@example.com',
//   name: 'Admin',
//   createdAt: new Date()
// });

print('MongoDB initialized successfully');

