const mongoService = require("../services/mongoService");
const redisService = require("../services/redisService");

async function createStudent(req, res) {
  try {
    const student = req.body;
    const result = await mongoService.insertOne("students", student);
    await redisService.deleteCachedData(`students`);
    res.json(result);
  } catch (error) {
    res.status(500).send("Error creating student: " + error.message);
  }
}

async function getStudent(req, res) {
  const id = req.params.id;

  try {
    const cachedstudent = await redisService.getCachedData(`student:${id}`);
    if (cachedstudent) {
      console.log("Cache hit");
      return res.json(cachedstudent);
    }

    console.log("Cache miss");
    const student = await mongoService.findOneById("students", id);
    if (!student) {
      return res.status(404).send("student not found");
    }
    await redisService.cacheData(`student:${id}`, student, 3600);
    res.json(student);
  } catch (error) {
    console.error("Error retrieving student:", error);
    res.status(500).send("Error retrieving student: " + error.message);
  }
}

async function getStudents(req, res) {
  try {
    const cachedStudents = await redisService.getCachedData(`students`);
    if (cachedStudents) {
      console.log("Cache hit");
      return res.json(cachedStudents);
    }
    console.log("Cache miss");
    const students = await mongoService.findAll("students");
    if (!students) {
      return res.status(404).send("students not found");
    }
    await redisService.cacheData(`students`, students, 3600);
    res.json(students);
  } catch (error) {
    res.status(500).send("Error retrieving students: " + error.message);
  }
}
async function updateStudent(req, res) {
  const id = req.params.id;
  const updates = req.body;
  try {
    const updatedStudent = await mongoService.updateOneById(
      `students`,
      id,
      updates
    );
    if (!updatedStudent.matchedCount) {
      return res.status(404).send("Student not found");
    }
    await redisService.deleteCachedData(`student:${id}`);
    await redisService.deleteCachedData(`students`);
    res.json({
      message: "Student updated successfully",
      updatedStudent: updatedStudent,
    });
  } catch (error) {
    console.error("Error updating student:", error);
    res.status(500).send("Error updating student: " + error.message);
  }
}

async function deleteStudent(req, res) {
  const id = req.params.id;
  try {
    if (!id) {
      return res.status(400).send("Invalid student ID");
    }
    const result = await mongoService.deleteOneById("students", id);
    if (result.deletedCount === 0) {
      return res.status(404).send("Student not found");
    }
    await redisService.deleteCachedData(`student:${id}`);
    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error("Error deleting student:", error);
    res.status(500).send("Error deleting student: " + error.message);
  }
}

module.exports = {
  createStudent,
  getStudent,
  getStudents,
  updateStudent,
  deleteStudent,
};
