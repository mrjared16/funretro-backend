import { ListEntity } from 'src/lists/lists.entity';
import { UserEntity } from 'src/users/users.entity';
import { DeleteDateColumn, ManyToOne, OneToMany, UpdateDateColumn } from 'typeorm';
import { CreateDateColumn } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm';
import { Column } from 'typeorm';
import { Entity } from 'typeorm';

export enum PermissionLevel {
    PUBLIC = 'public',
    PRIVATE = 'private',
    MEMBER = 'member'
}

@Entity('board')
export abstract class BoardEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({
        type: 'enum',
        enum: PermissionLevel,
        default: PermissionLevel.PRIVATE
    })
    permissionLevel: PermissionLevel;

    @DeleteDateColumn()
    deleted_at: Date;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;

    @Column({ nullable: false })
    userId: string;

    @ManyToOne(() => UserEntity, user => user.boards)
    user: UserEntity;

    @OneToMany(() => ListEntity, list => list.board)
    lists: ListEntity[];
}