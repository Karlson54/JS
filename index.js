class Task {
    id: number;
    title: string;
    isComplete: boolean;
    dueDate?: Date;

    constructor(id: number, title: string, isComplete: boolean = false, dueDate?: Date) {
        this.id = id;
        this.title = title;
        this.isComplete = isComplete;
        this.dueDate = dueDate;
    }

    updateTitle(newTitle: string): void {
        if (newTitle.trim().length === 0) {
            console.error("Заголовок не может быть пустым.");
        } else {
            this.title = newTitle;
            console.log(`Заголовок задачи обновлен на "${newTitle}"`);
        }
    }
}

class TaskManager {
    private tasks: Task[] = [];
    private nextId: number = 1;

    addTask(title: string, dueDate?: Date): Task {
        if (title.trim().length === 0) {
            throw new Error("Заголовок задачи не может быть пустым.");
        }
        const task = new Task(this.nextId++, title, false, dueDate);
        this.tasks.push(task);
        console.log(`Задача "${task.title}" добавлена`);
        return task;
    }

    removeTask(id: number): boolean {
        const index = this.tasks.findIndex(task => task.id === id);
        if (index !== -1) {
            console.log(`Задача "${this.tasks[index].title}" удалена`);
            this.tasks.splice(index, 1);
            return true;
        } else {
            console.error(`Задача с id ${id} не найдена`);
            return false;
        }
    }

    completeTask(id: number): boolean {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.isComplete = true;
            console.log(`Задача "${task.title}" выполнена`);
            return true;
        } else {
            console.error(`Задача с id ${id} не найдена`);
            return false;
        }
    }

    updateTaskTitle(id: number, newTitle: string): boolean {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.updateTitle(newTitle);
            return true;
        } else {
            console.error(`Задача с id ${id} не найдена`);
            return false;
        }
    }

    listTasks(): void {
        console.log("Список задач:");
        if (this.tasks.length === 0) {
            console.log("Нет задач.");
        } else {
            this.tasks.forEach(task => {
                const dueDateStr = task.dueDate ? ` (Срок: ${task.dueDate.toLocaleDateString()})` : "";
                console.log(`- [${task.isComplete ? 'x' : ' '}] ${task.id}: ${task.title}${dueDateStr}`);
            });
        }
    }

    listCompletedTasks(): void {
        console.log("Выполненные задачи:");
        const completedTasks = this.tasks.filter(task => task.isComplete);
        if (completedTasks.length === 0) {
            console.log("Нет выполненных задач.");
        } else {
            completedTasks.forEach(task => {
                console.log(`- ${task.id}: ${task.title}`);
            });
        }
    }

    listPendingTasks(): void {
        console.log("Невыполненные задачи:");
        const pendingTasks = this.tasks.filter(task => !task.isComplete);
        if (pendingTasks.length === 0) {
            console.log("Нет невыполненных задач.");
        } else {
            pendingTasks.forEach(task => {
                console.log(`- ${task.id}: ${task.title}`);
            });
        }
    }

    sortByDueDate(): void {
        this.tasks.sort((a, b) => {
            if (!a.dueDate) return 1;
            if (!b.dueDate) return -1;
            return a.dueDate.getTime() - b.dueDate.getTime();
        });
        console.log("Задачи отсортированы по сроку выполнения.");
    }

    sortByCompletionStatus(): void {
        this.tasks.sort((a, b) => Number(a.isComplete) - Number(b.isComplete));
        console.log("Задачи отсортированы по статусу выполнения.");
    }

    findTaskByTitle(title: string): Task | undefined {
        const task = this.tasks.find(task => task.title.toLowerCase() === title.toLowerCase());
        if (task) {
            console.log(`Задача найдена: ${task.id} - ${task.title}`);
            return task;
        } else {
            console.log(`Задача с заголовком "${title}" не найдена`);
            return undefined;
        }
    }

    clearCompletedTasks(): void {
        const initialCount = this.tasks.length;
        this.tasks = this.tasks.filter(task => !task.isComplete);
        console.log(`Удалено ${initialCount - this.tasks.length} выполненных задач`);
    }
}

const manager = new TaskManager();

manager.addTask("Изучить TypeScript", new Date('2024-09-10'));
manager.addTask("Написать расширенное приложение", new Date('2024-09-20'));
manager.addTask("Сделать тестовое задание", new Date('2024-09-15'));

manager.listTasks();

manager.completeTask(1);
manager.completeTask(3);

manager.listCompletedTasks();
manager.listPendingTasks();

manager.sortByDueDate();
manager.listTasks();

manager.sortByCompletionStatus();
manager.listTasks();

manager.updateTaskTitle(2, "Изменённое задание");

manager.listTasks();

manager.findTaskByTitle("Изучить TypeScript");
manager.findTaskByTitle("Невыполнимая задача");

manager.clearCompletedTasks();
manager.listTasks();