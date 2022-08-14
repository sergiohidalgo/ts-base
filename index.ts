import {readFileSync, writeFile} from 'fs'
import moment from 'moment'
import slugify from 'slugify'
import { v4 as uuidv4 } from 'uuid';

const file = readFileSync('./days-list.csv', 'utf-8')
const icsBase = readFileSync('./base-ics.ics', 'utf-8')

const formatCsv = (file: string) => file.split('\r\n').map((day: string) => {
    const [name, date] = day.split(',')
    const initDate = moment(date, 'DD-MM-YY').format('YYYYMMDD')
    const endDate = moment(date, 'DD-MM-YY').add(1, 'day').format('YYYYMMDD')
    return {name, initDate, endDate}
})

const listWithNameAndDate = formatCsv(file);

listWithNameAndDate.forEach(({name, initDate, endDate}) => {
    const ics = icsBase
        .replace(/__EVENT-DATE__/g, initDate)
        .replace(/__EVENT-NAME__/g, `💆🏻 Viernes libre ${name}`)
        .replace(/__EVENT-END-DATE__/g, endDate)
        .replace(/__UID__/g, uuidv4().toUpperCase())
        .replace(/__UID-ALARM__/g, uuidv4().toUpperCase())
    if (name) writeFile(`ics/${slugify(name, '-')}.ics`, ics, cb => {})
})
