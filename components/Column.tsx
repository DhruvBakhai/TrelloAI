import { PlusCircleIcon } from "@heroicons/react/24/outline";
// import { type } from "os";
import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import ToDoCard from "./ToDoCard";

type Props = {
    id: TypedColumn;
    todos: Todo[];
    index: number;
};
const idToColumnText: {
    [key in TypedColumn]: string;
} = {
    todo: "To Do",
    inprogress: "In Progress",
    done: "Done",
};

function Column({ id, todos, index }: Props) {
    return (
        <Draggable draggableId={id} index={index}>
            {(provided) => (
                <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}>
                    {/* render droppable todos in the columns */}
                    <Droppable droppableId={index.toString()} type="card">
                        {(provided, snapshot) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className={`p-2 rounded-2xl shadow-sm ${snapshot.isDraggingOver ? "bg-green-200" : " bg-white/50"
                                    }`}>
                                <h2 className="flex justify-between font-bold p-2 text-xl">
                                    {idToColumnText[id]}
                                    <span className="text-gray-500 bg-gray-200 rounded-full px-2 py-2 text-sm font-normal">
                                        {todos.length}
                                    </span>
                                </h2>

                                <div className="space-y-2">
                                    {todos.map((todo, index) => (
                                        <Draggable
                                            key={todo.$id}
                                            draggableId={todo.$id}
                                            index={index}>
                                            {(provided) => (
                                                <ToDoCard
                                                    todo={todo}
                                                    index={index}
                                                    id={id}
                                                    innerRef={provided.innerRef}
                                                    dragHandleProps={provided.dragHandleProps}
                                                    draggableProps={provided.draggableProps}
                                                />
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}

                                    <div className="flex p-2 items-end justify-end">
                                        <button className="text-green-500 hover:text-green-600">
                                            <PlusCircleIcon
                                                className="h-10 w-10" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </Droppable>
                </div>
            )}
        </Draggable>
    );
}

export default Column;
