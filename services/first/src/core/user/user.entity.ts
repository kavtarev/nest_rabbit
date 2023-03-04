import { Column, Entity, PrimaryColumn } from '@nest_rabbit/nest';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryColumn('text')
  id: string;

  @Column('text')
  name: string;
}
