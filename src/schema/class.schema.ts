import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { HydratedDocument } from 'mongoose';

export type IClass = HydratedDocument<Class>;

@Schema()
export class Class {
    @Prop()
    id: number;

    @Prop()
    name: string;

    @Prop()
    description: string;
}

export const ClassSchema = SchemaFactory.createForClass(Class);