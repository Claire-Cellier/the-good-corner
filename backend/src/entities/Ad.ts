import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	JoinTable,
	ManyToMany,
	ManyToOne,
	PrimaryGeneratedColumn,
} from "typeorm";
import { Category } from "./Category";
import { Tag } from "./Tag";

@Entity()
export class Ad extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title: string;

	@Column()
	description: string;

	@Column()
	owner: string;

	@Column()
	price: number;

	@Column()
	img_url: string;

	@Column()
	location: string;

	@ManyToOne(() => Category, { eager: true })
	category: Category;

	@ManyToMany(() => Tag, { eager: true })
	@JoinTable({ name: "ads_tags" })
	tags: Tag[];

	@Column()
	createdAt: Date;
}
