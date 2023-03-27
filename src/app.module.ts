import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentController } from './controller/student/student.controller';
import { StudentSchema } from './schema/student.schema';
import { ClassSchema } from './schema/class.schema';
import { StudentService } from './service/student/student.service';
import { ClassController } from './controller/class/class.controller';
import { ClassService } from './service/class/class.service';
import { AuthService } from './auth/auth.service';
import { LocalStrategy } from './auth/local.strategy';
import { UsersService } from './users/users.service';
import { UserSchema } from './users/users.model';

@Module({
  imports: [MongooseModule.forRoot('mongodb://mongodb',{dbName: 'studentdb'}),
  MongooseModule.forFeature([{ name: 'Student', schema: StudentSchema },{ name: 'Class', schema: ClassSchema },{ name: 'User', schema: UserSchema }])],
  controllers: [AppController,StudentController,ClassController],
  providers: [AppService,StudentService,ClassService,AuthService,LocalStrategy,UsersService],
})
export class AppModule {}
