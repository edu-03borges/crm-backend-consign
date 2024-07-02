import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export default class TbCampaign extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare uuid: string

  @column()
  declare name: string

  @column()
  declare company: string

  @column()
  declare records: number

  @column()
  declare status: string

  @column({ serializeAs: 'query_data' })
  declare query_data: string

  @column({ serializeAs: 'file_data' })
  declare file_data: string

  @column({ serializeAs: 'records_consulted' })
  declare records_consulted: number

  @column.dateTime({ autoCreate: true, serializeAs: 'created_at' })
  declare created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: 'updated_at' })
  declare updated_at: DateTime
}
