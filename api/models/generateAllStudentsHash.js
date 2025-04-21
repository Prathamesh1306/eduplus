const crypto = require('crypto');
const studentModel = require('./student');

// Function to generate and save hashes for all students
async function generateAndSaveHashes() {
    try {
        // Fetch all students
        const allStudents = await studentModel.find();

        if (allStudents.length === 0) {
            console.log('No student data found in the database!');
            return 'No students to hash!';
        }

        for (const student of allStudents) {
            // Serialize student data into a JSON string
            const studentDataString = JSON.stringify(student);

            // Generate the SHA-256 hash
            const hash = crypto.createHash('sha256').update(studentDataString).digest('hex');

            // Update the student document with the generated hash
            student.dataHash = hash;
            await student.save(); // Save the updated student record

            console.log(`Hash generated and saved for PRN: ${student.prn}`);
        }

        return 'Hashes generated and saved for all students!';
    } catch (error) {
        console.error('Error while generating and saving hashes:', error);
        throw new Error('Failed to generate and save hashes for students');
    }
}

module.exports = generateAndSaveHashes;
