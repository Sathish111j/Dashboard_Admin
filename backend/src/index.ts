import { Hono } from "hono";
import { cors } from "hono/cors";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
}>();
app.use("/*", cors());


// Getting assigned students of mentor

app.post("/mentors/students", async (c) => {
  const { mentorId } = await c.req.json();

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const mentor = await prisma.mentor.findUnique({
    where: { id: Number(mentorId) },
    include: { students: true },
  });

  return c.json(mentor?.students || []);
});


// Assigning mentors to students.

app.post("/mentors/assign", async (c) => {
  const { mentorId, studentId } = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const updatedStudent = await prisma.student.update({
    where: { id: Number(studentId) },
    data: { mentorId: Number(mentorId) },
  });
  return c.json(updatedStudent);
});

// Unassigning mentors from students.

app.post("/mentors/unassign", async (c) => {
  const { studentId } = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const updatedStudent = await prisma.student.update({
    where: { id: Number(studentId) },
    data: { mentorId: null },
  });
  return c.json(updatedStudent);
});


// Updating marks for students.

app.post("/students/marks", async (c) => {
  const { studentId, ideation, execution, viva } = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const student = await prisma.student.findUnique({
    where: { id: Number(studentId) },
    select: { ideation: true, execution: true, viva: true },
  });

  const totalMarks =
    (ideation || student?.ideation || 0) +
    (execution || student?.execution || 0) +
    (viva || student?.viva || 0);

  const updatedStudent = await prisma.student.update({
    where: { id: Number(studentId) },
    data: { ideation, execution, viva, totalMarks },
  });

  return c.json(updatedStudent);
});

// gets all unassigned students

app.get("/students/unassigned", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  const unassignedStudents = await prisma.student.findMany({
    where: { mentorId: null },
  });
  return c.json(unassignedStudents);
});

// send total marks
app.post("/students/totalMarks", async (c) => {
  const { studentId } = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  const student = await prisma.student.findUnique({
    where: { id: Number(studentId) },
    select: { totalMarks: true },
  });
  return c.json(student?.totalMarks || 0);
});

//add mentors
app.post('/mentors', async (c) => {
  const { name, email } = await c.req.json();

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const mentor = await prisma.mentor.create({
    data: {
      name,
      email,
    },
  });

  return c.json(mentor);
});

// add students

app.post('/students', async (c) => {
  const { name, email } = await c.req.json(); 

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const student = await prisma.student.create({
    data: {
      name,
      email,
    },
  });

  return c.json(student);
});

export default app;


