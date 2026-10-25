import test, { before, after } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import app from '../src/app.js';
import User from '../src/models/User.js';
import Project from '../src/models/Project.js';
import Inquiry from '../src/models/Inquiry.js';

let mongoServer;
let adminToken;
let clientToken;
let clientUser;
let createdProjectId;
let createdInquiryRef;
let createdInquiryId;

before(async () => {
  process.env.NODE_ENV = 'test';
  process.env.JWT_SECRET = 'test_secret_for_unit_tests_32_characters_minimum';
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);

  // Setup an Admin user
  const admin = await User.create({
    name: 'Test Administrator',
    email: 'admin.test@primewebstudio.com',
    password: 'AdminPassword123!',
    role: 'admin',
  });

  // Login admin to obtain token
  const res = await request(app)
    .post('/api/auth/login')
    .send({
      email: 'admin.test@primewebstudio.com',
      password: 'AdminPassword123!',
    });
  adminToken = res.body.token;
});

after(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

test('1. Client Registration — Success', async () => {
  const res = await request(app)
    .post('/api/auth/register')
    .send({
      name: 'Client User One',
      email: 'client1@example.com',
      password: 'ClientPassword123!',
      phone: '+91 9876543210',
      company: 'Client Co',
    });

  assert.strictEqual(res.status, 201);
  assert.strictEqual(res.body.success, true);
  assert.strictEqual(res.body.data.user.role, 'client');
  clientToken = res.body.token;
  clientUser = res.body.data.user;
});

test('2. Client Registration — Duplicate Account Prevention', async () => {
  const res = await request(app)
    .post('/api/auth/register')
    .send({
      name: 'Duplicate Client',
      email: 'client1@example.com',
      password: 'AnotherPassword123!',
    });

  assert.strictEqual(res.status, 409);
  assert.strictEqual(res.body.success, false);
});

test('3. Authentication — Invalid Credentials', async () => {
  const res = await request(app)
    .post('/api/auth/login')
    .send({
      email: 'client1@example.com',
      password: 'WrongPassword!',
    });

  assert.strictEqual(res.status, 401);
  assert.strictEqual(res.body.success, false);
});

test('4. Authentication — Valid Login & Token', async () => {
  const res = await request(app)
    .post('/api/auth/login')
    .send({
      email: 'client1@example.com',
      password: 'ClientPassword123!',
    });

  assert.strictEqual(res.status, 200);
  assert.strictEqual(res.body.success, true);
  assert.ok(res.body.token);
});

test('5. Authentication — Logout', async () => {
  const res = await request(app).post('/api/auth/logout');
  assert.strictEqual(res.status, 200);
  assert.strictEqual(res.body.success, true);
});

test('6. RBAC — Protected Admin Route (Unauthorized Without Token)', async () => {
  const res = await request(app).get('/api/stats/dashboard');
  assert.strictEqual(res.status, 401);
});

test('7. RBAC — Unauthorized Client Access to Admin Route', async () => {
  const res = await request(app)
    .get('/api/stats/dashboard')
    .set('Authorization', `Bearer ${clientToken}`);

  assert.strictEqual(res.status, 403);
});

test('8. RBAC — Authorized Admin Access to Admin Route', async () => {
  const res = await request(app)
    .get('/api/stats/dashboard')
    .set('Authorization', `Bearer ${adminToken}`);

  assert.strictEqual(res.status, 200);
  assert.strictEqual(res.body.success, true);
  assert.ok(res.body.data.counts);
});

test('9. Project CRUD — Admin Creates Project', async () => {
  const res = await request(app)
    .post('/api/projects')
    .set('Authorization', `Bearer ${adminToken}`)
    .send({
      title: 'Automated Test Project',
      description: 'A comprehensive project created via test suite.',
      shortDescription: 'Test project short description',
      category: 'Web Development',
      technologies: ['React', 'Node.js', 'MongoDB'],
      isPublished: true,
      featured: true,
    });

  assert.strictEqual(res.status, 201);
  assert.strictEqual(res.body.success, true);
  createdProjectId = res.body.data.project._id;
  assert.ok(createdProjectId);
});

test('10. Project CRUD — Public Reads Project by Slug', async () => {
  const res = await request(app).get('/api/projects/automated-test-project');
  assert.strictEqual(res.status, 200);
  assert.strictEqual(res.body.data.project.title, 'Automated Test Project');
});

test('11. Project CRUD — Admin Updates Project', async () => {
  const res = await request(app)
    .put(`/api/projects/${createdProjectId}`)
    .set('Authorization', `Bearer ${adminToken}`)
    .send({
      shortDescription: 'Updated short description',
    });

  assert.strictEqual(res.status, 200);
  assert.strictEqual(res.body.data.project.shortDescription, 'Updated short description');
});

test('12. Inquiry — Public Submission & Reference Number Generation', async () => {
  const res = await request(app)
    .post('/api/inquiries')
    .set('Authorization', `Bearer ${clientToken}`)
    .send({
      fullName: 'Client User One',
      email: 'client1@example.com',
      serviceRequired: 'Full-Stack MERN Development',
      projectDescription: 'We require a complete business portal with authentication.',
      estimatedBudget: '₹15,000 - ₹30,000',
      projectTimeline: 'Within 1 month',
      preferredContactMethod: 'Email',
    });

  assert.strictEqual(res.status, 201);
  assert.strictEqual(res.body.success, true);
  assert.ok(res.body.data.referenceNumber.startsWith('PWS-'));
  createdInquiryRef = res.body.data.referenceNumber;
  createdInquiryId = res.body.data.inquiryId;
});

test('13. Client Data Isolation — Client Views Own Inquiries Only', async () => {
  const res = await request(app)
    .get('/api/inquiries/my')
    .set('Authorization', `Bearer ${clientToken}`);

  assert.strictEqual(res.status, 200);
  assert.strictEqual(res.body.data.inquiries.length, 1);
  assert.strictEqual(res.body.data.inquiries[0].referenceNumber, createdInquiryRef);
});

test('14. Inquiry — Admin Updates Status and Adds Internal Note', async () => {
  const res = await request(app)
    .put(`/api/inquiries/admin/${createdInquiryId}`)
    .set('Authorization', `Bearer ${adminToken}`)
    .send({
      status: 'In Progress',
      priority: 'High',
      internalNote: 'Reviewed client specification. Scheduling initial kickoff call.',
    });

  assert.strictEqual(res.status, 200);
  assert.strictEqual(res.body.data.inquiry.status, 'In Progress');
  assert.strictEqual(res.body.data.inquiry.internalNotes.length, 1);
});

test('15. Input Validation & Error Handling — Invalid Email on Registration', async () => {
  const res = await request(app)
    .post('/api/auth/register')
    .send({
      name: 'Bad Email',
      email: 'not-an-email',
      password: 'ValidPassword123!',
    });

  assert.strictEqual(res.status, 400);
  assert.strictEqual(res.body.success, false);
});

test('16. Authentication — Tolerates whitespace in email input on Login', async () => {
  const res = await request(app)
    .post('/api/auth/login')
    .send({
      email: '  client1@example.com  ',
      password: 'ClientPassword123!',
    });

  assert.strictEqual(res.status, 200);
  assert.strictEqual(res.body.success, true);
  assert.ok(res.body.token);
});

test('17. Admin Password Sync — Reset password when ADMIN_RESET_PASSWORD is set', async () => {
  const { ensureInitialData } = await import('../src/config/initData.js');

  process.env.ADMIN_INITIAL_EMAIL = 'admin.test@primewebstudio.com';
  process.env.ADMIN_INITIAL_PASSWORD = 'NewAdminPassword456!';
  process.env.ADMIN_RESET_PASSWORD = 'true';

  await ensureInitialData();

  // Old password should now fail
  const oldLogin = await request(app)
    .post('/api/auth/login')
    .send({
      email: 'admin.test@primewebstudio.com',
      password: 'AdminPassword123!',
    });
  assert.strictEqual(oldLogin.status, 401);

  // New password should succeed
  const newLogin = await request(app)
    .post('/api/auth/login')
    .send({
      email: 'admin.test@primewebstudio.com',
      password: 'NewAdminPassword456!',
    });
  assert.strictEqual(newLogin.status, 200);
  assert.strictEqual(newLogin.body.success, true);
});

