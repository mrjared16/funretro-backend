import { ListEntity } from 'src/lists/lists.entity';
import { Column, DeleteDateColumn, ManyToOne } from 'typeorm';
import { CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('card')
export abstract class CardEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ type: 'float', default: 0 })
    pos: number;

    @DeleteDateColumn()
    delete_at: Date;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;

    @Column({nullable: false})
    listId: string;


    @ManyToOne(() => ListEntity, list => list.id)
    list: ListEntity;
}