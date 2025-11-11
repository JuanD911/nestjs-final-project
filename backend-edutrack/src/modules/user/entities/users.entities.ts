import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../interfaces/user.interface';
import { UserTypes } from '../interfaces/userTypes';

@Entity({name: 'user'})
export class UserEntity implements User {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('text')
    full_name: string;

    @Column('text')
    email: string;

    @Column('text')
    password: string;

    @Column({
        type: 'enum',
        enum: UserTypes
    })
    role: UserTypes;

}