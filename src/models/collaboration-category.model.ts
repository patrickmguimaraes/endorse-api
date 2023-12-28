import { Model, Table, Column, DataType, HasOne, ForeignKey, HasMany, BelongsTo } from "sequelize-typescript";

@Table({timestamps: false,
  tableName: "collaborationCategories",
})
export default class CollaborationCategory extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id"
  })
  id?: number;

  @Column({
    type: DataType.STRING(100),
    field: "name"
  })
  name?: string;

  @ForeignKey(() => CollaborationCategory)
  @Column({
    type: DataType.INTEGER,
    field: "fatherId",
  })
  fatherId!: number;

  @BelongsTo(() => CollaborationCategory)
  father?: CollaborationCategory;

  @HasMany(() => CollaborationCategory, { foreignKey: 'fatherId', sourceKey: 'id' })
  children?: CollaborationCategory[];
}