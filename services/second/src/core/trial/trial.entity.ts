import { Column, Entity, PrimaryGeneratedColumn } from '@nest_rabbit/nest';

@Entity({ name: 'trial' })
export class TrialEntity {
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @Column('text')
    name: string;
}
