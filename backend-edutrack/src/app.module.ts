import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { CourseModule } from './modules/course/course.module';
import { ProfessorModule } from './modules/professor/professor.module';
import { EnrollmentModule } from './modules/enrollment/enrollment.module';
import { StudentModule } from './modules/student/student.module';
import { AuthModule } from './modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AdminGuard } from './guards/admin.guard';

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
        synchronize: true,
      }
    ),

    UserModule,

    CourseModule,
    
    StudentModule,

    ProfessorModule,

    EnrollmentModule,

    AuthModule
  ],

  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    },
    {
      provide: APP_GUARD,
      useClass: AdminGuard
    },
  ],

})

export class AppModule {}
