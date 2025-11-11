import { Course } from "src/modules/course/interfaces/course.interface";
import { Student } from "src/modules/student/interfaces/student.interface";

export interface Enrollment {

    id: string,
    enrollmentDate: string,
    grade: number,
    student: Student,
    course: Course,
    
}