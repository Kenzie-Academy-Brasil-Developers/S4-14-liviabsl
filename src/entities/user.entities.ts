import { Entity, Column, PrimaryColumn } from "typeorm";
import {v4 as uuid} from "uuid"

@Entity()
export class User{
    @PrimaryColumn('uuid')
    readonly id: string

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    password: string

    @Column()
    isAdm: boolean

    @Column()
    createdAt: Date

    @Column()
    updatedAt: Date

    @Column()
    isActive: boolean


    constructor(){
        if(!this.id){
            this.id = uuid()
        }
        if(!this.createdAt){
            this.createdAt = new Date()
        }
        if(!this.updatedAt){
            this.updatedAt = new Date()
        }
        if(!this.isActive){
            this.isActive = true
        }
    }
}

