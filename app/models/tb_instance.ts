import { BaseModel, column } from '@adonisjs/lucid/orm';
import { DateTime } from 'luxon';

export default class TbInstance extends BaseModel {

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare uuid: string

  @column()
  declare instance: number

  @column()
  declare status: string

  @column()
  declare user: string
  
  @column()
  declare password: string

  @column({ serializeAs: 'time_logged_in'})
  declare time_logged_in: number

  @column.dateTime({ autoCreate: true, serializeAs: 'created_at' })
  declare created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: 'updated_at' })
  declare updated_at: DateTime
}