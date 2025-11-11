import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Course } from "../interfaces/course.interface";
import { ProfessorEntity } from "src/modules/professor/entities/professor.entity";
import { EnrollmentEntity } from "src/modules/enrollment/entities/enrollment.entity";

@Entity('course')
export class CourseEntity implements Course {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    name: string;

    @Column('text')
    description: string;

    @Column('int', {  nullable: true })
    credits: number;

    @ManyToOne(() => ProfessorEntity, (professor) => professor.courses, {nullable: false, onDelete: 'CASCADE'})
    professor: ProfessorEntity;

    @OneToMany(() => EnrollmentEntity, (enrollment) => enrollment.course)
    enrollments: EnrollmentEntity[];
}
