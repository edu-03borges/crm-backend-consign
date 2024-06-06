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

  @column({ serializeAs: 'xlsx_success' })
  declare xlsx_success: string

  @column({ serializeAs: 'xlsx_error' })
  declare xlsx_error: string

  @column({ serializeAs: 'file_data' })
  declare file_data: string

  @column.dateTime({ autoCreate: true, serializeAs: 'created_at' })
  declare created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: 'updated_at' })
  declare updated_at: DateTime
}