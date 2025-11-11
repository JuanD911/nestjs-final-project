import { Course } from "src/modules/course/interfaces/course.interface";

export interface Professor {

    id: string,
    specialty: string,
    courses: Course[];

}