import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn} from 'typeorm'



@Entity({ name: 'HistoryBTC'})
export class HistoryBTC {
    
    @PrimaryGeneratedColumn("uuid") // "uuid" são hash de números e letras misturados
    uid: string;

    @Column({type : Number})
    price_high

    @Column({type : Number})
    price_low

    @Column({type : Number})
    price_open
    
    @Column({type : Number})
    price_close

    @CreateDateColumn({type : 'timestamp'})
    time_open : Date

    @CreateDateColumn({type : 'timestamp'})
    time_close: Date
}