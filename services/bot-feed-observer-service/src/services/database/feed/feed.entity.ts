import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("feed")
export class Feed {
  @PrimaryGeneratedColumn()
  readonly id!: string;

  @Column({ unique: true })
  feedId!: string;

  @Column({ type: "datetime", nullable: true })
  lastCheck!: Date | null;

  @Column({ type: "datetime", nullable: true })
  lastFeedItemPublishedAt!: Date | null;
}
