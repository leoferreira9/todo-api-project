import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../instances/mysql'

export interface TodoInstance extends Model{
    id: number
    title: string
    done: boolean
}

export const Todo = sequelize.define<TodoInstance>('Todo', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title:{
        type: DataTypes.STRING
    },
    done:{
        type: DataTypes.STRING,
        defaultValue: false
    }
},{
    tableName: 'todo_table',
    timestamps: false
})