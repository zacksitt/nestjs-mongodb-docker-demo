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

@Module({
  imports: [MongooseModule.forRoot('mongodb://mongodb',{dbName: 'studentdb'}),
  MongooseModule.forFeature([{ name: 'Student', schema: StudentSchema },{ name: 'Class', schema: ClassSchema }])],
  controllers: [AppController,StudentController,ClassController],
  providers: [AppService,StudentService,ClassService],
})
export class AppModule {}
