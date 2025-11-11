import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../interfaces/user.interface';
import { UserTypes } from '../interfaces/userTypes';
import { ProfessorEntity } from 'src/modules/professor/entities/professor.entity';
import { Professor } from 'src/modules/professor/interfaces/professor.interface';
import { StudentEntity } from 'src/modules/student/entities/student.entity';

@Entity({name: 'user'})
export class UserEntity implements User {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('text')
    full_name: string;

    @Column('text', { unique: true })
    email: string;

    @Column('text', { select: false })
    password: string;

    @Column({
        type: 'enum',
        enum: UserTypes
    })
    role: UserTypes;

    @OneToOne(() => ProfessorEntity, (professor) => professor.user)
    professor: ProfessorEntity;

    @OneToOne(() => StudentEntity, (student) => student.user)
    student: StudentEntity;

}