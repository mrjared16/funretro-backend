import { BoardEntity } from 'src/boards/boards.entity';
import { CardEntity } from 'src/cards/cards.entity';
import { Column, ManyToOne, OneToMany } from 'typeorm';
import { CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('list')
export abstract class ListEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;
    
    @Column({ default: '111'})
    color: string;

    @Column({ type: 'float', default: 0 })
    pos: number;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;

    @ManyToOne(() => BoardEntity, board => board.id)
    board: BoardEntity;

    @OneToMany(() => CardEntity, card => card.id)
    cards: CardEntity[];
}