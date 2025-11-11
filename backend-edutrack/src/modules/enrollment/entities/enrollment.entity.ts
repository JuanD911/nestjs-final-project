import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Enrollment } from "../interfaces/enrollment.interface";
import { StudentEntity } from "src/modules/student/entities/student.entity";
import { CourseEntity } from "src/modules/course/entities/course.entity";

@Entity('enrollment')
export class EnrollmentEntity implements Enrollment {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('date')
    enrollmentDate: string;

    @Column('int')
    grade: number;

    @ManyToOne(() => StudentEntity, (student) => student.enrollments)
    student: StudentEntity;

    @ManyToOne(() => CourseEntity, (course) => course.enrollments)
    course: CourseEntity;

}
