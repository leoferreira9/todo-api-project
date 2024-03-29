import { Request, Response } from "express"
import { Todo } from '../models/Todo'
import { title } from "process"

export const all = async (req: Request, res: Response) => {
    let todos = await Todo.findAll()
    res.json({ todos })
}

export const add = async (req: Request, res: Response) => {
    let { title, done } = req.body

    if(title){
        let newTodo = await Todo.create({
            title,
            done: done ? true : false
        })

        res.status(201).json({ newTodo })
    }else{
        res.json({error: 'Dados não enviados'})

    }
}

export const update = async (req: Request, res: Response) => {
    let { id } = req.params
    let todo = await Todo.findByPk(id)
    
    if(todo){
        if(req.body.title){
            todo.title = req.body.title
        }

        if(req.body.done){
            switch(req.body.done.toLowerCase()){
                case 'true':
                case '1':
                    todo.done = true
                    break
                case 'false':
                case '0':
                    todo.done = false
                    break
            }
        }

        await todo.save()
        res.json({ item: todo })
    }else{
        res.json({error: "Item não encontrado"})
    }
}

export const remove = async (req: Request, res: Response) => {
    let { id } = req.params
    let todo = await Todo.findByPk(id)
        
    if(todo){
        await todo.destroy()
        res.json({})
    }else{
        res.json({error: "Item não encontrado"})
    }
}