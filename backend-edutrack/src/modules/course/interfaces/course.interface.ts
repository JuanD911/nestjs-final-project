import { Professor } from "src/modules/professor/interfaces/professor.interface";

export interface Course {

    id: string,
    name: string,
    description: string,
    credits: number,
    professor: Professor,

}