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


// Endpoint to get all students assigned to a mentor
app.get("/mentors/:id/students", async (c) => {
  const mentorId = Number(c.req.param("id"));

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const mentor = await prisma.mentor.findUnique({
      where: { id: Number(mentorId) },
      include: {
        students: {
          select: {
            id: true,
            name: true,
            email: true,
            ideation: true,
            execution: true,
            viva: true,
            totalMarks: true,
          },
        },
      },
    });

    if (!mentor) {
      c.status(404);
      return c.json({ error: "Mentor not found" });
    }

    return c.json(mentor.students);
  } catch (error) {
    console.error("Error fetching students for mentor:", error);
    c.status(500);
    return c.json({ error: "Internal server error" });
  }
});


// Assigning mentors to students.
app.post("/mentors/assign", async (c) => {
  const { mentorId, studentId } = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  // Check if the mentor already has 4 students
  const mentor = await prisma.mentor.findUnique({
    where: { id: Number(mentorId) },
    include: { students: true },
  });

  if (mentor && mentor.students.length >= 4) {
    c.status(400);
    return c.json({ error: "Mentor can't accommodate more students." });
  }

  // Check if the mentor already has the student assigned
  const alreadyAssigned = mentor?.students.find(
    (student: { id: number }) => student.id === Number(studentId)
  );
  if (alreadyAssigned) {
    c.status(400);
    return c.json({ error: "Student is already assigned to this mentor." });
  }

  // Assign the student to the mentor
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
    data: { mentorId: null || undefined },
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
  }).$extends(withAccelerate());
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
  }).$extends(withAccelerate());
  const student = await prisma.student.findUnique({
    where: { id: Number(studentId) },
    select: { totalMarks: true },
  });
  return c.json(student?.totalMarks || 0);
});

//add mentors
app.post("/mentors", async (c) => {
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

app.post("/students", async (c) => {
  try {
    const body = await c.req.json();
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const student = await prisma.student.create({
      data: {
        name: body.name,
        email: body.email,
        mentorId: body.mentorId,
      }
    });

    return c.json(student);
  } catch (e) {
    console.error(e);
    c.status(500);
    return c.json({ error: "Internal server error" });
  }
});


// Endpoint to fetch all mentor details
app.get("/mentors/all", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const mentors = await prisma.mentor.findMany({
      include: {
        students: {
          select: {
            id: true,
            name: true,
            email: true,
            ideation: true,
            execution: true,
            viva: true,
            totalMarks: true,
          },
        },
      },
    });

    return c.json(mentors);
  } catch (error) {
    console.error("Error fetching mentors and students:", error);
    c.status(500);
    return c.json({ error: "Internal server error" });
  }
});

// Endpoint to fetch all student details
app.get("/students/all", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const students = await prisma.student.findMany({
      include: {
        mentor: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return c.json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    c.status(500);
    return c.json({ error: "Internal server error" });
  }
});


export default app;
