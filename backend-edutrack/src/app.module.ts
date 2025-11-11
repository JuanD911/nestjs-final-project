import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { CourseModule } from './modules/course/course.module';
import { ProfessorModule } from './modules/professor/professor.module';
import { StudentModule } from './modules/student/student.module';
import { RegistrationModule } from './modules/registration/registration.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot(
      {
        type: 'postgres',
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT!,
        database: process.env.DB_NAME,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        autoLoadEntities: true,
        synchronize: true
      }
    ),

    UserModule,

    CourseModule,

    RegistrationModule,

    StudentModule,

    ProfessorModule
  ],
})
export class AppModule {}
