import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateClassDto } from 'src/dto/create-class.dto';
import { IClass,Class } from 'src/schema/class.schema';
import { Model } from "mongoose";
import { UpdateClassDto } from 'src/dto/update-class.dto';

@Injectable()
export class ClassService {
    constructor(@InjectModel('Class') private classModel: Model<IClass>) { }

    async createClass(createClassDto: CreateClassDto): Promise<Class> {
        const newClass = await new this.classModel(createClassDto);
        return newClass.save();
    }

    async updateClass(classId: number, UpdateClassDto: UpdateClassDto): Promise<IClass> {
        const existingClass = await this.classModel.findOneAndUpdate({"id":classId}, UpdateClassDto, { new: true });
        if (!existingClass) {
            throw new NotFoundException(`Class #${classId} not found`);
        }
        return existingClass;
    }

    async getAllClasses(): Promise<IClass[]> {
        const classData = await this.classModel.find();
        if (!classData || classData.length == 0) {
            throw new NotFoundException('Classs data not found!');
        }
        return classData;
    }

    async findClass(keyword: string): Promise<IClass>{
        const existingClass = await this.classModel.findOne({name:keyword}).exec();
        if (!existingClass) {
            throw new NotFoundException(`Class #${keyword} not found`);
        }
        return existingClass;
    }

    async getClass(classId: number): Promise<IClass> {
        const existingClass = await this.classModel.findById(classId).exec();
        if (!existingClass) {
            throw new NotFoundException(`Class #${classId} not found`);
        }
        return existingClass;
    }

    async deleteClass(classId: number): Promise<IClass> {
        const deletedClass = await this.classModel.findOneAndDelete({id:classId});
        if (!deletedClass) {
            throw new NotFoundException(`Class #${classId} not found`);
        }
        return deletedClass;
    }
}
