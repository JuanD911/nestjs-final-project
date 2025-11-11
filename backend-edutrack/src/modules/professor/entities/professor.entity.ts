import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Professor } from "../interfaces/professor.interface";
import { UserEntity } from "src/modules/user/entities/users.entities";
import { CourseEntity } from "src/modules/course/entities/course.entity";

@Entity({name: 'professor'})
export class ProfessorEntity implements Professor {

    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column('text')
    specialty: string;

    @OneToOne(() => UserEntity, (user) => user.professor, {onDelete: "CASCADE", cascade: true, nullable: false})
    @JoinColumn({name:'id_user'})
    user: UserEntity;

    @OneToMany(() => CourseEntity, (course) => course.professor)
    courses: CourseEntity[];
}
