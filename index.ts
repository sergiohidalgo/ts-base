import {readFileSync, writeFile} from 'fs'

// utils libs:
// import moment from 'moment'
// import slugify from 'slugify'
// import { v4 as uuidv4 } from 'uuid';
// import axios from 'axios';

console.log('init script')

const file = readFileSync('./example.csv', 'utf-8')
writeFile(`./result.csv`, file, cb => console.log(cb))

console.log('end script')