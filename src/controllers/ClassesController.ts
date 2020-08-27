import { Request, Response } from 'express'

import db from '../database/connection'
import convertHoursToMinutes from '../utils/convertHoursToMinutes'

interface ScheduleItem {
  week_day: number,
  from: string,
  to: string
}


export default class ClassesController {

  async index(req: Request, res: Response) {
    
    const filters = req.query

    const week_day = filters.week_day as string
    const subject = filters.subject as string
    const time = filters.time as string

    if(!week_day || !subject || !time) {
      res.status(400).json({
        error: 'Missing filters to search classes'
      })
    }

    const timeInMinutes = convertHoursToMinutes(time)

    const classes = await db('classes')
      // select personalizado, deve usar function() por causa do escopo
      .whereExists(function() {
        this.select('class_schedule.*')
          .from('class_schedule')
          // where cru - atenção as crases
          .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
          // cada par de ?? representa uma possicação no array de parametros
          // converter dados em number ou scapar `??` 
          .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
          .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
          .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])
      })
      .where('classes.subject', '=', subject)
      .join('users', 'classes.user_id', '=', 'users.id')
      .select(['classes.*', 'users.*'])


    return res.json(classes)  
  }

  async create (req: Request, res: Response) {
    const {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost,
      schedule
    } = req.body
  
    // usar transation, para sincronizar todos inserts. Para casos de erros
    // é possivel parar todas inserções do mesmo contexto
    const trx = await db.transaction()
  
    try {
      
      // retorna um array de ids inseridos
      const insertedUsersIds = await trx('users').insert({
        name, 
        avatar, 
        whatsapp,
        bio
      })
      
      // pega o unico id inserido anteriormente
      const userId = insertedUsersIds[0] 
  
      const insertedClassesIds = await trx('classes').insert({
        subject,
        cost,
        user_id: userId
      })
  
      // obtem o id da unica disciplina 
      const class_id = insertedClassesIds[0]
  
      const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
        return {
          week_day: scheduleItem.week_day,
          from: convertHoursToMinutes(scheduleItem.from),
          to: convertHoursToMinutes(scheduleItem.to),
          class_id
        }
      })
      
      await trx('class_schedule').insert(classSchedule)
  
      // depois que todos os inserts forem concluídos com sucesso,
      // por meio da transition é concluido e salvo os dados no banco.
      await trx.commit()
  
      return res.status(201).send() // created 201
    } 
    catch (error) {
  
      // desfaz alterações no banco em caso de erros
      await trx.rollback()
  
      res.status(400).json({
        erro: 'Unexpectec error while creating new class'
      })
    }
  }

}