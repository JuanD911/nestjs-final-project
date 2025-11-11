import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Student } from "../interfaces/student.interface";
import { UserEntity } from "src/modules/user/entities/users.entities";
import { EnrollmentEntity } from "src/modules/enrollment/entities/enrollment.entity";

@Entity({name:'student'})
export class StudentEntity implements Student {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('int')
    entryYear: number;

    @OneToOne(() => UserEntity, (user) => user.student, {onDelete:'CASCADE', cascade: true})
    @JoinColumn({name:'id_user'})
    user: UserEntity;

    @OneToMany(() => EnrollmentEntity, (enrollment) => enrollment.student)
    enrollments: EnrollmentEntity[];
}
