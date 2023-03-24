import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res,Query } from '@nestjs/common';
import { CreateClassDto } from 'src/dto/create-class.dto';
import { UpdateClassDto } from 'src/dto/update-class.dto';
import { ClassService } from 'src/service/class/class.service';
import { Message } from 'src/lib/response'

@Controller('')
export class ClassController {
    constructor(private readonly classService: ClassService) { }

    @Post('class')
    async createClass(@Res() response, @Body() createClassDto: CreateClassDto) {
        try {
            const newClass = await this.classService.createClass(createClassDto);
            return response.status(HttpStatus.CREATED).json({
                message: Message.created_success_message,
                newClass,
            });
        } catch (err) {
            console.error(err);
            return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message: 'Error: Class not created!',
                error: 'Bad Request'
            });
        }
    }

    @Put('class/:id')
    async updateClass(@Res() response,
        @Param('id') classId: number,
        @Body() updateClassDto: UpdateClassDto) {
        try {
            const existingClass = await this.classService.updateClass(classId, updateClassDto);
            return response.status(HttpStatus.OK).json({
                message: 'Class has been successfully updated',
                existingClass,
            });
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Get('classes')
    async getClasses(@Res() response) {
        try {
            const classData = await this.classService.getAllClasses();
            return response.status(HttpStatus.OK).json({
                message: Message.get_success_message,
                classData,
            });
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Get('class/:id')
    async getClass(@Res() response, @Param('id') classId: number) {
        try {
            const existingClass = await this.classService.getClass(classId);
            return response.status(HttpStatus.OK).json({
                message: Message.get_success_message,
                existingClass,
            });
        } catch (err) {
            console.error(err);
            return response.status(err.status).json(err.response);
        }
    }

    @Get('class')
    async findClass(@Res() response, @Query('keyword') keyword: string) {
        try {
            const existingClass = await this.classService.findClass(keyword);
            return response.status(HttpStatus.OK).json({
                message: 'Class found successfully',
                existingClass,
            });
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Delete('class/:id')
    async deleteClass(@Res() response, @Param('id') classId: number) {
        try {
            console.log("classid",classId);
            const deletedClass = await this.classService.deleteClass(classId);
            return response.status(HttpStatus.OK).json({
                message: 'Class deleted successfully',
                deletedClass,
            });
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }
}
