import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import * as bcrypt from 'bcryptjs';
import { BoardEntity } from "src/boards/boards.entity";

@Entity('user')
export abstract class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        nullable: false,
        unique: true
    })
    email: string;

    @Column({ nullable: true })
    password: string;

    @Column()
    name: string;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;


    @OneToMany(() => BoardEntity, board => board.id)
    boards: BoardEntity[];


    @BeforeUpdate()
    @BeforeInsert()
    async hashPassword() {
        if (this.password) {
            this.password = await this.hash(this.password);
        }
    }
    private async hash(str: string): Promise<string> {
        return bcrypt.hash(str, 10);
    }

    public static async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
        // return true;
        return bcrypt.compare(password, hashedPassword);
    }
}